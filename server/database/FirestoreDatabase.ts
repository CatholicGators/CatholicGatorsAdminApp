import * as admin from 'firebase-admin';
import * as Promise from 'bluebird';

import { FirebaseAdmin } from '../firebase/FirebaseAdmin';
import { Database } from './Database';

interface Collection {
    [id: string] : object;
}

class FirestoreDatabase implements Database {
    private db: admin.firestore.Firestore;

    constructor() {
        const firestoreSettings: object = {
            timestampsInSnapshots: true // suppresses Firebase warning about change in timestamp behavior
        }

        this.db = FirebaseAdmin.getInstance().firestore();
        this.db.settings(firestoreSettings);
    };

    add(collection: string, entity: admin.firestore.DocumentData): Promise<admin.firestore.DocumentReference> {
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

    getCollection(collection: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).get()
                .then((querySnapshot: admin.firestore.QuerySnapshot) => {
                    const collection: Collection = {};
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

    update(collection: string, docId: string, entity: admin.firestore.DocumentData): Promise<admin.firestore.WriteResult> {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).doc(docId).set(entity)
            .then((result) => {
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

export { FirestoreDatabase };
