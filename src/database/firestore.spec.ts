import { toArray, take } from 'rxjs/operators';

import { auth as firebaseAuth } from 'firebase/app';
import 'firebase/auth';

import Firestore from './firestore';

describe('firestore', () => {
    let clientConfig,
        firebase,
        app,
        auth,
        authCallBack,
        authErrCallBack,
        firestore;

    beforeEach(() => {
        clientConfig = "test";
        auth = {
            onAuthStateChanged: jest.fn((cb, errcb) => {
                authCallBack = cb;
                authErrCallBack = errcb;
            }),
            signInWithRedirect: jest.fn(),
            signOut: jest.fn()
        } 
        app = {
            auth: jest.fn(() => {
                return auth;
            })
        };
        firebase = {
            apps: [],
            initializeApp: jest.fn(() => {
                firebase.apps.push(app);
                return app
            }),
            app: jest.fn(() => {
                return app;
            })
        };

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
});