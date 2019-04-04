import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    adminActions,
    getUsersSuccess,
    getUsersErr,
    updateUserSuccess,
    deleteUserSuccess
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

export const updateUserEpic = (action$) => {
    return action$.pipe(
        ofType(adminActions.UPDATE_USER),
        mergeMap((action: any) => {
            console.log("Updating user")
            return ActionsObservable.of(updateUserSuccess(action.user))
        })
    )
}

export const deleteUserEpic = (action$) => {
    return action$.pipe(
        ofType(adminActions.DELETE_USER),
        mergeMap((action: any) => {
            console.log("Deleting user")
            return ActionsObservable.of(deleteUserSuccess(action.id))
        })
    )
}

export default combineEpics(
    getUsersEpic,
    updateUserEpic,
    deleteUserEpic
);
