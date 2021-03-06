import { DocNotFoundError } from "./firestoreAdapter"

describe("DocumentNotFoundError", () => {
    it("gives a custom message when a collection name and document id is passed", () => {
        const collectionName = "testCollectionName"
        const docId = "testId"

        const err = new DocNotFoundError(collectionName, docId)

        expect(err.message).toEqual(
            `Document id ${docId} does not exist in collection ${collectionName}`
        )
    })
})
