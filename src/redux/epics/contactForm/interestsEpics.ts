import { mergeMap, map, catchError } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'
import { combineEpics } from 'redux-observable'
import { from } from 'rxjs/internal/observable/from';

import {
    interestActions,
    updateInterestsErr,
    getInterestsSuccess,
    getInterestsErr,
    getInterests,
    addOptionSuccess,
    addOptionErr
} from '../../actions/contactForm/interestActions'

export const getInterestsEpic = (action$, _, { interestsService }) => {
    return action$.pipe(
        ofType(interestActions.GET_INTERESTS),
        mergeMap(() =>
            from(interestsService.getInterests()).pipe(
                map(interests => getInterestsSuccess(interests)),
                catchError(err => ActionsObservable.of(getInterestsErr(err)))
            )
        )
    )
}

export const updateInterestsEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(interestActions.UPDATE_INTERESTS),
        mergeMap((action: any) =>
            firestore.upsertDocs('interests', action.interests).pipe(
                map(() => getInterests()),
                catchError(err => ActionsObservable.of(updateInterestsErr(err)))
            )
        )
    )
}

export const addOptionEpic = (action$, _, { interestsService }) => action$.pipe(
    ofType(interestActions.ADD_INTERESTS),
    mergeMap((action: any) =>
        from(interestsService.addOption(action.option)).pipe(
            map(() => addOptionSuccess(action.option)),
            catchError(err => ActionsObservable.of(addOptionErr(err)))
        )
    )
)

export default combineEpics(
    getInterestsEpic,
    updateInterestsEpic,
    addOptionEpic
)
