import { when } from 'jest-when'
import FirestoreAdapter from './FirestoreAdapter'
import DocumentNotFoundError from "./documentNotFoundError"

describe('firestoreAdapter', () => {
    let adapter: FirestoreAdapter, db, collectionName, docId, collection, doc, docSnapshot, docRef

    beforeEach(() => {
        doc = {
            foo: 'bar'
        }
        docId = 'test'
        docSnapshot = {
            id: docId,
            exists: true,
            data: jest.fn(() => doc)
        }
        docRef = {
            id: docId,
            get: jest.fn(() => docSnapshot)
        }
        collection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        db = {
            collection: jest.fn()
        }
        when(db.collection)
            .calledWith(collectionName)
            .mockReturnValue(collection)
        when(collection.doc)
            .calledWith(docId)
            .mockReturnValue(docRef)

        adapter = new FirestoreAdapter(db)
    })

    describe('get()', () => {
        it('successfully gets a document and flattens it', async () => {
            const data = await adapter.get(collectionName, docId)

            expect(data).toEqual({
                id: docId,
                ...doc
            })
        })

        it('throws a DocumentNotFoundException', async () => {
            docSnapshot = {
                ...docSnapshot,
                exists: false,
                data: () => null
            }

            try {
                await adapter.get(collectionName, docId)
                fail('expected DocumentNotFoundError')
            } catch (e) {
                expect(e instanceof DocumentNotFoundError).toBeTruthy()
            }
        })
    })
})
