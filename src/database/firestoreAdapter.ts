import "firebase/firestore"

import DocNotFoundError from "./docNotFoundError"
import Doc from './doc'

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
type Transaction = firebase.firestore.Transaction
type DocumentReference = firebase.firestore.DocumentReference

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
        await Promise.all(snapshot.docs.map(doc => doc.ref.delete()))
    }

    async runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>): Promise<T> {
        return this.db.runTransaction(updateFunction)
    }

    getDocReference(collectionName: string, id: string): DocumentReference {
        return this.db.collection(collectionName).doc(id)
    }

    getNewDocReference(collectionName: string): DocumentReference {
        return this.db.collection(collectionName).doc()
    }

    flattenSnapshot<T extends Doc>(doc: QueryDocumentSnapshot): T {
        return {
            ...doc.data(),
            id: doc.id
        } as T
    }
}
