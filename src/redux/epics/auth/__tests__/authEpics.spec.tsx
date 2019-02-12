import { of } from "rxjs";
import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import { listenForUserEpic } from '../authEpics';
import {
    listenForUser,
    setUser
} from "../../../actions/auth/authActionCreators";

describe('authEpics', () => {
    let dependencies, firestore, user;

    beforeEach(() => {
        firestore = {
            listenForUser: jest.fn(),
            googleSignIn: jest.fn(),
            signOut: jest.fn()
        };

        dependencies = {
            firestore
        };

        user = {
            name: "MCP"
        };
    });

    describe('listenForUserEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = ActionsObservable.from([listenForUser()]);
            state$ = of();
        });

        it('returns SET_USER action for every user emitted', () => {
            firestore.listenForUser.mockReturnValue(of(user));
            const expectedAction = setUser(user);

            return listenForUserEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction]);
                })
 
        })
    });
});