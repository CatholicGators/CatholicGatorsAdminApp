import { mergeMap, map, catchError } from "rxjs/operators"
import { ofType, ActionsObservable } from "redux-observable"
import { combineEpics } from "redux-observable"

import {
    authActions,
    setUser,
    signedOut,
    googleSignedIn,
    listenForUserErr,
    googleSignInErr,
    signOutErr,
} from "../actions/authActions"
import { Dependencies } from "redux/store"
import { from } from "rxjs"

export const listenForUserEpic = (
    action$,
    _,
    { authService }: Dependencies
) => {
    return action$.pipe(
        ofType(authActions.LISTEN_FOR_USER),
        mergeMap(() =>
            authService.listenForUser().pipe(
                map((user) => setUser(user)),
                catchError((err) => ActionsObservable.of(listenForUserErr(err)))
            )
        )
    )
}

export const googleSignInEpic = (action$, _, { authService }: Dependencies) => {
    return action$.pipe(
        ofType(authActions.GOOGLE_SIGN_IN),
        mergeMap(() =>
            from(authService.googleSignIn()).pipe(
                map(() => googleSignedIn()),
                catchError((err) => ActionsObservable.of(googleSignInErr(err)))
            )
        )
    )
}

export const signOutEpic = (action$, _, { authService }: Dependencies) => {
    return action$.pipe(
        ofType(authActions.SIGN_OUT),
        mergeMap(() =>
            from(authService.signOut()).pipe(
                map(() => signedOut()),
                catchError((err) => ActionsObservable.of(signOutErr(err)))
            )
        )
    )
}

export default combineEpics(listenForUserEpic, googleSignInEpic, signOutEpic)
