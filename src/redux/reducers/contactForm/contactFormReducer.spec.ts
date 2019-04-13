import {
    submitContactForm, submitContactFormSuccess, submitContactFormErr, getContactsSuccess
} from '../../actions/contactForm/contactFormActions'
import contactFormReducer, { INITIAL_CONTACT_FORM_STATE } from './contactFormReducer'

describe('contactFormReducer', () => {
    let form, contacts;

    beforeAll(() => {
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

    it('it sets loading on SUBMIT_CONTACT_FORM', () => {
        const action = submitContactForm(form);

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            errorMessage: null,
            success: null,
            loading: true
        })
    })

    it('it sets success on SUBMIT_CONTACT_FORM_SUCCESS', () => {
        const action = submitContactFormSuccess();

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            success: true,
            loading: false
        })
    })

    it('it sets success on SUBMIT_CONTACT_FORM_ERR', () => {
        const action = submitContactFormErr("test");

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            errorMessage: action.err,
            success: false,
            loading: false
        })
    })

    it('it applies the contacts list on GET_CONTACTS_SUCCESS', () => {
        const action = getContactsSuccess(contacts);

        expect(contactFormReducer(undefined, action)).toEqual({
            ...INITIAL_CONTACT_FORM_STATE,
            contacts: action.contacts
        })
    })
})