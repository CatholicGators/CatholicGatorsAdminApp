import * as admin from 'firebase-admin';

import { Database } from './Database';

class FirestoreDatabase implements Database {
    private db:admin.firestore.Firestore;

    constructor() {
        const firestoreSettings:object = {
            timestampsInSnapshots:true
        }

        const serviceAccountKey:object = getServiceAccountKey();

        const firebase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey),
            databaseURL: getDatabaseUrl()
        });

        this.db = firebase.firestore();
        this.db.settings(firestoreSettings);
    };

    add(collection:string, entity:admin.firestore.DocumentData):void {
        this.db.collection(collection).add(entity)
        .then((ref) => {
            console.log(`Firestore: Added ${ ref.id } to ${ collection }`);
        });
    }

    getCollection(collection:string):Promise<admin.firestore.QuerySnapshot> {
        return this.db.collection(collection).get();
    }
}

export { FirestoreDatabase };

/**
 * Get the service account key. Requires that NODE_ENV is set
 *
 * @return An object containing 
 */
function getServiceAccountKey():object {
    checkIfKeyEnvVarIsSet();

    const serviceAccountPrivateKeyName:String = process.env[`$SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`];

    const serviceAccountKeyPath:string = `../${serviceAccountPrivateKeyName}`;
    return require(serviceAccountKeyPath);
}

/**
 * Throws an error if enviromental variable for Firebase private server is not set
 */
function checkIfKeyEnvVarIsSet():void {
    if(!process.env[`$SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`])
        throw new Error(`ERROR: $SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME environmental variable not set`);
}

function getDatabaseUrl():string {
    return `$DATABASE_URL` 
}
