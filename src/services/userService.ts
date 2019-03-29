import { auth } from 'firebase/app';
import 'firebase/auth';
import { Observable, merge, from } from 'rxjs';
import { mergeMap, map, partition } from 'rxjs/operators';

import User from '../models/user';
import Firestore from '../database/firestore';

const USER_COLLECTION = 'users';
const ADMIN_EMAIL = 'sandy@catholicgators.org'; // TODO: we might want to migrate this to some form of config

export default class UserService {
    private db: Firestore;
    private auth: auth.Auth;
    private firebaseUser$: Observable<firebase.User>;
    private user$: Observable<User>;

    constructor(firestore: Firestore) {
        this.db = firestore;
        this.auth = firestore.getAuth();

        this.firebaseUser$ = Observable.create(observer =>
            this.auth.onAuthStateChanged(
                user => observer.next(user),
                err => observer.error(err)
            )
        );
        this.user$ = this.storeUserInfoOnLogin();
    }

    googleSignIn(): Observable<void> {
        return from(this.auth.signInWithRedirect(new auth.GoogleAuthProvider()));
    }

    signOut(): Observable<void> {
        return from(this.auth.signOut());
    }

    listenForUser(): Observable<User> {
        return this.user$;
    }

    addUser(user: User): Observable<firebase.firestore.DocumentReference> {
        return this.db.addDoc(USER_COLLECTION, user);
    }

    addUsers(users: User[]): Observable<firebase.firestore.DocumentReference[]> {
        return this.db.upsertDocs(USER_COLLECTION, users);
    }

    getUser(id:string): Observable<User> {
        return this.db.getDoc(USER_COLLECTION, id) as Observable<User>;
    }

    getAllUsers(): Observable<User[]> {
        return this.db.getCollection(USER_COLLECTION) as Observable<User[]>;
    }

    updateUser(id: string, update: Object): Observable<void> {
        return this.db.updateDoc(USER_COLLECTION, id, update);
    }

    updateUsers(users: User[]): Observable<firebase.firestore.DocumentReference[]> {
        return this.db.updateDocs(USER_COLLECTION, users);
    }

    approveUser(id: string): Observable<void> {
        return this.db.updateDoc(USER_COLLECTION, id, {
            isApproved: true
        });
    }

    disapproveUser(id: string): Observable<void> {
        return this.db.updateDoc(USER_COLLECTION, id, {
            isApproved: false
        });
    }

    makeAdmin(id: string): Observable<void> {
        return this.db.updateDoc(USER_COLLECTION, id, {
            isAdmin: true
        });
    }

    removeAdmin(id: string): Observable<void> {
        return this.db.updateDoc(USER_COLLECTION, id, {
            isAdmin: false
        });
    }

    deleteUser(id: string): Observable<void> {
        return this.db.deleteDoc(USER_COLLECTION, id);
    }

    deleteUsers(ids: string[]): Observable<void> {
        return this.db.deleteDocs(USER_COLLECTION, ids);
    }

    private storeUserInfoOnLogin(): Observable<User> {
        const attachExistence = firebaseUser =>
                    this.db.doesExist(USER_COLLECTION, firebaseUser.uid)
                        .pipe(
                            map(exists => ({exists, firebaseUser}))
                        );

        const storeUser = ({exists, firebaseUser}) => {
                    const docId = firebaseUser.uid;
                    const user: User = this.wrapFirebaseUser(firebaseUser);
                    let observable;

                    if (exists) {
                        // If the user already exists, just update their profile pic
                        observable = this.db.updateDoc(USER_COLLECTION, docId, {
                            photoURL: user.photoURL
                        })
                    } else {
                        observable = this.db.upsertDocById(USER_COLLECTION, docId, user);
                    }

                    return observable.pipe(
                        mergeMap(_ => this.db.getDoc(USER_COLLECTION, firebaseUser.uid))
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
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isApproved: user.email === ADMIN_EMAIL,
            isAdmin: user.email === ADMIN_EMAIL,
        }
    }
}