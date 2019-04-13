import { of, throwError } from "rxjs"
import { toArray } from "rxjs/operators"
import { ActionsObservable } from "redux-observable"

import {
    submitContactFormEpic,
    getContactsEpic
} from './contactFormEpics'

import {
    submitContactForm,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr,
    getContacts
} from "../../actions/contactForm/contactFormActions"

describe('contactFormEpics', () => {
    let dependencies, firestore, contacts, form

    beforeEach(() => {
        firestore = {
            addDoc: jest.fn(),
            getCollection: jest.fn()
        }

        dependencies = {
            firestore
        }

        contacts = [
            {
                id: "1",
                name: "Joey"
            },
            {
                id: "2",
                name: "Ryan"
            }
        ]

        form = {}
    })

    describe('submitContactFormEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([submitContactForm(form)])
            state$ = of()
        })

        it('emits SUBMIT_CONTACT_FORM_SUCCESS action after successful get', () => {
            firestore.addDoc.mockReturnValue(of(undefined))
            const expectedAction = submitContactFormSuccess()

            return submitContactFormEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', () => {
            const expectedAction = submitContactFormErr("test")
            firestore.addDoc.mockReturnValue(throwError(expectedAction.err))

            return submitContactFormEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })

    describe('getContactsEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([getContacts()])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', () => {
            firestore.getCollection.mockReturnValue(of(contacts))
            const expectedAction = getContactsSuccess(contacts)

            return getContactsEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', () => {
            const expectedAction = getContactsErr("test")
            firestore.getCollection.mockReturnValue(throwError(expectedAction.err))

            return getContactsEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })
})