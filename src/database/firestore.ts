import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Observable } from 'rxjs/internal/Observable';

export default class Firestore {
    private app: firebase.app.App;
    public auth: firebase.auth.Auth;

    constructor() {
        const clientConfig = require(`../../${process.env.FIREBASE_CLIENT_CONFIG}`);

        this.app = !firebase.apps.length ? firebase.initializeApp(clientConfig) : firebase.app();
        this.auth = this.app.auth();
    };

    listenForUser() {
        return Observable.create(observer =>
            this.auth.onAuthStateChanged(
                user => observer.next(user),
                err => observer.throw(err)
            )
        );
    }

    googleSignIn() {
        return Observable.create(observer => {
            this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
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
