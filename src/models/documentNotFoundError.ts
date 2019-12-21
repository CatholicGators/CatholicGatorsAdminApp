export default class DocumentNotFoundError extends Error {
    constructor(docId: string) {
        super()
        this.name = "DocumentNotFoundError"
        this.message = `Document ${docId} does not exist in database`
    }
}
