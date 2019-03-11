import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    authActions,
    setUser,
    signedOut,
    googleSignedIn,
    listenForUserErr,
    googleSignInErr,
    signOutErr
} from '../../actions/auth/authActions';

export const listenForUserEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.LISTEN_FOR_USER),
        mergeMap(() =>
            firestore.listenForUser().pipe(
                map(user => setUser(user)),
                catchError(err => ActionsObservable.of(listenForUserErr(err)))
            )
        )
    );
};

export const googleSignInEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.GOOGLE_SIGN_IN),
        mergeMap(() =>
            firestore.googleSignIn().pipe(
                map(() => googleSignedIn()),
                catchError(err => ActionsObservable.of(googleSignInErr(err)))
            )
        )
    );
}

export const signOutEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.SIGN_OUT),
        mergeMap(() =>
            firestore.signOut().pipe(
                map(() => signedOut()),
                catchError(err => ActionsObservable.of(signOutErr(err)))
            )
        )
    )
}

export default combineEpics(
    listenForUserEpic,
    googleSignInEpic,
    signOutEpic
);
