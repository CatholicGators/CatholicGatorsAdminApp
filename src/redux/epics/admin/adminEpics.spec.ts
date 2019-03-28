import { of, throwError } from "rxjs";
import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import {
    getUsersEpic
} from './adminEpics';

import {
    getUsers,
    getUsersSuccess,
    getUsersErr
} from "../../actions/admin/adminActions";

describe('adminEpics', () => {
    let dependencies, firestore, users;

    beforeEach(() => {
        firestore = {
            getUsers: jest.fn()
        };

        dependencies = {
            firestore
        };

        users = [
            {
                name: "Joey"
            },
            {
                name: "Ryan"
            }
        ];
    });

    describe('getUsersEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([getUsers()]);
            state$ = of();
        });

        it('emits GET_USERS_SUCCESS action after successful get', () => {
            firestore.getUsers.mockReturnValue(of(users));
            const expectedAction = getUsersSuccess(users);

            return getUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });

        it('emits GET_USERS_ERR when firestore.getUsers() returns an error', () => {
            const expectedAction = getUsersErr("test");
            firestore.getUsers.mockReturnValue(throwError(expectedAction.err));

            return getUsersEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                });
        });
    });
});