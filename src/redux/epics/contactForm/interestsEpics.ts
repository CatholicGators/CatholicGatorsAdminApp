import { mergeMap, map, catchError } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'
import { combineEpics } from 'redux-observable'

import {
    interestActions,
    updateInterestsSuccess,
    updateInterestsErr,
    getInterestsSuccess,
    getInterestsErr
} from '../../actions/contactForm/interestActions'

export const getInterests = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(interestActions.GET_INTERESTS),
        mergeMap(() => 
            firestore.getCollection('interests').pipe(
                map(interests => getInterestsSuccess(interests)),
                catchError(err => ActionsObservable.of(getInterestsErr(err)))
            )
        )
    )
}

export const updateInterests = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(interestActions.UPDATE_INTERESTS),
        mergeMap((action: any) =>
            firestore.upsertDocs('interests', action.interests).pipe(
                map(interests => updateInterestsSuccess(interests)),
                catchError(err => ActionsObservable.of(updateInterestsErr(err)))
            )
        )
    )
}

export default combineEpics(
    getInterests,
    updateInterests
)
