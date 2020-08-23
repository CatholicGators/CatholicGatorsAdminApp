import { mergeMap, map, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { combineEpics } from "redux-observable";

import {
    usersActions,
    getUsersSuccess,
    getUsersErr,
    getUsers,
    batchDeleteUsersErr,
    updateUserErr,
} from "../actions/usersActions";
import { Dependencies } from "redux/store";
import { from } from "rxjs";

export const getUsersEpic = (action$, _, { userService }: Dependencies) => {
    return action$.pipe(
        ofType(usersActions.GET_USERS),
        mergeMap(() =>
            from(userService.getAllUsers()).pipe(
                map((users) => getUsersSuccess(users)),
                catchError((err) => ActionsObservable.of(getUsersErr(err)))
            )
        )
    );
};

export const updateUserEpic = (action$, _, { userService }: Dependencies) => {
    return action$.pipe(
        ofType(usersActions.UPDATE_USER),
        mergeMap((action: any) =>
            from(userService.updateUser(action.user.id, action.user)).pipe(
                map(() => getUsers()),
                catchError((err) => ActionsObservable.of(updateUserErr(err)))
            )
        )
    );
};

export const batchDeleteUsersEpic = (
    action$,
    _,
    { userService }: Dependencies
) => {
    return action$.pipe(
        ofType(usersActions.BATCH_DELETE_USERS),
        mergeMap((action: any) =>
            from(userService.batchDeleteUsers(action.ids)).pipe(
                map(() => getUsers()),
                catchError((err) =>
                    ActionsObservable.of(batchDeleteUsersErr(err))
                )
            )
        )
    );
};

export default combineEpics(getUsersEpic, updateUserEpic, batchDeleteUsersEpic);
