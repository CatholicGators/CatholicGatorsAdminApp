import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";

import { logErrorEpic } from "./logErrorEpics";

describe("logErrorEpics", () => {
    describe("logErrorEpic", () => {
        let action$;

        beforeAll(() => {
            action$ = ActionsObservable.of(null);
        });

        it("runs console.log in development mode", () => {
            return logErrorEpic(action$)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual(true);
                });
        });

        it("does not run console.log in production mode", () => {
            return logErrorEpic(action$)
                .pipe(toArray())
                .toPromise()
                .then(result => {
                    expect(result).toEqual(false);
                });
        });
    });
});
