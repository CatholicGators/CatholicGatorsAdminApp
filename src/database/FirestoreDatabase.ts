import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as Promise from 'bluebird';

import { Database } from './Database';
import { Observable } from 'rxjs/internal/Observable';

interface Collection {
    [id:string] : object;
}

class FirestoreDatabase implements Database {
    private app: firebase.app.App;
    private db: firebase.firestore.Firestore;
    public auth: firebase.auth.Auth;

    constructor() {
        const clientConfig = require(`../../${process.env.FIREBASE_CLIENT_CONFIG}`);

        this.app = !firebase.apps.length ? firebase.initializeApp(clientConfig) : firebase.app();
        this.db = this.app.firestore();
        this.auth = this.app.auth();
    };

    listenForUser() {
        return Observable.create(observer =>
            this.auth.onAuthStateChanged(user => observer.next(user))
        );
    }

    googleSignIn() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signOut() {
        this.auth.signOut();
    }

    add(collection, entity) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).add(entity)
            .then((ref) => {
                console.log(`Firestore: Added ${ ref.id } to ${ collection }`);
                resolve(ref);
            })
            .catch((err) => {
                console.log(`Firestore: Unable to add entity to ${ collection }`);
                reject(err);
            });
        });
    }

    getCollection(collection:string):Promise<object> {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).get()
                .then((querySnapshot) => {
                    const collection:Collection = {};
                    querySnapshot.forEach((doc) => {
                        collection[doc.id] = doc.data();
                    })
                    resolve(collection);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    update(collection:string, docId:string, entity) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).doc(docId).set(entity)
                .then((result:any) => {
                    console.log(`Firestore: Updated ${ docId } in ${ collection }`);
                    resolve(result);
                })
                .catch((err) => {
                    console.log(`Firestore: Unable to update entity ${ docId } in ${ collection }`);
                    reject(err);
                });
        });
    }
}

export let firestore = new FirestoreDatabase();