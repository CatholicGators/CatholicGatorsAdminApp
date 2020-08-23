import { mergeMap, map, catchError } from "rxjs/operators"
import { ofType, ActionsObservable } from "redux-observable"
import { combineEpics } from "redux-observable"
import { from } from "rxjs/internal/observable/from"

import {
    interestActions,
    getInterestsSuccess,
    getInterestsErr,
    addOptionSuccess,
    addOptionErr,
    addSectionErr,
    addSectionSuccess,
    updateOptionTextSuccess,
    updateOptionTextErr,
} from "../actions/interestActions"
import { Dependencies } from "redux/store"

export const getInterestsEpic = (
    action$,
    _,
    { interestsService }: Dependencies
) => {
    return action$.pipe(
        ofType(interestActions.GET_INTERESTS),
        mergeMap(() =>
            from(interestsService.getInterests()).pipe(
                map((interests) => getInterestsSuccess(interests)),
                catchError((err) => ActionsObservable.of(getInterestsErr(err)))
            )
        )
    )
}

export const addOptionEpic = (action$, _, { interestsService }: Dependencies) =>
    action$.pipe(
        ofType(interestActions.ADD_OPTION),
        mergeMap((action: any) =>
            from(
                interestsService.addOption(action.sectionId, action.option)
            ).pipe(
                map((option: any) =>
                    addOptionSuccess(action.sectionId, option)
                ),
                catchError((err) => ActionsObservable.of(addOptionErr(err)))
            )
        )
    )

export const updateOptionTextEpic = (
    action$,
    _,
    { interestsService }: Dependencies
) =>
    action$.pipe(
        ofType(interestActions.UPDATE_OPTION_TEXT),
        mergeMap((action: any) =>
            from(
                interestsService.updateOptionText(
                    action.optionId,
                    action.newText
                )
            ).pipe(
                map((option: any) => updateOptionTextSuccess(option)),
                catchError((err) =>
                    ActionsObservable.of(updateOptionTextErr(err))
                )
            )
        )
    )

export const addSectionEpic = (
    action$,
    _,
    { interestsService }: Dependencies
) =>
    action$.pipe(
        ofType(interestActions.ADD_SECTION),
        mergeMap((action: any) =>
            from(interestsService.addSection(action.section)).pipe(
                map((section: any) => addSectionSuccess(section)),
                catchError((err) => ActionsObservable.of(addSectionErr(err)))
            )
        )
    )

export default combineEpics(
    getInterestsEpic,
    addOptionEpic,
    updateOptionTextEpic,
    addSectionEpic
)
