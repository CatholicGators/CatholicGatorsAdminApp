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

    const uploadDocs = async () => {
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
        await uploadDocs()
    })

    describe('get()', () => {
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

    describe('getAll()', () => {
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

    describe('add()', () => {
        it('successfully adds a document and assigns an id', async () => {
            const doc = {
                foo: ''
            }

            const data = await adapter.add<TestInterface>(collectionName, doc)

            expect(data.id).toBeTruthy()
            expect(data.foo).toEqual(doc.foo)
        })
    })

    describe('delete()', () => {
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

    describe('deleteAll()', () => {
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

    afterEach(async () => {
        await adapter.deleteAll(collectionName)
        app.delete()
    })
})
