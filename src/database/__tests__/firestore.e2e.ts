import Firestore from '../firestore';
import * as firebase from 'firebase/app';
import clientConfig from '../testUtils/testConfig';

describe('firestore', () => {
    let firestore: Firestore

    beforeEach(() => {
        firestore = new Firestore(firebase, clientConfig);
    });

    describe('addDoc()', () => {
        it('successfully adds a document', done => {
            firestore.addDoc('collection', {})
                .subscribe(
                    ref => {
                        expect(ref).toEqual(expect.anything());
                        done();
                    },
                    err => {
                        done.fail(new Error('Add to test firebase failed'));
                    }
                );
        });
    });

    afterAll(() => {
        firestore.closeConnection();
    });
});
