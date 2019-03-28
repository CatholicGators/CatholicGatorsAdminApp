import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    adminActions,
    getUsersSuccess,
    getUsersErr
} from '../../actions/admin/adminActions';

export const getUsersEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(adminActions.GET_USERS),
        mergeMap(() =>
            firestore.getUsers().pipe(
                map(users => getUsersSuccess(users)),
                catchError(err => ActionsObservable.of(getUsersErr(err)))
            )
        )
    )
}

export default combineEpics(
    getUsersEpic
);
