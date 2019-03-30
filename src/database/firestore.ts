import { app, auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import Document from '../models/document';
import DocumentNotFoundError from '../models/documentNotFoundError';

export default class Firestore {
    private app: app.App;
    private db: firebase.firestore.Firestore;

    constructor(private firebase, private clientConfig) {
        this.app = !this.firebase.apps.length ?
                        this.firebase.initializeApp(this.clientConfig) :
                        this.firebase.app();
        this.db = this.app.firestore();
    };

    getAuth(): auth.Auth {
        return this.app.auth();
    }

    addDoc(collection: string, entity: object): Observable<firebase.firestore.DocumentReference> {
        return from(this.db.collection(collection).add(entity));
    }

    upsertDocById(collection: string, docId: string, entity: object): Observable<void>{
            return from(this.db.collection(collection).doc(docId).set(entity));
    }

    getDoc(collection: string, docId: string): Observable<Document> {
        return from(this.db.collection(collection).doc(docId).get())
            .pipe(
                map(docSnapshot => {
                    if (docSnapshot.exists)
                        return {
                            id: docId,
                            data: docSnapshot.data()
                        };
                    else
                        throw new DocumentNotFoundError(docId);
                })
            );
    }

    getCollection(collection: string): Observable<Document[]> {
        return from(this.db.collection(collection).get())
            .pipe(
                map(querySnapshot => {
                    const docs = [];
                    const queryDocumentSnapshots = querySnapshot.docs;
                    for(let i = 0; i < queryDocumentSnapshots.length; i++) {
                        const doc = queryDocumentSnapshots[i];
                        docs.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    }
                    return docs;
                })
            );
    }

    doesExist(collection: string, docId: string): Observable<boolean> {
        return from(this.db.collection(collection).doc(docId).get())
            .pipe(
                map(docSnapshot => docSnapshot.exists)
            );
    }

    updateDoc(collection: string, docId: string, entity: object): Observable<void> {
        return from(this.db.collection(collection).doc(docId).update(entity));
    }

    deleteDoc(collection: string, docId: string): Observable<void> {
        return from(this.db.collection(collection).doc(docId).delete());
    }

    closeConnection() {
        return from(this.app.delete());
    }

}
