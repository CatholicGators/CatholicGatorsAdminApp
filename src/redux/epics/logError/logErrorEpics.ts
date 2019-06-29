import { filter, mergeMap } from "rxjs/operators";
import { combineEpics, ActionsObservable } from "redux-observable";

export const logErrorEpic = action$ => {
    return action$.pipe(
        filter((action: any): boolean => action.err),
        mergeMap(
            (action: any): ActionsObservable<any> => {
                if (process.env.NODE_ENV === "development") {
                    console.error(action);
                }

                return ActionsObservable.of(null);
            }
        )
    );
};

export default combineEpics(logErrorEpic);
