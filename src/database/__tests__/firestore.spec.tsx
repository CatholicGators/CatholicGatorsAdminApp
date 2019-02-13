import { of } from 'rxjs';
import { toArray, take, catchError, tap } from 'rxjs/operators';

import { auth as firebaseAuth } from 'firebase/app';
import 'firebase/auth';

import Firestore from '../firestore';

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
            signInWithRedirect: jest.fn()
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

            firestore = new Firestore(firebase, clientConfig);

            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.app).toHaveBeenCalledTimes(1);
        });

        it('initializes the app\'s auth', () => {
            let firestore = new Firestore(firebase, clientConfig);

            expect(app.auth).toHaveBeenCalled();
        });
    });

    describe('listenForUser()', () => {
        it('emits user every time auth.onAuthStateChanged(...) calls its callback', async () => {
            const users = [
                {
                    name: "Ryan",
                },
                null,
                {
                    name: "MCP"
                }
            ];

            const $result = firestore.listenForUser()
                .pipe(
                    take(users.length),
                    toArray()
                )
            $result.subscribe();

            users.forEach(user => {
                authCallBack(user);
            });

            await expect($result.toPromise()).resolves.toEqual(users);
        });

        it('passes the auth.onAuthStateChanged(...) error to the observable', () => {
            const err = 'test';

            const result$ = firestore.listenForUser().pipe(
                tap(result => {
                    throw 'The error was not tripped';
                }),
                catchError(result => {
                    expect(result).toBe(err)
                    return of();
                })
            ).subscribe(() => {});

            authCallBack(err);
        });
    });

    describe('googleSignIn()', () => {
        it('calls auth.SignInWithRedirect(...) then completes the observable', () => {
            auth.signInWithRedirect.mockReturnValue(Promise.reject());
            const mockSub = jest.fn(result => {
                expect(result).toEqual([]);
            });
            const mockComplete = jest.fn();

            firestore.googleSignIn().pipe(catchError(err => {
                console.log("we rejected")
                return of();
            })).subscribe(mockSub, undefined, mockComplete);

            expect(auth.signInWithRedirect).toHaveBeenCalledWith(new firebaseAuth.GoogleAuthProvider());
            expect(mockSub).toHaveBeenCalled();
            expect(mockComplete).toHaveBeenCalled();
        });
    });
});