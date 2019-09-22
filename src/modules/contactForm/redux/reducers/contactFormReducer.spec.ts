import {
    submitContactForm,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    updateContactStatusSuccess,
    getContactFormInterestsSuccess
} from '../actions/contactFormActions'
import contactFormReducer, {
    INITIAL_CONTACT_FORM_STATE
} from './contactFormReducer'
import { Section } from '../../../admin/modules/interests/services/interestsService'

describe('contactFormReducer', () => {
    let form, contacts, interests: Section[]

    beforeAll(() => {
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

    it('returns the state unmutated by default', () => {
        const action = { type: 'foo' }
        const state = {
            ...INITIAL_CONTACT_FORM_STATE,
            user: 'bar'
        }

        expect(contactFormReducer(state, action)).toEqual(state)
    })

    it('sets loading on SUBMIT_CONTACT_FORM', () => {
        const action = submitContactForm(form)

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            errorMessage: null,
            success: null,
            loading: true
        })
    })

    it('sets success on SUBMIT_CONTACT_FORM_SUCCESS', () => {
        const action = submitContactFormSuccess()

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            success: true,
            loading: false
        })
    })

    it('sets success on SUBMIT_CONTACT_FORM_ERR', () => {
        const action = submitContactFormErr('test')

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            errorMessage: action.err,
            success: false,
            loading: false
        })
    })

    it('applies the contacts list on GET_CONTACTS_SUCCESS', () => {
        const action = getContactsSuccess(contacts)

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            contacts: action.contacts
        })
    })

    it('updates the contact form on UPDATE_CONTACT_STATUS_SUCCESS', () => {
        const newContact = {
            ...contacts[0],
            status: 'Test'
        }
        const newContacts = [...contacts]
        newContacts[0] = newContact
        const action = updateContactStatusSuccess(newContact)
        const state = {
            ...INITIAL_CONTACT_FORM_STATE,
            contacts
        }

        expect(contactFormReducer(state, action)).toEqual({
            ...state,
            contacts: newContacts
        })
    })

    it('updates the interests field on GET_CONTACT_FORM_INTERESTS_SUCCESS', () => {
        const action = getContactFormInterestsSuccess(interests)

        expect(contactFormReducer(INITIAL_CONTACT_FORM_STATE, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            interests
        })
    })
})
