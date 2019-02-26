import Firestore from './firestore';
import * as firebase from 'firebase/app';
import clientConfig from './testUtils/testConfig';

describe('firestore', () => {
    let firestore: Firestore
    const collection = 'collection';
    const testDoc = {testData: 'data'};
    let docId;

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

    it('successfully gets a document', done => {
        firestore.getDoc(collection, docId)
            .subscribe(
                doc => {
                    expect(doc).toEqual(testDoc);
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
            .subscribe(
                () => {
                    firestore.getDoc(collection, docId)
                        .subscribe(
                            doc => {
                                expect(doc).toEqual(newTestData);
                                done();
                            },
                            err => {
                                done.fail(err);
                            }
                        );
                },
                err => {
                    done.fail(err);
                }
            );
    });

    it('successfully deletes a document', done => {
        firestore.deleteDoc(collection, docId)
            .subscribe(
                () => {
                    done();
                },
                err => {
                    done.fail(err);
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
