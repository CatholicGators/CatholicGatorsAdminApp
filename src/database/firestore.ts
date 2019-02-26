import { app, auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';

export default class Firestore {
    private app: app.App;
    private auth: auth.Auth;
    private db: firebase.firestore.Firestore;
    private user$: Observable<firebase.User>

    constructor(private firebase, private clientConfig) {
        this.app = !this.firebase.apps.length ?
                        this.firebase.initializeApp(this.clientConfig) :
                        this.firebase.app();
        this.auth = this.app.auth();
        this.db = this.app.firestore();
        this.user$ = Observable.create(observer =>
            this.auth.onAuthStateChanged(
                user => observer.next(user),
                err => observer.error(err)
            )
        );
    };

    listenForUser() {
        return this.user$;
    }

    googleSignIn() {
        return Observable.create(observer => {
            this.auth.signInWithRedirect(new auth.GoogleAuthProvider())
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    signOut() {
        return Observable.create(observer => {
            this.auth.signOut()
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    addDoc(collection: string, entity: object) {
        return Observable.create(observer => {
            this.db.collection(collection).add(entity)
                .then((ref) => {
                    observer.next(ref);
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    getDoc(collection: string, docId: string) {
        return Observable.create(observer => {
            this.db.collection(collection).doc(docId).get()
                .then((doc) => {
                    if(doc.exists) {
                        observer.next(doc.data());
                        observer.complete();
                    } else {
                        observer.error('Document does not exist');
                    }
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    updateDoc(collection: string, docId: string, entity: object) {
        return Observable.create(observer => {
            this.db.collection(collection).doc(docId).update(entity)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    deleteDoc(collection: string, docId: string) {
        return Observable.create(observer => {
            this.db.collection(collection).doc(docId).delete()
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }

    closeConnection() {
        return Observable.create(observer => {
            this.app.delete()
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }
}
