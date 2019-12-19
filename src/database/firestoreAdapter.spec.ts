import { when } from 'jest-when'

import FirestoreAdapter from './firestoreAdapter'
import DocumentNotFoundError from './documentNotFoundError'

describe('firestoreAdapter', () => {
    let adapter: FirestoreAdapter, db, collectionName = 'testCollectionName', collection, docs

    let createDocSnapshot = id => {
        const doc = {
            foo: 'bar'
        }

        return {
            id: id,
            exists: true,
            data: jest.fn(() => doc)
        }
    }

    let createDocRef = id => {
        return {
            id,
            get: jest.fn(() => Promise.resolve(createDocSnapshot(id)))
        }
    }

    beforeEach(() => {
        docs = [
            createDocSnapshot('1'),
            createDocSnapshot('2'),
            createDocSnapshot('3')
        ]
        collection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        when(collection.get)
            .calledWith()
            .mockReturnValue(Promise.resolve({
                docs
            }))
        db = {
            collection: jest.fn()
        }
        when(db.collection)
            .calledWith(collectionName)
            .mockReturnValue(collection)

        adapter = new FirestoreAdapter(db)
    })

    describe('get()', () => {
        let testId, docRef

        beforeEach(() => {
            testId = 'test'
            docRef = createDocRef(testId)

            when(collection.doc)
                .calledWith(docRef.id)
                .mockReturnValue(docRef)
        })

        it('successfully gets a document and flattens it', async () => {
            const data = await adapter.get(collectionName, docRef.id)

            expect(data).toEqual({
                id: docRef.id,
                ...(await docRef.get()).data()
            })
        })

        it('throws a DocumentNotFoundException', async () => {
            const docSnapshot = docRef.get()
            docRef.get = jest.fn(() => ({
                ...docSnapshot,
                exists: false,
                data: jest.fn(() => null)
            }))

            try {
                await adapter.get(collectionName, docRef.id)
                fail('expected DocumentNotFoundError')
            } catch (e) {
                expect(e instanceof DocumentNotFoundError).toBeTruthy()
            }
        })
    })

    describe('getAll()', () => {
        it('when given a collection name with docs, returns all of the docs flattened', async () => {
            const data = await adapter.getAll(collectionName)

            expect(data).toEqual(docs.map(doc => adapter.flatten(doc)))
        })

        it('when given a collection name without docs, returns empty array', async () => {
            when(collection.get)
                .calledWith()
                .mockReturnValue(Promise.resolve({
                    docs: []
                }))

            const data = await adapter.getAll(collectionName)

            expect(data).toEqual([])
        })
    })
})
