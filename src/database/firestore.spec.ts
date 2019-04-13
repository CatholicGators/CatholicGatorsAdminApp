import 'firebase/auth';

import Firestore from './firestore';
import { clientConfig, firebase, app, db, batch, collectionReference, reference } from './testUtils/mockFirebase';
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

        it('removes id from entity before storing', done => {
            const mockObj = {
                data: 'data'
            }

            reference.add.mockResolvedValue();

            firestore.addDoc('collection', {id: 'id', ...mockObj})
                .subscribe(
                    ref => {
                        expect(reference.add).toBeCalledWith(mockObj);
                        done();
                    }
                );
        });

        it('removes uid from entity before storing', done => {
            const mockObj = {
                data: 'data'
            }

            reference.add.mockResolvedValue();

            firestore.addDoc('collection', {uid: 'uid', ...mockObj})
                .subscribe(
                    ref => {
                        expect(reference.add).toBeCalledWith(mockObj);
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

        it('returns the document reference', done => {
            reference.set.mockResolvedValue();

            firestore.upsertDocById('collection', 'docId', {})
                .subscribe(
                    docRef => {
                        expect(docRef).toBe(reference);
                        done();
                    }
                );
        });

        it('removes id before storing', done => {
            const mockObj = {
                data: 'data'
            }

            reference.set.mockResolvedValue();

            firestore.upsertDocById('collection', 'docId', {id: 'id', ...mockObj})
                .subscribe(
                    docRef => {
                        expect(reference.set).toHaveBeenCalledWith(mockObj);
                        done();
                    }
                );
        });

        it('removes uid before storing', done => {
            const mockObj = {
                data: 'data'
            }

            reference.set.mockResolvedValue();

            firestore.upsertDocById('collection', 'docId', {uid: 'uid', ...mockObj})
                .subscribe(
                    docRef => {
                        expect(reference.set).toHaveBeenCalledWith(mockObj);
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

    describe('upsertDocs()', () => {
        it('successfully adds documents without an id', done => {
            const documents = [
                {
                    field: '0'
                },
                {
                    field: '1'
                },
                {
                    field: '2'
                }
            ]

            batch.commit.mockResolvedValue();

            firestore.upsertDocs('collection', documents)
                .subscribe(
                    _ => {
                        expect(db.batch).toHaveBeenCalled();
                        expect(batch.set).toHaveBeenCalledTimes(3);
                        expect(collectionReference.doc).toHaveBeenCalledWith();
                        done();
                    }
                );
        });

        it('successfully adds documents with an id', done => {
            const documents = [
                {
                    field: '0',
                    id: 'a'
                },
                {
                    field: '1',
                    id: 'b'
                },
                {
                    field: '2',
                    id: 'c'
                }
            ]

            batch.commit.mockResolvedValue();

            firestore.upsertDocs('collection', documents)
                .subscribe(
                    _ => {
                        expect(db.batch).toHaveBeenCalled();
                        expect(batch.set).toHaveBeenCalledTimes(3);
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(1, 'a');
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(2, 'b');
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(3, 'c');
                        done();
                    }
                );
        });

        it('removes id before storing', done => {
            const documents: any[] = [
                {
                    field: '0',
                },
                {
                    field: '1',
                },
                {
                    field: '2',
                }
            ]

            const documentsWithIds = documents.map(x => ({id: 'id', ...x}));

            batch.commit.mockResolvedValue();

            firestore.upsertDocs('collection', documentsWithIds)
                .subscribe(
                    _ => {
                        expect(batch.set.mock.calls[0][1]).toEqual(documents[0]);
                        expect(batch.set.mock.calls[1][1]).toEqual(documents[1]);
                        expect(batch.set.mock.calls[2][1]).toEqual(documents[2]);
                        done();
                    }
                );
        });

        it('successfully adds documents with a uid', done => {
            const documents = [
                {
                    field: '0',
                    uid: 'a'
                },
                {
                    field: '1',
                    uid: 'b'
                },
                {
                    field: '2',
                    uid: 'c'
                }
            ]

            batch.commit.mockResolvedValue();

            firestore.upsertDocs('collection', documents)
                .subscribe(
                    _ => {
                        expect(db.batch).toHaveBeenCalled();
                        expect(batch.set).toHaveBeenCalledTimes(3);
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(1, 'a');
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(2, 'b');
                        expect(collectionReference.doc).toHaveBeenNthCalledWith(3, 'c');
                        done();
                    }
                );
        });

        it('removes uid before storing', done => {
            const documents: any[] = [
                {
                    field: '0',
                },
                {
                    field: '1',
                },
                {
                    field: '2',
                }
            ]

            const documentsWithIds = documents.map(x => {
                x = { ...x };
                x.uid = 'uid';
                return x;
            })

            batch.commit.mockResolvedValue();

            firestore.upsertDocs('collection', documentsWithIds)
                .subscribe(
                    _ => {
                        expect(batch.set.mock.calls[0][1]).toEqual(documents[0]);
                        expect(batch.set.mock.calls[1][1]).toEqual(documents[1]);
                        expect(batch.set.mock.calls[2][1]).toEqual(documents[2]);
                        done();
                    }
                );
        });

        it('passes the upsertDocs() error to the observable', done => {
            const testErr = new Error();
            const documents = [
                {
                    field: '0',
                    uid: 'a'
                },
                {
                    field: '1',
                    uid: 'b'
                },
                {
                    field: '2',
                    uid: 'c'
                }
            ]

            batch.commit.mockRejectedValue(testErr);

            firestore.upsertDocs('collection', documents)
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
                id: docId,
                data: () => data
            };
            reference.get.mockResolvedValue(documentSnapshot);

            firestore.getDoc('collection', docId)
                .subscribe(
                    entity => {
                        expect(entity).toEqual({
                            id: docId,
                            ...data
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
            const mockData = {
                data: 'data'
            };
            const docs = [
                {
                    id: '1',
                    data: () => mockData
                },
                {
                    id: '2',
                    data: () => mockData
                },
                {
                    id: '3',
                    data: () => mockData
                },
            ]
            const returnedDocs = [
                {
                    id: '1',
                    ...mockData
                },
                {
                    id: '2',
                    ...mockData
                },
                {
                    id: '3',
                    ...mockData
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
                    _ => {
                        expect(reference.update).toHaveBeenCalledWith({});
                        done();
                    }
                );

        });

        it('returns the document reference', done => {
            reference.update.mockResolvedValue()
            firestore.updateDoc('collection', 'docId', {})
                .subscribe(
                    docRef => {
                        expect(docRef).toBe(reference);
                        done();
                    }
                );
        });

        it('removes id before storing', done => {
            const mockObj = {
                data: 'data'
            };

            reference.update.mockResolvedValue()

            firestore.updateDoc('collection', 'docId', {id: 'id', ...mockObj})
                .subscribe(
                    _ => {
                        expect(reference.update).toHaveBeenCalledWith(mockObj);
                        done();
                    }
                );
        });

        it('removes uid before storing', done => {
            const mockObj = {
                data: 'data'
            };

            reference.update.mockResolvedValue()

            firestore.updateDoc('collection', 'docId', {uid: 'uid', ...mockObj})
                .subscribe(
                    _ => {
                        expect(reference.update).toHaveBeenCalledWith(mockObj);
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

    // TODO: Add updateDocs tests

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

    afterEach(() => {
        restoreMocks();
    });

    function restoreMocks() {
        jest.clearAllMocks();
    }
});
