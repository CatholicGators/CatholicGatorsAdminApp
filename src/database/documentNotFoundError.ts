export default class DocumentNotFoundError extends Error {
    constructor(collectionName: string, docId: string) {
        super()
        this.name = "DocumentNotFoundError"
        this.message = `Document id ${docId} does not exist in collection ${collectionName}`
    }
}
