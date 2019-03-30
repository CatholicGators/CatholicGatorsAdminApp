import 'firebase/auth';

import Firestore from './firestore';
import { clientConfig, firebase, app, reference } from './testUtils/mockFirebase';
import DocumentNotFoundError from '../models/documentNotFoundError';

describe('firestore', () => {
    let firestore: Firestore

    beforeEach(() => {
        firestore = new Firestore(firebase, clientConfig);
    });

    describe('constructor', () => {
        it('initializes firebase app only once', () => {
            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.initializeApp).toHaveBeenLastCalledWith(clientConfig);
            expect(firebase.app).not.toHaveBeenCalled();

            new Firestore(firebase, clientConfig);

            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.app).toHaveBeenCalledTimes(1);
        });

        it('initializes the app\'s Firestore', () => {
            new Firestore(firebase, clientConfig);

            expect(app.firestore).toHaveBeenCalled();
        });
    });

    describe('getAuth()', () => {
        it('retrieves the auth object from Firebase', () => {
            firestore.getAuth();

            expect(app.auth).toHaveBeenCalled();
        });
    });

    describe('addDoc()', () => {
        it('successfully adds a document', done => {
            reference.add.mockResolvedValue();

            firestore.addDoc('collection', {})
                .subscribe(
                    _ => {
                        expect(reference.add).toHaveBeenCalled();
                        done();
                    }
                );
        });

        it('passes document reference to the observable', done => {
            const docRef = {docId: 'id'};
            reference.add.mockResolvedValue(docRef);

            firestore.addDoc('collection', {})
                .subscribe(
                    ref => {
                        expect(ref).toBe(docRef);
                        done();
                    }
                );
        });

        it('passes the addDoc() error to the observable', done => {
            const testErr = new Error();
            reference.add.mockRejectedValue(testErr)

            firestore.addDoc('collection', {})
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('upsertDocById()', () => {
        it('successfully adds a document with a specified docId', done => {
            reference.set.mockResolvedValue();

            firestore.upsertDocById('collection', 'docId', {})
                .subscribe(
                    _ => {
                        expect(reference.set).toHaveBeenCalled();
                        done();
                    }
                );
        });

        it('passes the upsertDocById() error to the observable', done => {
            const testErr = new Error();
            reference.set.mockRejectedValue(testErr)

            firestore.upsertDocById('collection', 'docId', {})
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('getDoc()', () => {
        it('successfully gets a document', done => {
            const data = { mockData: 'data' }
            const documentSnapshot = {
                exists: true,
                data: () => data
            }
            reference.get.mockResolvedValue(documentSnapshot);

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    ()  => {
                        expect(reference.get).toHaveBeenCalled();
                        done();
                    }
                );

        });

        it('passes only the id and data to the observable', done => {
            const docId = 'docId';
            const data = { mockData: 'data' };
            const documentSnapshot = {
                exists: true,
                data: () => data
            };
            reference.get.mockResolvedValue(documentSnapshot);

            firestore.getDoc('collection', docId)
                .subscribe(
                    entity => {
                        expect(entity).toEqual({
                            id: docId,
                            data: data
                        });
                        done();
                    },
                    err => {
                        done.fail(new Error('Observable should not pass error'));
                    }
                );
        });

        it('passes an error to the observable when the document does not exist', done => {
            const documentSnapshot = {
                exists: false,
                data: () => null
            }
            reference.get.mockResolvedValue(documentSnapshot);

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    entity => {
                        done.fail(new Error('Observable should not receive document snapshot'));
                    },
                    err => {
                        expect(err instanceof DocumentNotFoundError).toBeTruthy();
                        done();
                    }
                );
        });

        it('passes the getDoc() error to the observable', done => {
            const testErr = new Error();
            reference.get.mockRejectedValue(testErr);

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('getCollection()', () => {
        it('successfully gets a collection', done => {
            const docs = [
                {
                    id: '1',
                    data: () => ({ data: 'data' })
                },
                {
                    id: '2',
                    data: () => ({ data: 'data' })
                },
                {
                    id: '3',
                    data: () => ({ data: 'data' })
                },
            ]
            const returnedDocs = [
                {
                    id: '1',
                    data: { data: 'data' }
                },
                {
                    id: '2',
                    data: { data: 'data' }
                },
                {
                    id: '3',
                    data: { data: 'data' }
                },
            ]
            reference.get.mockResolvedValue({ docs });

            firestore.getCollection('collection')
                .subscribe(
                    collection => {
                        expect(collection).toEqual(returnedDocs);
                        done();
                    }
                );
        });

        it('passes the getCollection() error to the observable', done => {
            const testErr = new Error();
            reference.get.mockRejectedValue(testErr);

            firestore.getCollection('collection')
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('doesExist()', () => {
        it('passes whether a doc exists to the observable', done => {
            const documentSnapshot = {
                exists: false,
                data: () => null
            }
            reference.get.mockResolvedValue(documentSnapshot);

            firestore.doesExist('collection', 'docId')
                .subscribe(
                    exists => {
                        expect(exists).toBe(false);
                        done();
                    },
                    err => {
                        done.fail(err);
                    }
                );
        });

        it('passes the doesExist() error to the observable', done => {
            const testErr = new Error();
            reference.get.mockRejectedValue(testErr);

            firestore.doesExist('collection', 'docId')
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('updateDoc()', () => {
        it('successfully updates a document', done => {
            reference.update.mockResolvedValue()
            firestore.updateDoc('collection', 'docId', {})
                .subscribe(
                    () => {
                        expect(reference.update).toHaveBeenCalledWith({});
                        done();
                    }
                );

        });

        it('passes the updateDoc() error to the observable', done => {
            const testErr = new Error();
            reference.update.mockRejectedValue(testErr)

            firestore.updateDoc('collection', 'docId', {})
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('deleteDoc()', () => {
        it('successfully deletes a document', done => {
            reference.delete.mockResolvedValue();
            firestore.deleteDoc('collection', 'docId')
                .subscribe(
                    () => {
                        expect(reference.delete).toHaveBeenCalled();
                        done();
                    }
                );

        });

        it('passes the deleteDoc() error to the observable', done => {
            const testErr = new Error();
            reference.delete.mockRejectedValue(testErr);

            firestore.deleteDoc('collection', 'docId')
                .subscribe(
                    entity => {
                        done.fail(new Error('Promise should not resolve'));
                    },
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('closeConnection()', () => {
        it('deletes the firebase app', done => {
            expect(app.isDeleted_).toBe(false);
            firestore.closeConnection()
                .subscribe(
                    () => {
                        expect(app.isDeleted_).toBe(true);
                        done();
                    }
                );

        });
    });

});
