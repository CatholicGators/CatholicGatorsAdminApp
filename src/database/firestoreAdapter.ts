import "firebase/firestore"
import "firebase/auth"

import DocumentNotFoundError from "./documentNotFoundError"

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export default interface Doc {
    id: string
}

export default class Firestore {
    constructor(private db: firebase.firestore.Firestore) { }

    async get<T extends Doc>(collectionName: string, id: string): Promise<T> {
        let docSnapshot = await this.db
            .collection(collectionName)
            .doc(id)
            .get()

        if (docSnapshot.exists) {
            return this.flatten<T>(docSnapshot)
        } else {
            throw new DocumentNotFoundError(collectionName, id)
        }
    }

    private flatten<T extends Doc>(doc: QueryDocumentSnapshot): T {
        return {
            id: doc.id,
            ...doc.data()
        } as T
    }

    // getAuth(): auth.Auth {
    //     return this.app.auth();
    // }

    // addDoc(collection: string, entity: any): Promise<DocumentReference> {
    //     if(entity.id || entity.uid)
    //         entity = this.removeId(entity);
    //     return from(this.db.collection(collection).add(entity));
    // }

    // upsertDocById(collection: string, docId: string, entity: any): Observable<firebase.firestore.DocumentReference>{
    //     if(entity.id || entity.uid)
    //         entity = this.removeId(entity);
    //     const docRef = this.db.collection(collection).doc(docId);
    //     return from(docRef.set(entity))
    //         .pipe(
    //             map(_ => docRef)
    //         );
    // }

    // upsertDocs(collection: string, entities: any[]): Observable<firebase.firestore.DocumentReference[]> {
    //     const batch = this.db.batch();
    //     const docRefs = [];

    //     entities.forEach(entity => {
    //         let docRef;
    //         if(entity.id){
    //             docRef = this.db.collection(collection).doc(entity.id);
    //             entity = this.removeId(entity);
    //         }
    //         else if(entity.uid){
    //             docRef = this.db.collection(collection).doc(entity.uid);
    //             entity = this.removeId(entity);
    //         }
    //         else
    //             docRef = this.db.collection(collection).doc();
    //         batch.set(docRef, entity);
    //         docRefs.push(docRef);
    //     });

    //     return from(batch.commit())
    //         .pipe(
    //             map(_ => docRefs)
    //         );
    // }

    // getCollection(collection: string): Observable<Document[]> {
    //     return from(this.db.collection(collection).get())
    //         .pipe(
    //             map(querySnapshot => {
    //                 const docs = [];
    //                 const queryDocumentSnapshots = querySnapshot.docs;
    //                 for(let i = 0; i < queryDocumentSnapshots.length; i++) {
    //                     const doc = queryDocumentSnapshots[i];
    //                     docs.push({
    //                         id: doc.id,
    //                         ...doc.data()
    //                     });
    //                 }
    //                 return docs;
    //             })
    //         );
    // }

    // doesExist(collection: string, docId: string): Observable<boolean> {
    //     return from(this.db.collection(collection).doc(docId).get())
    //         .pipe(
    //             map(docSnapshot => docSnapshot.exists)
    //         );
    // }

    // updateDoc(collection: string, docId: string, entity: any): Observable<firebase.firestore.DocumentReference> {
    //     const docRef = this.db.collection(collection).doc(docId);
    //     if(entity.id || entity.uid)
    //         entity = this.removeId(entity);
    //     return from(docRef.update(entity))
    //         .pipe(
    //             map(_ => docRef)
    //         );
    // }

    // updateDocs(collection: string, entities: any[]): Observable<firebase.firestore.DocumentReference[]> {
    //     const batch = this.db.batch();
    //     const docRefs = [];

    //     return Observable.create(observer => {
    //         entities.forEach(entity => {
    //             let docRef;
    //             if(entity.id){
    //                 docRef = this.db.collection(collection).doc(entity.id);
    //                 entity = this.removeId(entity);
    //             }
    //             else if(entity.uid){
    //                 docRef = this.db.collection(collection).doc(entity.uid);
    //                 entity = this.removeId(entity);
    //             }
    //             else
    //                 observer.error(`Document has no id: ${JSON.stringify(entity)}`);
    //             batch.update(docRef, entity);
    //             docRefs.push(docRef);
    //         });
    //         batch.commit()
    //             .then(() => {
    //                 observer.next(docRefs);
    //                 observer.complete();
    //             });
    //     });
    // }

    // deleteDoc(collection: string, docId: string): Observable<void> {
    //     return from(this.db.collection(collection).doc(docId).delete());
    // }

    // deleteDocs(collection: string, docIds: string[]): Observable<void> {
    //     const batch = this.db.batch();

    //     docIds.forEach(id => {
    //         const docRef = this.db.collection(collection).doc(id);
    //         batch.delete(docRef);
    //     });

    //     return from(batch.commit());
    // }

    // closeConnection() {
    //     return from(this.app.delete());
    // }

    // private removeId(obj: any) {
    //     obj = {...obj};
    //     if(obj.id)
    //         delete obj.id
    //     if(obj.uid)
    //         delete obj.uid
    //     return obj;
    // }
}
