import { app, auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, from } from 'rxjs';
import { filter, flatMap, map, merge } from 'rxjs/operators'

import User from './user';

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
        this.storeUserInfoOnLogin();
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

    addOrUpdateDocById(collection: string, docId: string, entity: object): Observable<void>{
            return from(this.db.collection(collection).doc(docId).set(entity));
    }

    getDoc(collection: string, docId: string): Observable<firebase.firestore.DocumentData> {
        return from(this.db.collection(collection).doc(docId).get())
            .pipe(
                map(docSnapshot => {
                    if (docSnapshot.exists)
                        return docSnapshot.data();
                    else
                        throw 'Document does not exist';
                })
            )
    }

    getCollection(collection: string) {
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
            )
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

    private storeUserInfoOnLogin() {
        const login$ = this.firebaseUser$
            .pipe(
                filter(x => x !== null),
                flatMap(firebaseUser =>
                    this.doesExist(USER_COLLECTION, firebaseUser.uid)
                        .pipe(
                            map(exists => ({exists, firebaseUser}))
                        )
                ),
                flatMap(({exists, firebaseUser}) => {
                    const user: User = {
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        photoURL: firebaseUser.photoURL,
                        isApproved: firebaseUser.email === ADMIN_EMAIL,
                        isAdmin: firebaseUser.email === ADMIN_EMAIL,
                    }

                    let observable;

                    if (exists) {
                        // If the user already exists, just update their profile pic
                        observable = this.updateDoc(USER_COLLECTION, firebaseUser.uid, {
                            photoURL: user.photoURL
                        })
                    } else {
                        observable = this.addOrUpdateDocById(USER_COLLECTION, firebaseUser.uid, user);
                    }

                    return observable.pipe(
                        flatMap(_ => this.getDoc(USER_COLLECTION, firebaseUser.uid))
                    ) as Observable<User>;
                })
        );

        const logout$ = this.firebaseUser$
            .pipe(
                filter(x => x === null)
            );

        this.user$ = login$
            .pipe(
                merge(logout$)
            ) as Observable<User>;
    }
}
