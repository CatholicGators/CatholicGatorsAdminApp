import { toArray, take } from 'rxjs/operators';

import { auth as firebaseAuth } from 'firebase/app';
import 'firebase/auth';

import Firestore from '../firestore';
import { clientConfig, firebase, app, auth, authCallBack, authErrCallBack, reference } from '../testUtils/mockFirebase';

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

        it('initializes the app\'s auth', () => {
            new Firestore(firebase, clientConfig);

            expect(app.auth).toHaveBeenCalled();
        });
    });

    describe('listenForUser()', () => {
        it('emits user every time auth.onAuthStateChanged(...) calls its callback', done => {
            const users = [
                {
                    name: "Ryan",
                },
                null,
                {
                    name: "MCP"
                }
            ];

            firestore.listenForUser()
                .pipe(
                    take(users.length),
                    toArray()
                ).subscribe(result => {
                    expect(result).toEqual(users);
                    done();
                });

            users.forEach(user => {
                authCallBack(user);
            });

        });

        it('passes the auth.onAuthStateChanged(...) error to the observable', done => {
            const err = 'test';

            firestore.listenForUser()
                .subscribe(
                    () => {
                        throw 'The error was not tripped';
                    },
                    result => {
                        expect(result).toBe(err)
                        done();
                    }
                );

            authErrCallBack(err);
        });
    });

    describe('googleSignIn()', () => {
        it('uses GoogleAuthProvider for the redirect', () => {
            firestore.googleSignIn().subscribe();

            expect(auth.signInWithRedirect).toHaveBeenCalledWith(new firebaseAuth.GoogleAuthProvider());
        });

        it('fires next then completes the observable', done => {
            auth.signInWithRedirect.mockReturnValue(Promise.resolve());
            let resultCorrect = false;

            firestore.googleSignIn()
                .subscribe(
                    result => {
                        resultCorrect = result === undefined;
                    },
                    undefined,
                    () => {
                        expect(resultCorrect).toBe(true);
                        done();
                    }
                );
        });

        it('passes the auth.signInWithRedirect(...) error to the observable', done => {
            const testErr = 'test';
            auth.signInWithRedirect.mockReturnValue(Promise.reject(testErr));

            firestore.googleSignIn()
                .subscribe(
                    undefined,
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('signOut()', () => {
        it('calls auth.SignOut()', () => {
            firestore.signOut()
                .subscribe();

            expect(auth.signOut).toHaveBeenCalled();
        });

        it('fires next then completes the observable', done => {
            auth.signOut.mockReturnValue(Promise.resolve());
            let resultCorrect = false;

            firestore.signOut()
                .subscribe(
                    result => {
                        resultCorrect = result === undefined;
                    },
                    undefined,
                    () => {
                        expect(resultCorrect).toBe(true);
                        done();
                    }
                );
        });

        it('passes the auth.signOut() error to the observable', done => {
            const testErr = 'test';
            auth.signOut.mockReturnValue(Promise.reject(testErr));

            firestore.signOut()
                .subscribe(
                    undefined,
                    err => {
                        expect(err).toBe(testErr);
                        done();
                    }
                );
        });
    });

    describe('addDoc()', () => {
        it('successfully adds a document', done => {
            reference.add.mockReturnValue(Promise.resolve());

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
            reference.add.mockReturnValue(Promise.resolve(docRef));

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
            reference.add.mockReturnValue(Promise.reject(testErr))

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

    describe('updateDoc()', () => {
        it('successfully updates a document', done => {
            reference.update.mockReturnValue(Promise.resolve())
            firestore.updateDoc('collection', 'docId', {})
                .subscribe(
                    () => {
                        expect(reference.update).toHaveBeenCalled();
                        done();
                    }
                );

        });

        it('passes the addDoc() error to the observable', done => {
            const testErr = new Error();
            reference.update.mockReturnValue(Promise.reject(testErr))

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

    describe('getDoc()', () => {
        it('successfully gets a document', done => {
            const data = { mockData: 'data' }
            const documentSnapshot = {
                exists: true,
                data: () => data
            }
            reference.get.mockReturnValue(Promise.resolve(documentSnapshot));

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    ()  => {
                        expect(reference.get).toHaveBeenCalled();
                        done();
                    }
                );

        });

        it('passes only the data to the observable', done => {
            const data = { mockData: 'data' }
            const documentSnapshot = {
                exists: true,
                data: () => data
            }
            reference.get.mockReturnValue(Promise.resolve(documentSnapshot));

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    entity => {
                        expect(entity).toBe(data);
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
            reference.get.mockReturnValue(Promise.resolve(documentSnapshot));

            firestore.getDoc('collection', 'docId')
                .subscribe(
                    entity => {
                        done.fail(new Error('Observable should not receive document snapshot'));
                    },
                    err => {
                        expect(err.message).toBe('Document does not exist');
                        done();
                    }
                );
        });

        it('passes the getDoc() error to the observable', done => {
            const testErr = new Error();
            reference.get.mockReturnValue(Promise.reject(testErr));

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

    describe('deleteDoc()', () => {
        it('successfully deletes a document', done => {
            reference.delete.mockReturnValue(Promise.resolve());
            firestore.deleteDoc('collection', 'docId')
                .subscribe(
                    () => {
                        expect(reference.delete).toHaveBeenCalled();
                        done();
                    }
                );

        });

        it('passes the getDoc() error to the observable', done => {
            const testErr = new Error();
            reference.delete.mockReturnValue(Promise.reject(testErr));

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
});
