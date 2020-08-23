import { of, throwError } from "rxjs";
import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import {
    getUsersEpic,
    updateUserEpic,
    batchDeleteUsersEpic,
} from "./usersEpics";

import {
    getUsers,
    getUsersSuccess,
    getUsersErr,
    updateUser,
    updateUserErr,
    batchDeleteUsers,
    batchDeleteUsersErr,
} from "../actions/usersActions";

describe("usersEpics", () => {
    let dependencies, userService, users;

    beforeEach(() => {
        userService = {
            getAllUsers: jest.fn(),
            updateUser: jest.fn(),
            batchDeleteUsers: jest.fn(),
        };

        dependencies = {
            userService,
        };

        users = [
            {
                id: "1",
                name: "Joey",
            },
            {
                id: "2",
                name: "Ryan",
            },
        ];
    });

    describe("getUsersEpic", () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([getUsers()]);
            state$ = of();
        });

        it("emits GET_USERS_SUCCESS action after successful get", () => {
            userService.getAllUsers.mockReturnValue(of(users));
            const expectedAction = getUsersSuccess(users);

            return getUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it("emits GET_USERS_ERR when userService.getAllUsers() returns an error", () => {
            const expectedAction = getUsersErr("test");
            userService.getAllUsers.mockReturnValue(
                throwError(expectedAction.err)
            );

            return getUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });

    describe("updateUserEpic", () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([updateUser(users[0])]);
            state$ = of();
        });

        it("emits GET_USERS action after successful update", () => {
            userService.updateUser.mockReturnValue(of(undefined));
            const expectedAction = getUsers();

            return updateUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it("emits UPDATE_USERS_ERR when userService.updateUser() returns an error", () => {
            const expectedAction = updateUserErr("test");
            userService.updateUser.mockReturnValue(
                throwError(expectedAction.err)
            );

            return updateUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });

    describe("batchDeleteUsersEpic", () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([
                batchDeleteUsers(users.map((user) => user.id)),
            ]);
            state$ = of();
        });

        it("emits GET_USERS action after successful batch delete", () => {
            userService.batchDeleteUsers.mockReturnValue(of(undefined));
            const expectedAction = getUsers();

            return batchDeleteUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it("emits BATCH_DELETE_USERS_ERR when userService.batchDeleteUsers() returns an error", () => {
            const expectedAction = batchDeleteUsersErr("test");
            userService.batchDeleteUsers.mockReturnValue(
                throwError(expectedAction.err)
            );

            return batchDeleteUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });
});
