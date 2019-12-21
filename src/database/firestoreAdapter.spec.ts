import { when } from 'jest-when'

import FirestoreAdapter from './firestoreAdapter'
import DocNotFoundError from './docNotFoundError'
import Doc from './doc'

interface TestInterface extends Doc {
    id: string,
    foo: String
}

describe('firestoreAdapter', () => {
    let adapter: FirestoreAdapter, db, collectionName, collection, docs

    let createDocSnapshot = id => {
        const doc = {
            foo: 'bar'
        }

        return {
            id: id,
            exists: true,
            data: jest.fn(() => doc),
            ref: {
                delete: jest.fn()
            }
        }
    }

    let createDocRef = id => {
        return {
            id,
            get: jest.fn(() => Promise.resolve(createDocSnapshot(id))),
            delete: jest.fn()
        }
    }

    beforeEach(() => {
        collectionName = 'testCollectionName'
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
            collection: jest.fn(),
            runTransaction: jest.fn()
        }
        when(db.collection)
            .calledWith(collectionName)
            .mockReturnValue(collection)

        adapter = new FirestoreAdapter(db)
    })

    describe('get', () => {
        let docRef

        beforeEach(() => {
            docRef = createDocRef('testId')

            when(collection.doc)
                .calledWith(docRef.id)
                .mockReturnValue(docRef)
        })

        it('successfully gets a document and flattens it', async () => {
            const data = await adapter.get<TestInterface>(collectionName, docRef.id)

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
                await adapter.get<TestInterface>(collectionName, docRef.id)
                fail('expected DocumentNotFoundError')
            } catch (e) {
                expect(e instanceof DocNotFoundError).toBeTruthy()
            }
        })
    })

    describe('getAll', () => {
        it('when given a collection name with docs, returns all of the docs flattened', async () => {
            const data = await adapter.getAll<TestInterface>(collectionName)

            expect(data).toEqual(docs.map(doc => adapter.flattenSnapshot(doc)))
        })

        it('when given a collection name without docs, returns empty array', async () => {
            when(collection.get)
                .calledWith()
                .mockReturnValue(Promise.resolve({
                    docs: []
                }))

            const data = await adapter.getAll<TestInterface>(collectionName)

            expect(data).toEqual([])
        })
    })

    describe('add', () => {
        it('when given a collection name and a doc, it adds the doc', async () => {
            const newDoc = {
                foo: 'bazz'
            }
            const testId = 'testId'
            const docRef = {
                id: testId
            }
            when(collection.add)
                .calledWith(newDoc)
                .mockReturnValue(docRef)

            const data = await adapter.add<TestInterface>(collectionName, newDoc)

            expect(data).toEqual({
                ...newDoc,
                id: testId
            })
        })
    })

    describe('deleteAll', () => {
        it('when given a collection name with docs, deletes all docs', async () => {
            await adapter.deleteAll(collectionName)

            for (let i = 0; i < docs.length; i++) {
                expect(docs[i].ref.delete).toHaveBeenCalled()
            }
        })

        it('when given a collection name without docs, does nothing', async () => {
            when(collection.get)
                .calledWith()
                .mockReturnValue(Promise.resolve({
                    docs: []
                }))

            await adapter.deleteAll(collectionName)
        })
    })

    describe('delete', () => {
        it('when given a collection name and an id that exists in that collection, it deletes the doc', async () => {
            let docRef = createDocRef('testId')
            when(collection.doc)
                .calledWith(docRef.id)
                .mockReturnValue(docRef)

            await adapter.delete(collectionName, docRef.id)

            expect(docRef.delete).toHaveBeenCalled()
        })
    })

    describe('runTransaction', () => {
        it('passes the update function to db.runTransaction()', async () => {
            const updateFn = jest.fn()

            await adapter.runTransaction(updateFn)

            expect(db.runTransaction).toHaveBeenCalledWith(updateFn)
        })
    })

    describe('getDocReference', () => {
        it('gets reference with collection name and id', () => {
            let docRef = createDocRef('testId')
            when(collection.doc)
                .calledWith(docRef.id)
                .mockReturnValue(docRef)

            const ref = adapter.getDocReference(collectionName, docRef.id)

            expect(ref).toBe(docRef)
        })
    })

    describe('getNewDocReference', () => {
        it('gets reference to a new doc with just a collection name and no id', () => {
            let docRef = createDocRef('testId')
            when(collection.doc)
                .calledWith()
                .mockReturnValue(docRef)

            const ref = adapter.getNewDocReference(collectionName)

            expect(ref).toBe(docRef)
        })
    })
})
