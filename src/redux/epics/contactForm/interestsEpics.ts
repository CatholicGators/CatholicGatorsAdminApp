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
    addOptionErr,
    addSectionErr,
    addSectionSuccess
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
    ofType(interestActions.ADD_OPTION),
    mergeMap((action: any) =>
        from(interestsService.addOption(action.sectionId, action.option)).pipe(
            map((option: any) => addOptionSuccess(action.sectionId, option)),
            catchError(err => ActionsObservable.of(addOptionErr(err)))
        )
    )
)

export const addSectionEpic = (action$, _, { interestsService }) => action$.pipe(
    ofType(interestActions.ADD_SECTION),
    mergeMap((action: any) =>
        from(interestsService.addSection(action.section)).pipe(
            map((section: any) => addSectionSuccess(section)),
            catchError(err => ActionsObservable.of(addSectionErr(err)))
        )
    )
)

export default combineEpics(
    getInterestsEpic,
    updateInterestsEpic,
    addOptionEpic,
    addSectionEpic
)
