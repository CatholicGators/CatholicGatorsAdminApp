import * as admin from 'firebase-admin';

import { Database } from './Database';

class FirestoreDatabase implements Database {
    private db:admin.firestore.Firestore;

    constructor() {
        const environment:string = process.env.NODE_ENV;

        const firestoreSettings:object = {
            timestampsInSnapshots:true
        }

        const serviceAccountKey:object = getServiceAccountKey(environment);

        const fireBase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey),
            databaseURL: getDatabaseUrl(environment)
        });

        this.db = fireBase.firestore();
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
function getServiceAccountKey(environment:string):object {
    checkIfKeyEnvVarIsSet(environment);

    const serviceAccountPrivateKeyName:String = process.env[`${process.env.NODE_ENV.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`];

    const serviceAccountKeyPath:string = `../${serviceAccountPrivateKeyName}`;
    return require(serviceAccountKeyPath);
}

/**
 * Throws an error if enviromental variable for Firebase private server is not set
 */
function checkIfKeyEnvVarIsSet(environment:string):void {
    if(!process.env[`${environment.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`])
        throw new Error(`ERROR: ${environment.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME environmental variable not set`);
}

function getDatabaseUrl(environment:string):string {
    return `${environment.toUpperCase()}_DATABASE_URL` 
}
