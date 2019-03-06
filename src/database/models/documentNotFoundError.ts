export default class DocumentNotFoundError extends Error {
    constructor(document?: string) {
        super();
        this.name = "DocumentNotFoundError";
        if (document)
            this.message = `Document ${document} does not exist in database`;
        else
            this.message = "Document does not exist in database";
    }
}
