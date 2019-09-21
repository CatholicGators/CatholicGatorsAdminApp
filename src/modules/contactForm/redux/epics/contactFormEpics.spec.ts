import { of } from 'rxjs'
import { ActionsObservable } from 'redux-observable'

import {
    submitContactFormEpic,
    getAllContactsEpic,
    updateContactStatusEpic,
    getContactFormInterestsEpic
} from './contactFormEpics'

import { Contact } from '../../services/contactFormService'

import {
    submitContactForm,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    getContactsErr,
    getContacts,
    updateContactStatus,
    updateContactStatusSuccess,
    updateContactStatusErr,
    getContactFormInterests,
    getContactFormInterestsSuccess,
    getContactFormInterestsErr
} from '../actions/contactFormActions'
import { Section } from '../../../admin/modules/interests/services/interestsService'

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
    createdAt: new Date()
}

describe('contactFormEpics', () => {
    let dependencies, contactFormService, contacts, form, interests: Section[]

    beforeEach(() => {
        contactFormService = {
            addContact: jest.fn(),
            getAllContacts: jest.fn(),
            updateContactStatus: jest.fn(),
            getInterests: jest.fn()
        }

        dependencies = {
            contactFormService
        }

        contacts = [
            {
                id: '1',
                name: 'Joey'
            },
            {
                id: '2',
                name: 'Ryan'
            }
        ]

        form = {}

        interests = [
            {
                id: '1',
                position: 0,
                text: 'section1',
                options: []
            },
            {
                id: '2',
                position: 1,
                text: 'section2',
                options: []
            }
        ]
    })

    describe('submitContactFormEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([submitContactForm(form)])
            state$ = of()
        })

        it('emits SUBMIT_CONTACT_FORM_SUCCESS action after successful get', done => {
            contactFormService.addContact.mockResolvedValue(testContact)
            const expectedAction = submitContactFormSuccess()

            submitContactFormEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when addDoc() returns an error', done => {
            const err = 'test'
            contactFormService.addContact.mockRejectedValue(err)
            const expectedAction = submitContactFormErr(err)

            submitContactFormEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })
    })

    describe('getAllContactsEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([getContacts()])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', done => {
            contactFormService.getAllContacts.mockResolvedValue(contacts)
            const expectedAction = getContactsSuccess(contacts)

            getAllContactsEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', done => {
            const err = 'test'
            contactFormService.getAllContacts.mockRejectedValue(err)
            const expectedAction = getContactsErr(err)

            getAllContactsEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })
    })

    describe('updateContactStatusEpic', () => {
        let action$, state$
        let status = 2

        beforeAll(() => {
            action$ = ActionsObservable.from([
                updateContactStatus(testContact, status)
            ])
            state$ = of()
        })

        it('emits GET_CONTACTS_SUCCESS action after successful get', done => {
            contactFormService.updateContactStatus.mockResolvedValue({
                ...testContact,
                status
            })
            const expectedAction = updateContactStatusSuccess({
                ...testContact,
                status
            })

            updateContactStatusEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })

        it('emits SUBMIT_CONTACT_FORM_ERR when firestore.addDoc() returns an error', done => {
            const err = 'test'
            contactFormService.updateContactStatus.mockRejectedValue(err)
            const expectedAction = updateContactStatusErr(err)

            updateContactStatusEpic(action$, state$, dependencies).subscribe(
                result => {
                    expect(result).toEqual(expectedAction)
                    done()
                }
            )
        })
    })

    describe('getContactFormInterestsEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([getContactFormInterests()])
            state$ = of()
        })

        it('emits GET_CONTACT_FORM_INTERESTS_SUCCESS action after successful get', done => {
            contactFormService.getInterests.mockResolvedValue(interests)
            const expectedAction = getContactFormInterestsSuccess(interests)

            getContactFormInterestsEpic(
                action$,
                state$,
                dependencies
            ).subscribe(result => {
                expect(result).toEqual(expectedAction)
                done()
            })
        })

        it('emits GET_CONTACT_FORM_INTERESTS_ERR when interestsService returns an error', done => {
            const err = 'test'
            contactFormService.getInterests.mockRejectedValue(err)
            const expectedAction = getContactFormInterestsErr(err)

            getContactFormInterestsEpic(
                action$,
                state$,
                dependencies
            ).subscribe(result => {
                expect(result).toEqual(expectedAction)
                done()
            })
        })
    })
})
