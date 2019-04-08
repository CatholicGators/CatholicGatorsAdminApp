import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';

import {
    contactActions,
    getContactsSuccess,
    getContactsErr
} from '../../actions/contact/contactActions';

export const getContactsEpic = (action$, _, { firestore }) => {
    return action$.pipe(
        ofType(contactActions.GET_CONTACTS),
        mergeMap(() =>
            firestore.getCollection('contactForms').pipe(
                map(user => getContactsSuccess(user)),
                catchError(err => ActionsObservable.of(getContactsErr(err)))
            )
        )
    );
}

export default combineEpics(
    getContactsEpic
);
