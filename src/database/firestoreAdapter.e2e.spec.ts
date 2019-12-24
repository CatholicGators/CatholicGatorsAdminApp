import FirestoreAdapter from './firestoreAdapter'
import Doc from './doc'
import DocNotFoundError from './docNotFoundError'
import * as firebase from 'firebase/app'
import clientConfig from '../config/testClientConfig'

interface TestInterface extends Doc {
    id: string,
    foo: String
}

describe('firestoreAdapter e2e', () => {
    const collectionName = 'e2eTestCollection'
    let adapter: FirestoreAdapter, app: firebase.app.App, db: firebase.firestore.Firestore, docsToAdd, docsInDbSortedOnId

    const uploadDocs = async (collectionName: string) => {
        docsToAdd = [
            {
                foo: 'bar'
            },
            {
                foo: 'bazz'
            }
        ]
        docsInDbSortedOnId = []

        for (let i = 0; i < docsToAdd.length; i++) {
            const addedDoc = await adapter.add<TestInterface>(collectionName, docsToAdd[i])
            docsInDbSortedOnId.push(addedDoc)
        }

        docsInDbSortedOnId.sort((a, b) => a.id > b.id ? 1 : -1)
    }

    beforeEach(async () => {
        app = firebase.initializeApp(clientConfig)
        db = app.firestore()
        adapter = new FirestoreAdapter(db)
        await adapter.deleteAll(collectionName)
        await uploadDocs(collectionName)
    })

    describe('get', () => {
        it('when given an id of a doc that exists, returns that doc', async () => {
            const doc = {
                foo: ''
            }

            const dataFromAdd = await adapter.add<TestInterface>(collectionName, doc)
            const dataFromGet = await adapter.get<TestInterface>(collectionName, dataFromAdd.id)

            expect(dataFromAdd).toEqual(dataFromGet)
        })

        it('when given an id of a doc that doesnt exist, throws DocumentNotFoundError', async () => {
            try {
                await adapter.get<TestInterface>(collectionName, 'garbage')
                fail('expected DocNotFoundError')
            } catch (e) {
                expect(e instanceof DocNotFoundError).toBeTruthy()
            }
        })
    })

    describe('getAll', () => {
        it('when given a collection name that has docs in it, returns all of the docs', async () => {
            const dataFromGet = await adapter.getAll<TestInterface>(collectionName)

            dataFromGet.sort((a, b) => a.id > b.id ? 1 : -1)
            expect(dataFromGet).toEqual(docsInDbSortedOnId)
        })

        it('when given a collection name that has no docs in it, returns empty list', async () => {
            const data = await adapter.getAll<TestInterface>(`not ${collectionName}`)

            expect(data).toEqual([])
        })
    })

    describe('add', () => {
        it('successfully adds a document and assigns an id', async () => {
            const doc = {
                foo: ''
            }

            const data = await adapter.add<TestInterface>(collectionName, doc)

            expect(data.id).toBeTruthy()
            expect(data.foo).toEqual(doc.foo)
        })
    })

    describe('update', () => {
        it('when given a collection name and an id that exists in that collection, updates that doc', async () => {
            const doc = {
                foo: 'test'
            }
            const data = await adapter.add<TestInterface>(collectionName, doc)
            const updatedFields = {
                foo: `not ${doc.foo}`
            }

            const updatedData = await adapter.update<TestInterface>(collectionName, data.id, updatedFields)

            expect(updatedData).toEqual({
                ...data,
                ...updatedFields
            })
        })

        it('when given a collection name and an id that doesnt exist in that collection, throws DocNotFoundError', async () => {
            try {
                await adapter.update<TestInterface>(collectionName, 'garbage', {})
                fail('expected DocNotFoundError')
            } catch (e) {
                expect(e instanceof DocNotFoundError).toBeTruthy()
            }
        })
    })

    describe('delete', () => {
        it('when given a collection name and an id that exists in that collection, it deletes the doc', async () => {
            const docToDelete = 0

            await adapter.delete(collectionName, docsInDbSortedOnId[docToDelete].id)

            const dataFromGet = await adapter.getAll<TestInterface>(collectionName)
            dataFromGet.sort((a, b) => a.id > b.id ? 1 : -1)
            docsInDbSortedOnId.splice(docToDelete, 1)
            expect(dataFromGet).toEqual(docsInDbSortedOnId)
        })

        it('when given a collection name and an id that doesnt exist in that collection, it does nothing', async () => {
            await adapter.delete(collectionName, 'garbage')

            const dataFromGet = await adapter.getAll<TestInterface>(collectionName)
            dataFromGet.sort((a, b) => a.id > b.id ? 1 : -1)
            expect(dataFromGet).toEqual(docsInDbSortedOnId)
        })
    })

    describe('deleteAll', () => {
        it('when given a collection name that has docs in it, deletes all the docs', async () => {
            await adapter.deleteAll(collectionName)

            const dataFromGet = await adapter.getAll<TestInterface>(collectionName)
            expect(dataFromGet).toEqual([])
        })

        it('when given a collection name that has no docs in it, does nothing', async () => {
            const emptyCollection = `not ${collectionName}`
            let dataFromGet = await adapter.getAll<TestInterface>(emptyCollection)
            expect(dataFromGet).toEqual([])

            await adapter.deleteAll(emptyCollection)

            dataFromGet = await adapter.getAll<TestInterface>(emptyCollection)
            expect(dataFromGet).toEqual([])
        })
    })

    describe('getDocReference', () => {
        it('when given a collection name and an id of a doc that exists in the collection, returns a reference to that doc', async () => {
            const docInDb = docsInDbSortedOnId[0]

            const ref = adapter.getDocReference(collectionName, docInDb.id)

            const data = await adapter.get<TestInterface>(collectionName, ref.id)
            expect(docInDb).toEqual(data)
        })
    })

    describe('getNewDocReference', () => {
        it('when given a collection name, returns a new reference', async () => {
            const ref = adapter.getNewDocReference(collectionName)

            try {
                await adapter.get<TestInterface>(collectionName, ref.id)
                fail('expected the ref to be new')
            } catch { }
        })
    })

    describe('runTransaction', () => {
        let sourceCollectionName,
            destinationCollectionName,
            migrateDocsFromSourceToDestinationCollectionTransaction,
            getTransactionRetVal

        beforeEach(async () => {
            sourceCollectionName = 'e2eSourceCollectionName'
            destinationCollectionName = 'e2eDestinationCollectionName'
            await adapter.deleteAll(sourceCollectionName)
            await adapter.deleteAll(destinationCollectionName)
            await uploadDocs(sourceCollectionName)

            getTransactionRetVal = jest.fn()
            migrateDocsFromSourceToDestinationCollectionTransaction = async transaction => {
                const sourceDocs = await adapter.getAll<TestInterface>(sourceCollectionName)

                const sourceDestinationPairs = await Promise.all(sourceDocs.map(async sourceDoc => {
                    const sourceSnapshot = await transaction.get(adapter.getDocReference(sourceCollectionName, sourceDoc.id))
                    const destinationSnapshot = await transaction.get(adapter.getNewDocReference(destinationCollectionName))
                    return [sourceSnapshot, destinationSnapshot]
                }))

                await Promise.all(sourceDestinationPairs.map(async ([sourceSnapshot, destinationSnapshot]) => {
                    transaction.set(destinationSnapshot.ref, sourceSnapshot.data())
                    transaction.delete(sourceSnapshot.ref)
                }))

                return getTransactionRetVal()
            }
        })

        it('when transaction throws no errors, commits transaction and returns result of transaction', async () => {
            let sourceDocs = await adapter.getAll<TestInterface>(sourceCollectionName)
            expect(sourceDocs.length).toEqual(docsInDbSortedOnId.length)
            let destinationDocs = await adapter.getAll<TestInterface>(destinationCollectionName)
            expect(destinationDocs.length).toEqual(0)
            const retVal = 'done migrating docs from source to destination!'
            getTransactionRetVal.mockReturnValue(retVal)

            const result = await adapter.runTransaction(migrateDocsFromSourceToDestinationCollectionTransaction)

            expect(result).toBe(retVal)
            sourceDocs = await adapter.getAll<TestInterface>(sourceCollectionName)
            expect(sourceDocs.length).toEqual(0)
            destinationDocs = await adapter.getAll<TestInterface>(destinationCollectionName)
            expect(destinationDocs.length).toEqual(docsInDbSortedOnId.length)
        })

        it('when transaction throws an error, does not commit transaction and throws', async () => {
            let sourceDocs = await adapter.getAll<TestInterface>(sourceCollectionName)
            expect(sourceDocs.length).toEqual(docsInDbSortedOnId.length)
            let destinationDocs = await adapter.getAll<TestInterface>(destinationCollectionName)
            expect(destinationDocs.length).toEqual(0)

            const exception = 'simulating failed transaction'
            try {
                getTransactionRetVal.mockImplementation(() => {
                    throw exception
                })
                await adapter.runTransaction(migrateDocsFromSourceToDestinationCollectionTransaction)
                fail('we were supposed to throw an exception on a failed transaction')
            } catch (e) {
                expect(e).toBe(exception)
                sourceDocs = await adapter.getAll<TestInterface>(sourceCollectionName)
                expect(sourceDocs.length).toEqual(docsInDbSortedOnId.length)
                destinationDocs = await adapter.getAll<TestInterface>(destinationCollectionName)
                expect(destinationDocs.length).toEqual(0)
            }
        })

        afterEach(async () => {
            await adapter.deleteAll(sourceCollectionName)
            await adapter.deleteAll(destinationCollectionName)
        })
    })

    afterEach(async () => {
        await adapter.deleteAll(collectionName)
        app.delete()
    })
})
