import { app, auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, from, merge } from 'rxjs';
import { mergeMap, map, partition } from 'rxjs/operators';

import User from './models/user';
import Document from './models/document';
import DocumentNotFoundError from './models/documentNotFoundError';

const USER_COLLECTION = 'users';
const ADMIN_EMAIL = 'sandy@catholicgators.org'; // TODO: we might want to migrate this to some form of config

export default class Firestore {
    private app: app.App;
    private auth: auth.Auth;
    private db: firebase.firestore.Firestore;
    private firebaseUser$: Observable<firebase.User>;
    private user$: Observable<User>;

    constructor(private firebase, private clientConfig) {
        this.app = !this.firebase.apps.length ?
                        this.firebase.initializeApp(this.clientConfig) :
                        this.firebase.app();
        this.auth = this.app.auth();
        this.db = this.app.firestore();
        this.firebaseUser$ = Observable.create(observer =>
            this.auth.onAuthStateChanged(
                user => observer.next(user),
                err => observer.error(err)
            )
        );
        this.user$ = this.storeUserInfoOnLogin();
    };

    listenForUser(): Observable<User> {
        return this.user$;
    }

    googleSignIn(): Observable<void> {
        return from(this.auth.signInWithRedirect(new auth.GoogleAuthProvider()));
    }

    signOut(): Observable<void> {
        return from(this.auth.signOut());
    }

    addDoc(collection: string, entity: object): Observable<firebase.firestore.DocumentReference> {
        return from(this.db.collection(collection).add(entity));
    }

    upsertDocById(collection: string, docId: string, entity: object): Observable<void>{
            return from(this.db.collection(collection).doc(docId).set(entity));
    }

    getDoc(collection: string, docId: string): Observable<Document> {
        return from(this.db.collection(collection).doc(docId).get())
            .pipe(
                map(docSnapshot => {
                    if (docSnapshot.exists)
                        return {
                            id: docId,
                            data: docSnapshot.data()
                        };
                    else
                        throw new DocumentNotFoundError(docId);
                })
            )
    }

    getCollection(collection: string): Observable<Document[]> {
        return from(this.db.collection(collection).get())
            .pipe(
                map(querySnapshot => {
                    const docs = [];
                    const queryDocumentSnapshots = querySnapshot.docs;
                    for(let i = 0; i < queryDocumentSnapshots.length; i++) {
                        const doc = queryDocumentSnapshots[i];
                        docs.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    }
                    return docs;
                })
            );
    }

    getUsers() {
        return this.getCollection(USER_COLLECTION);
    }

    doesExist(collection: string, docId: string): Observable<boolean> {
        return from(this.db.collection(collection).doc(docId).get())
            .pipe(
                map(docSnapshot => docSnapshot.exists)
            );
    }

    updateDoc(collection: string, docId: string, entity: object): Observable<void> {
        return from(this.db.collection(collection).doc(docId).update(entity));
    }

    deleteDoc(collection: string, docId: string): Observable<void> {
        return from(this.db.collection(collection).doc(docId).delete());
    }

    closeConnection() {
        return from(this.app.delete());
    }

    private storeUserInfoOnLogin(): Observable<User> {
        const attachExistence = firebaseUser =>
                    this.doesExist(USER_COLLECTION, firebaseUser.uid)
                        .pipe(
                            map(exists => ({exists, firebaseUser}))
                        );

        const storeUser = ({exists, firebaseUser}) => {
                    const docId = firebaseUser.uid;
                    const user: User = this.wrapFirebaseUser(firebaseUser);
                    let observable;

                    if (exists) {
                        // If the user already exists, just update their profile pic
                        observable = this.updateDoc(USER_COLLECTION, docId, {
                            photoURL: user.photoURL
                        })
                    } else {
                        observable = this.upsertDocById(USER_COLLECTION, docId, user);
                    }

                    return observable.pipe(
                        mergeMap(_ => this.getDoc(USER_COLLECTION, firebaseUser.uid)),
                        map(userObject => (<Document>userObject).data)
                    ) as Observable<User>;
                }

        let [login$, logout$] = partition(x => x !== null)(this.firebaseUser$);
        login$ = login$
            .pipe(
                mergeMap(attachExistence),
                mergeMap(storeUser)
        );

        return merge(
            login$,
            logout$,
        ) as Observable<User>;
    }

    private wrapFirebaseUser(user: firebase.User): User {
        return {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isApproved: user.email === ADMIN_EMAIL,
            isAdmin: user.email === ADMIN_EMAIL,
        }

    }
}
