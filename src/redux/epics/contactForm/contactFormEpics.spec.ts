import { of } from "rxjs"
import { toArray } from "rxjs/operators"
import { ActionsObservable } from "redux-observable"

import {
    submitContactFormEpic,
    getAllContactsEpic,
    updateContactStatusEpic
} from './contactFormEpics'

import {
    Contact
} from '../../../services/contactFormService'

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

const testContact: Contact = {
    id: '123',
    firstName: 'testing',
    lastName: 'testing',
    gender: 'testing',
    email: 'testing',
    phoneNumber: 'testing',
    graduationSemester: 'testing',
    graduationYear: 'testing',
    school: 'testing',
    permanentAddress: 'testing',
    city: 'testing',
    state: 'testing',
    zipCode: 'testing',
    housingComplex: 'testing',
    parentName: 'testing',
    parentPhone: 'testing',
    parentEmail: 'testing',
    interests: ['123', '456'],
    status: 2568,
    createdAt: new Date
}

describe('contactFormEpics', () => {
    let dependencies, contactFormService, contacts, form

    beforeEach(() => {
        contactFormService = {
            addContact: jest.fn(),
            getAllContacts: jest.fn(),
            updateContactStatus: jest.fn()
        }

        dependencies = {
            contactFormService
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
            contactFormService.addContact.mockResolvedValue(testContact)
            const expectedAction = submitContactFormSuccess()

            return submitContactFormEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when addDoc() returns an error', () => {
            const err = "test"
            contactFormService.addContact.mockRejectedValue(err)
            const expectedAction = submitContactFormErr(err)

            return submitContactFormEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })

    describe('getAllContactsEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([getContacts()])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', () => {
            contactFormService.getAllContacts.mockResolvedValue(contacts)
            const expectedAction = getContactsSuccess(contacts)

            return getAllContactsEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', () => {
            const err = "test"
            contactFormService.getAllContacts.mockRejectedValue(err)
            const expectedAction = getContactsErr(err)

            return getAllContactsEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })

    describe('updateContactStatusEpic', () => {
        let action$, state$
        let status = 2

        beforeAll(() => {
            action$ = ActionsObservable.from([updateContactStatus(testContact, status)])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', () => {
            contactFormService.updateContactStatus.mockResolvedValue({ ...testContact, status })
            const expectedAction = updateContactStatusSuccess({ ...testContact, status })

            return updateContactStatusEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', () => {
            const err = "test"
            contactFormService.updateContactStatus.mockRejectedValue(err)
            const expectedAction = updateContactStatusErr(err)

            return updateContactStatusEpic(action$, state$, dependencies)
                .pipe(toArray())
                .toPromise()
                .then((result) => {
                    expect(result).toEqual([expectedAction])
                })
        })
    })
})
