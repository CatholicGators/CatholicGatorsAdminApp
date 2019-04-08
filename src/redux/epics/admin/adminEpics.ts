import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    adminActions,
    getUsersSuccess,
    getUsersErr,
    getUsers,
    batchDeleteUsersErr,
    updateUserErr
} from '../../actions/admin/adminActions';

export const getUsersEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(adminActions.GET_USERS),
        mergeMap(() =>
            userService.getAllUsers().pipe(
                map(users => getUsersSuccess(users)),
                catchError(err => ActionsObservable.of(getUsersErr(err)))
            )
        )
    )
}

export const updateUserEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(adminActions.UPDATE_USER),
        mergeMap((action: any) => 
            userService.updateUser(action.user.id, action.user).pipe(
                map(() => getUsers()),
                catchError(err => ActionsObservable.of(updateUserErr(err)))
            )
        )
    )
}

export const batchDeleteUsersEpic = (action$, _, { userService }) => {
    return action$.pipe(
        ofType(adminActions.BATCH_DELETE_USERS),
        mergeMap((action: any) => 
            userService.deleteUsers(action.ids).pipe(
                map(() => getUsers()),
                catchError(err => ActionsObservable.of(batchDeleteUsersErr(err)))
            )
        )
    )
}

export default combineEpics(
    getUsersEpic,
    updateUserEpic,
    batchDeleteUsersEpic
);
