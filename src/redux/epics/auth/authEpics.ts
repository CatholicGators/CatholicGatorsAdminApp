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

export const listenForUserEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(authActions.LISTEN_FOR_USER),
        mergeMap(() =>
            userService.listenForUser().pipe(
                map(user => setUser(user)),
                catchError(err => ActionsObservable.of(listenForUserErr(err)))
            )
        )
    );
};

export const googleSignInEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(authActions.GOOGLE_SIGN_IN),
        mergeMap(() =>
            userService.googleSignIn().pipe(
                map(() => googleSignedIn()),
                catchError(err => ActionsObservable.of(googleSignInErr(err)))
            )
        )
    );
}

export const signOutEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(authActions.SIGN_OUT),
        mergeMap(() =>
            userService.signOut().pipe(
                map(() => signedOut()),
                catchError(err => ActionsObservable.of(signOutErr(err)))
            )
        )
    )
}

<<<<<<< HEAD
export const getUsersEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(authActions.GET_USERS),
        mergeMap(() =>
            userService.getAllUsers().pipe(
                map(users => getUsersSuccess(users)),
                catchError(err => ActionsObservable.of(getUsersErr(err)))
            )
        )
    )
}

=======
>>>>>>> 1bde6cf... Added admin redux module
export default combineEpics(
    listenForUserEpic,
    googleSignInEpic,
    signOutEpic
);
