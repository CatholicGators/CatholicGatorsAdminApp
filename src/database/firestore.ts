import { app, auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Observable } from 'rxjs/internal/Observable';

export default class Firestore {
    private app: app.App;
    private auth: auth.Auth;
    private user: Observable<firebase.User>

    constructor(private firebase, private clientConfig) {
        this.app = !this.firebase.apps.length ? 
                        this.firebase.initializeApp(this.clientConfig) : 
                        this.firebase.app();
        this.auth = this.app.auth();
        this.user = Observable.create(observer =>
            this.auth.onAuthStateChanged(user => observer.next(user))
        );
    };

    listenForUser() {
        return this.user;
    }

    googleSignIn() {
        return Observable.create(observer => {
            this.auth.signInWithRedirect(new auth.GoogleAuthProvider())
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((err) => {
                    observer.throw(err);
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
                    observer.throw(err);
                });
        });
    }
}
