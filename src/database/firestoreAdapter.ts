import "firebase/firestore"

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
type Transaction = firebase.firestore.Transaction
type DocumentReference = firebase.firestore.DocumentReference

export class DocNotFoundError extends Error {
    constructor(collectionName: string, docId: string) {
        super()
        this.name = "DocumentNotFoundError"
        this.message = `Document id ${docId} does not exist in collection ${collectionName}`
    }
}

export interface Doc {
    id: string
}

export default class FirestoreAdapter {
    constructor(private db: firebase.firestore.Firestore) { }

    async get<T extends Doc>(collectionName: string, id: string): Promise<T> {
        let docSnapshot = await this.getDocReference(collectionName, id).get()

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

    async add<T extends Doc>(collectionName: string, doc: any): Promise<T> {
        const docRef = await this.db.collection(collectionName).add(doc)
        return {
            ...doc,
            id: docRef.id
        } as T
    }

    async update<T extends Doc>(collectionName: string, id: string, fields: object): Promise<T> {
        const doc = await this.get<T>(collectionName, id)
        await this.getDocReference(collectionName, id).update(fields)
        return {
            ...doc,
            ...fields
        }
    }

    async delete(collectionName: string, id: string): Promise<void> {
        await this.getDocReference(collectionName, id).delete()
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
