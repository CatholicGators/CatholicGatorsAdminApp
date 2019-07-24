import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import { logErrorEpic } from "./logErrorEpics";
import { listenForUser } from "../../actions/auth/authActions";

describe("logErrorEpics", () => {
    describe("logErrorEpic", () => {
        let action$;

        beforeAll(() => {
            action$ = ActionsObservable.from([listenForUser()]);
        });

        it("runs console.log in development mode", () => {
            return logErrorEpic(action$)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(global.console.log).toHaveBeenCalledWith(result);
                });
        });

        it("does not run console.log in production mode", () => {
            return logErrorEpic(action$)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(global.console.log).toHaveBeenCalledWith(result);
                });
        });
    });
});
