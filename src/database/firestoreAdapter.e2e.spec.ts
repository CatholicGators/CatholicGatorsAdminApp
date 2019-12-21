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
    let adapter: FirestoreAdapter, app: firebase.app.App, db: firebase.firestore.Firestore

    beforeEach(() => {
        app = firebase.initializeApp(clientConfig)
        db = app.firestore()
        adapter = new FirestoreAdapter(db)
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
            const testId = 'garbage'

            try {
                await adapter.get<TestInterface>(collectionName, testId)
                fail('expected DocNotFoundError')
            } catch (e) {
                expect(e instanceof DocNotFoundError).toBeTruthy()
            }
        })
    })

    describe('getAll()', () => {
        it('when given a collection name that has docs in it, returns all of the docs', async () => {
            const docsToAdd = [
                {
                    foo: 'bar'
                },
                {
                    foo: 'bazz'
                }
            ]
            const docsAdded = []

            for (let i = 0; i < docsToAdd.length; i++) {
                const addedDoc = await adapter.add<TestInterface>(collectionName, docsToAdd[i])
                docsAdded.push(addedDoc)
            }
            const dataFromGet = await adapter.getAll<TestInterface>(collectionName)

            expect(dataFromGet).toEqual(docsAdded)
        })

        it('when given a collection name that has no docs in it, returns empty list', async () => {
            const data = await adapter.getAll<TestInterface>('garbage')

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

    afterEach(() => {
        app.delete()
    })
})
