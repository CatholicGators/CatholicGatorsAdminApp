import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import Firestore from './firestore';
import * as firebase from 'firebase/app';
import clientConfig from './testUtils/testConfig';
import DocumentNotFoundError from '../models/documentNotFoundError'

describe('firestore', () => {
    let firestore: Firestore
    const collection = 'collection';
    const testDoc = {testData: 'data'};
    let docId;
    let docIds;
    const specificDocId = 'docId';
    const testDocs = [
        {
            testData: '0'
        },
        {
            testData: '1'
        },
        {
            testData: '2'
        }
    ];

    beforeEach(() => {
        firestore = new Firestore(firebase, clientConfig);
    });


    it('successfully adds a document', done => {
        firestore.addDoc(collection, testDoc)
            .subscribe(
                ref => {
                    docId = ref.id;
                    expect(ref).toEqual(expect.anything());
                    done();
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully adds a document with a specified docId', done => {
        firestore.upsertDocById(collection, specificDocId, testDoc)
            .subscribe(
                () => {
                    done();
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully adds multiple documents', done => {
        firestore.upsertDocs(collection, testDocs)
            .subscribe(
                refs => {
                    docIds = refs.map(x => x.id);
                    done();
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully gets a document', done => {
        firestore.getDoc(collection, docId)
            .subscribe(
                doc => {
                    expect(doc).toEqual({
                        id: docId,
                        data: testDoc
                    }
                    );
                    done();
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully updates a document', done => {
        const newTestData = {
            testData: 'new data'
        };
        firestore.updateDoc(collection, docId, newTestData)
            .pipe(
                mergeMap(_ => firestore.getDoc(collection, docId))
            ).subscribe(
                doc => {
                    expect(doc).toEqual({
                        id: docId,
                        data: newTestData
                    });
                    done();
                },
                err => {
                    done.fail(err);
                }
            )
    });

    it('successfully updates multiple documents', done => {
        const newTestData = [
            {
                id: docIds[0],
                testData: 'x'
            },
            {
                id: docIds[1],
                testData: 'y'
            },
            {
                id: docIds[2],
                testData: 'z'
            }
        ];

        firestore.updateDocs(collection, newTestData)
            .subscribe(
                _ => {
                    done();
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully deletes a document', done => {
        forkJoin(
            firestore.deleteDoc(collection, docId),
            firestore.deleteDoc(collection, specificDocId)
        )
            .pipe(
                mergeMap(
                    _ => forkJoin(
                        firestore.getDoc(collection, docId),
                        firestore.getDoc(collection, specificDocId)
                    )
                )
            )
            .subscribe(
                () => {
                    done.fail('Test should not have been able to retrieve doc after deletion');
                },
                err => {
                    expect(err instanceof DocumentNotFoundError).toBeTruthy();
                    done();
                }
            );
    });

    it('successfully deletes multiple documents', done => {
        firestore.deleteDocs(collection, docIds)
            .pipe(
                mergeMap(
                    _ => firestore.getDoc(collection, docIds[0])
                )
            )
            .subscribe(
                () => {
                    done.fail('Test should not have been able to retrieve doc after deletion');
                },
                err => {
                    expect(err instanceof DocumentNotFoundError).toBeTruthy();
                    done();
                }
            );
    });

    afterAll(done => {
        firestore.closeConnection()
            .subscribe(
                () => {
                    done();
                }
            );
    });
});
