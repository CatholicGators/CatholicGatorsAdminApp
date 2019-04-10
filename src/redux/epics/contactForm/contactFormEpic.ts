import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    contactFormActions,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr
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
                map(user => getContactsSuccess(user)),
                catchError(err => ActionsObservable.of(getContactsErr(err)))
            )
        )
    );
}

export default combineEpics(
    submitContactFormEpic,
    getContactsEpic
);
