import { Subject, of } from "rxjs";
import { listenForUserEpic } from '../authEpics';
import {
    listenForUser,
    setUser
} from "../../../actions/auth/authActionCreators";

describe('authEpics', () => {
    let dependencies, user;

    beforeEach(() => {
        dependencies = {
            firestore: {
                listenForUser: new Subject(),
                googleSignIn: new Subject(),
                signOut: new Subject()
            }
        };
        user = {};
    });

    describe('listenForUserEpic', () => {
        let action$, state$;

        beforeAll(() => {
            action$ = of(listenForUser());
            state$ = of();
        });

        it('returns SET_USER action for every user emitted', () => {
            const result$ = listenForUserEpic(action$, state$, dependencies);
            const action = setUser(user);
            result$.subscribe((result) => {
                expect(result).toBe(action);
            });

            dependencies.firestore.listenForUser.next(user);
        })
    });
});