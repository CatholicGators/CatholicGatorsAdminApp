import { mergeMap, map, catchError } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'
import { combineEpics } from 'redux-observable'
import { from } from 'rxjs/internal/observable/from'

import {
    contactFormActions,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr,
    updateContactStatusErr,
    updateContactStatusSuccess,
    getInterestsSuccess,
    getInterestsErr
} from '../actions/contactFormActions'
import { Dependencies } from '../../../../redux/store'
import { Contact } from '../../services/contactFormService'

export const getInterestsEpic = (action$, _, { contactFormService } : Dependencies) => {
    return action$.pipe(
        ofType(contactFormActions.GET_CONTACT_FORM_INTERESTS),
        mergeMap(() =>
            from(contactFormService.getInterests()).pipe(
                map(interests => getInterestsSuccess(interests)),
                catchError(err => ActionsObservable.of(getInterestsErr(err)))
            )
        )
    )
}

export const submitContactFormEpic = (
    action$,
    _,
    { contactFormService }: Dependencies
) => {
    return action$.pipe(
        ofType(contactFormActions.SUBMIT_CONTACT_FORM),
        mergeMap((action: any) =>
            from(contactFormService.addContact(action.contact)).pipe(
                map(() => submitContactFormSuccess()),
                catchError(err =>
                    ActionsObservable.of(submitContactFormErr(err))
                )
            )
        )
    )
}

export const getAllContactsEpic = (
    action$,
    _,
    { contactFormService }: Dependencies
) => {
    return action$.pipe(
        ofType(contactFormActions.GET_CONTACTS),
        mergeMap(() =>
            from(contactFormService.getAllContacts()).pipe(
                map((contacts: Contact[]) => getContactsSuccess(contacts)),
                catchError(err => ActionsObservable.of(getContactsErr(err)))
            )
        )
    )
}

export const updateContactStatusEpic = (
    action$,
    _,
    { contactFormService }: Dependencies
) => {
    return action$.pipe(
        ofType(contactFormActions.UPDATE_CONTACT_STATUS),
        mergeMap((action: any) =>
            from(
                contactFormService.updateContactStatus(
                    action.contact.id,
                    action.status
                )
            ).pipe(
                map((contact: Contact) => updateContactStatusSuccess(contact)),
                catchError(err =>
                    ActionsObservable.of(updateContactStatusErr(err))
                )
            )
        )
    )
}

export default combineEpics(
    submitContactFormEpic,
    getAllContactsEpic,
    updateContactStatusEpic
)
