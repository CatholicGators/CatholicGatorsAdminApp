import { of, throwError } from "rxjs"
import { toArray } from "rxjs/operators"
import { ActionsObservable } from "redux-observable"

import {
    submitContactFormEpic,
    getContactsEpic,
    updateContactStatusEpic
} from './contactFormEpics'

import {
    submitContactForm,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr,
    getContacts,
    updateContactStatus,
    updateContactStatusSuccess,
    updateContactStatusErr
} from "../../actions/contactForm/contactFormActions"

describe('contactFormEpics', () => {
    let dependencies, firestore, contacts, form

    beforeEach(() => {
        firestore = {
            addDoc: jest.fn(),
            getCollection: jest.fn(),
            updateDoc: jest.fn()
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

    describe('updateContactStatusEpic', () => {
        let action$, state$, contact, status = "Test"

        beforeAll(() => {
            contact = contacts[0]
            action$ = ActionsObservable.from([updateContactStatus(contact, status)])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', () => {
            firestore.updateDoc.mockReturnValue(of(contacts))
            const expectedAction = updateContactStatusSuccess({ ...contact, status })

            return updateContactStatusEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', () => {
            const expectedAction = updateContactStatusErr("test")
            firestore.updateDoc.mockReturnValue(throwError(expectedAction.err))

            return updateContactStatusEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })
})