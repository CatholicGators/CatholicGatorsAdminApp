import Firestore from '../firestore';
import * as firebase from 'firebase/app';
import clientConfig from '../testUtils/testConfig';

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
                    done.fail(new Error('Add to test firebase failed'));
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
                    done.fail(new Error('Get from test firebase failed'));
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
                    done();
                },
                err => {
                    done.fail(new Error('Update to test firebase failed'));
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
                    done.fail(new Error('Delete to test firebase failed'));
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
