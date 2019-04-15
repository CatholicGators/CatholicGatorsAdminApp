import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    contactFormActions,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr,
    updateContactStatusErr,
    updateContactStatusSuccess
} from '../../actions/contactForm/contactFormActions';

export const submitContactFormEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(contactFormActions.SUBMIT_CONTACT_FORM),
        mergeMap((action: any) =>
            firestore.addDoc('contactForms', action.form).pipe(
                map(() => submitContactFormSuccess()),
                catchError(err => ActionsObservable.of(submitContactFormErr(err)))
            )
        )
    );
};

export const getContactsEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(contactFormActions.GET_CONTACTS),
        mergeMap(() =>
            firestore.getCollection('contactForms').pipe(
                map(contacts => getContactsSuccess(contacts)),
                catchError(err => ActionsObservable.of(getContactsErr(err)))
            )
        )
    );
}

export const updateContactStatusEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(contactFormActions.UPDATE_CONTACT_STATUS),
        mergeMap((action: any) =>
            firestore.updateDoc('contactForms', action.contact.id, {...action.contact, status: action.status}).pipe(
                map(() => updateContactStatusSuccess({...action.contact, status: action.status})),
                catchError(err => ActionsObservable.of(updateContactStatusErr(err)))
            )
        )
    )
}

export default combineEpics(
    submitContactFormEpic,
    getContactsEpic,
    updateContactStatusEpic
);
