export default class DocumentNotFoundError extends Error {
    constructor(document: string) {
        super();
        this.name = "DocumentNotFoundError";
        this.message = `Document ${document} does not exist in database`;
    }
}
