import { mergeMap, map, catchError } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'
import { combineEpics } from 'redux-observable'

import {
    interestActions,
    updateInterestsErr,
    getInterestsSuccess,
    getInterestsErr,
    getInterests
} from '../../actions/contactForm/interestActions'

export const getInterestsEpic = (action$, _, { firestore }) => {
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

export default combineEpics(
    getInterestsEpic,
    updateInterestsEpic
)
