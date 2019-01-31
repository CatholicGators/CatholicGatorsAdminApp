import * as admin from 'firebase-admin';

export class FirebaseAdmin {
    private static firebase: admin.app.App;

    private static createFirebase(): admin.app.App {
        const environment:string = process.env.NODE_ENV || 'development';

        const serviceAccountKey:object = getServiceAccountKey(environment);

        this.firebase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey),
        });

        return this.firebase;
    }

    public static getInstance(): admin.app.App {
        return this.firebase || this.createFirebase();
    }
}

/**
 * Get the service account key. Requires that NODE_ENV is set
 *
 * @return An object containing the contents of the private key
 */
function getServiceAccountKey(environment:string):object {
    checkIfKeyEnvVarIsSet(environment);

    const serviceAccountPrivateKeyName:String = process.env[
        `${process.env.NODE_ENV.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`
    ];

    const serviceAccountKeyPath:string = `../../${serviceAccountPrivateKeyName}`;
    return require(serviceAccountKeyPath);
}

/**
 * Throws an error if enviromental variable for Firebase private server is not set
 */
function checkIfKeyEnvVarIsSet(environment:string):void {
    if(!process.env[`${environment.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME`])
        throw new Error(
            `${environment.toUpperCase()}_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME
            environmental variable not set`
        );
}
