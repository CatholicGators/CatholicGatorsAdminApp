import { of, throwError } from "rxjs";
import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import {
    listenForUserEpic,
    googleSignInEpic,
    signOutEpic
} from './authEpics';

import {
    listenForUser,
    setUser,
    googleSignIn,
    googleSignedIn,
    signOut,
    signedOut,
    listenForUserErr,
    googleSignInErr,
    signOutErr
} from "../../actions/auth/authActions";

describe('authEpics', () => {
    let dependencies, firestore, user;

    beforeEach(() => {
        firestore = {
            listenForUser: jest.fn(),
            googleSignIn: jest.fn(),
            signOut: jest.fn()
        };

        dependencies = {
            firestore
        };

        user = {
            name: "MCP"
        };
    });

    describe('listenForUserEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([listenForUser()]);
            state$ = of();
        });

        it('emits SET_USER action for every user emitted', () => {
            const expectedAction = setUser(user);
            firestore.listenForUser.mockReturnValue(of(expectedAction.user));

            return listenForUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it('emits LISTEN_FOR_USER_ERR when firestore.listenForUser() returns an error', () => {
            const expectedAction = listenForUserErr("test");
            firestore.listenForUser.mockReturnValue(throwError(expectedAction.err));

            return listenForUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });

    describe('googleSignInEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([googleSignIn()]);
            state$ = of();
        });

        it('emits GOOGLE_SIGNED_IN action after sign in', () => {
            firestore.googleSignIn.mockReturnValue(of(undefined));
            const expectedAction = googleSignedIn();

            return googleSignInEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it('emits GOOGLE_SIGN_IN_ERR when firestore.googleSignIn() returns an error', () => {
            const expectedAction = googleSignInErr("test");
            firestore.googleSignIn.mockReturnValue(throwError(expectedAction.err));

            return googleSignInEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });

    describe('signOutEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([signOut()]);
            state$ = of();
        });

        it('emits SIGNED_OUT action after sign in', () => {
            firestore.signOut.mockReturnValue(of(undefined));
            const expectedAction = signedOut();

            return signOutEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it('emits SIGN_OUT_ERR when firestore.signout() returns an error', () => {
            const expectedAction = signOutErr("test");
            firestore.signOut.mockReturnValue(throwError(expectedAction.err));

            return signOutEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });
});