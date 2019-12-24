import { of, throwError } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { ActionsObservable } from 'redux-observable'

import { listenForUserEpic, googleSignInEpic, signOutEpic } from './authEpics'

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
} from '../actions/authActions'

describe('authEpics', () => {
    let dependencies, userService, user

    beforeEach(() => {
        userService = {
            listenForUser: jest.fn(),
            googleSignIn: jest.fn(),
            signOut: jest.fn(),
            getAllUsers: jest.fn()
        }

        dependencies = {
            userService
        }

        user = {
            name: 'MCP'
        }
    })

    describe('listenForUserEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([listenForUser()])
            state$ = of()
        })

        it('emits SET_USER action for every user emitted', () => {
            const expectedAction = setUser(user)
            userService.listenForUser.mockReturnValue(of(expectedAction.user))

            return listenForUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits LISTEN_FOR_USER_ERR when userService.listenForUser() returns an error', () => {
            const expectedAction = listenForUserErr('test')
            userService.listenForUser.mockReturnValue(
                throwError(expectedAction.err)
            )

            return listenForUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })

    describe('googleSignInEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([googleSignIn()])
            state$ = of()
        })

        it('emits GOOGLE_SIGNED_IN action after sign in', () => {
            userService.googleSignIn.mockReturnValue(of(undefined))
            const expectedAction = googleSignedIn()

            return googleSignInEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits GOOGLE_SIGN_IN_ERR when userService.googleSignIn() returns an error', () => {
            const expectedAction = googleSignInErr('test')
            userService.googleSignIn.mockReturnValue(
                throwError(expectedAction.err)
            )

            return googleSignInEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })

    describe('signOutEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([signOut()])
            state$ = of()
        })

        it('emits SIGNED_OUT action after sign in', () => {
            userService.signOut.mockReturnValue(of(undefined))
            const expectedAction = signedOut()

            return signOutEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SIGN_OUT_ERR when userService.signout() returns an error', () => {
            const expectedAction = signOutErr('test')
            userService.signOut.mockReturnValue(throwError(expectedAction.err))

            return signOutEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })
})