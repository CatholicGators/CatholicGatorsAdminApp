import { mergeMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { authActions, setUser } from '../actions/authActions';
import { firestore } from '../../database/FirestoreDatabase';


export const loadFirebaseEpic = (action$) => {
    return action$.pipe(
        ofType(authActions.LOAD_FIREBASE),
        mergeMap(_ =>
            firestore.listenForUser().pipe(
                map(user => setUser(user)
            ))
        )
    );
};

export const googleSignInEpic = (action$) => {
    return action$.pipe(
        ofType(authActions.GOOGLE_SIGN_IN),
        tap(() => firestore.googleSignIn())
    )
}

export const googleSignOutEpic = (action$) => {
    return action$.pipe(
        ofType(authActions.SIGN_OUT),
        tap(() => {
        console.log("ere");firestore.signOut()})
    )
}