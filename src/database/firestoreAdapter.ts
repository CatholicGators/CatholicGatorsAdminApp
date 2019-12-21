import "firebase/firestore"
import "firebase/auth"

import DocNotFoundError from "./docNotFoundError"
import Doc from './doc'

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export default class FirestoreAdapter {
    constructor(private db: firebase.firestore.Firestore) { }

    async get<T extends Doc>(collectionName: string, id: string): Promise<T> {
        let docSnapshot = await this.db
            .collection(collectionName)
            .doc(id)
            .get()

        if (docSnapshot.exists) {
            return this.flattenSnapshot<T>(docSnapshot)
        } else {
            throw new DocNotFoundError(collectionName, id)
        }
    }

    async getAll<T extends Doc>(collectionName: string): Promise<T[]> {
        const snapshot = await this.db.collection(collectionName).get()
        return snapshot.docs.map(doc => this.flattenSnapshot<T>(doc))
    }

    async add<T extends Doc>(collection: string, doc: any): Promise<T> {
        const docRef = await this.db.collection(collection).add(doc)
        return {
            ...doc,
            id: docRef.id
        } as T
    }

    async delete(collectionName: string, id: string): Promise<void> {
        await this.db.collection(collectionName).doc(id).delete()
    }

    async deleteAll(collectionName: string): Promise<void> {
        const snapshot = await this.db.collection(collectionName).get()
        snapshot.docs.forEach(doc => doc.ref.delete())
    }

    flattenSnapshot<T extends Doc>(doc: QueryDocumentSnapshot): T {
        return {
            ...doc.data(),
            id: doc.id
        } as T
    }

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

    // deleteDocs(collection: string, docIds: string[]): Observable<void> {
    //     const batch = this.db.batch();

    //     docIds.forEach(id => {
    //         const docRef = this.db.collection(collection).doc(id);
    //         batch.delete(docRef);
    //     });

    //     return from(batch.commit());
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
