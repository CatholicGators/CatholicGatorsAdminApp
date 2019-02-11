import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import authActions from '../../actions/auth/authActions';
import {
    setUser,
    signedOut,
    googleSignedIn
} from '../../actions/auth/authActionCreators';

export const listenForUserEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.LISTEN_FOR_USER),
        mergeMap(() =>
            firestore.listenForUser().pipe(
                map(user => setUser(user))
            )
        )
    );
};

export const googleSignInEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.GOOGLE_SIGN_IN),
        mergeMap(() => 
            firestore.googleSignIn().pipe(
                map(() => googleSignedIn())
            )
        )
    );
}

export const googleSignOutEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(authActions.SIGN_OUT),
        mergeMap(() => 
            firestore.signOut().pipe(
                map(() => signedOut())
            )
        )
    )
}

export default combineEpics(
    listenForUserEpic,
    googleSignInEpic,
    googleSignOutEpic
);
