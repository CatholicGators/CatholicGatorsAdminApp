import * as admin from 'firebase-admin';
import * as Promise from 'bluebird';

import { Database } from './Database';

interface Collection {
    [id:string] : object;
}

class FirestoreDatabase implements Database {
    private db:admin.firestore.Firestore;

    constructor() {
        const firestoreSettings:object = {
            timestampsInSnapshots:true // suppresses Firebase warning about change in timestamp behavior
        }

        const serviceAccountKey:object = getServiceAccountKey();

        const firebase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey),
        });

        this.db = firebase.firestore();
        this.db.settings(firestoreSettings);
    };

    add(collection:string, entity:admin.firestore.DocumentData):Promise<admin.firestore.DocumentReference> {
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
                .then((querySnapshot:admin.firestore.QuerySnapshot) => {
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

    update(collection:string, docId:string, entity:admin.firestore.DocumentData):Promise<admin.firestore.WriteResult> {
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

/**
 * Get the service account key. Requires that NODE_ENV is set
 *
 * @return An object containing the contents of the private key
 */
function getServiceAccountKey():object {
    checkIfKeyEnvVarIsSet();

    const serviceAccountPrivateKeyName:String = process.env.SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME;

    const serviceAccountKeyPath:string = `../../${serviceAccountPrivateKeyName}`;
    return require(serviceAccountKeyPath);
}

/**
 * Throws an error if enviromental variable for Firebase private server is not set
 */
function checkIfKeyEnvVarIsSet():void {
    if(!process.env.SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME)
        throw new Error(`ERROR: SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME environmental variable not set`);
}
