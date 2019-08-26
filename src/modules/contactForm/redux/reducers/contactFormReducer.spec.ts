import {
    submitContactForm,
    submitContactFormSuccess,
    submitContactFormErr,
    getContactsSuccess,
    updateContactStatusSuccess
} from '../actions/contactFormActions'
import contactFormReducer, {
    INITIAL_CONTACT_FORM_STATE
} from './contactFormReducer'
import {
    getInterestsSuccess,
    addOptionSuccess,
    addSectionSuccess
} from '../../../../redux/actions/contactForm/interestActions'
import { Section, Option } from '../../../../services/interestsService'

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

    it('updates the interests field on GET_INTERESTS_SUCCESS', () => {
        const action = getInterestsSuccess(interests)

        expect(contactFormReducer(INITIAL_CONTACT_FORM_STATE, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            interests
        })
    })

    it('updates the interests field with the new option on ADD_OPTION_SUCCESS', () => {
        const newOption: Option = {
            id: '1',
            text: 'test'
        }
        const action = addOptionSuccess(interests[0].id, newOption)
        const state = {
            ...INITIAL_CONTACT_FORM_STATE,
            interests
        }

        expect(
            contactFormReducer(state, action).interests[0].options[0]
        ).toEqual(newOption)
    })

    it('updates the interests field with the new section on ADD_SECTION_SUCCESS', () => {
        const newSection: Section = {
            id: '3',
            position: interests.length,
            text: 'section3',
            options: []
        }
        const action = addSectionSuccess(newSection)
        const state = {
            ...INITIAL_CONTACT_FORM_STATE,
            interests
        }

        expect(
            contactFormReducer(state, action).interests[newSection.position]
        ).toBe(newSection)
    })
})
