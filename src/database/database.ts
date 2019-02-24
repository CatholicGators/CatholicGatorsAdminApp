export interface Database {
    addDoc(collection: string, entity: object):Function
    getDoc(collection: string, docId: string):Function
    updateDoc(collection: string, docId: string, entity: object):Function
    deleteDoc(collection: string, docId: string):Function
}
