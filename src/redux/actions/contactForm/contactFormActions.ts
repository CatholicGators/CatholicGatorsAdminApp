export const contactFormActions = {
    SUBMIT_CONTACT_FORM: 'SUBMIT_CONTACT_FORM',
    SUBMIT_CONTACT_FORM_ERR: 'SUBMIT_CONTACT_FORM_ERR',
    SUBMIT_CONTACT_FORM_SUCCESS: 'SUBMIT_CONTACT_FORM_SUCCESS',
    GET_CONTACTS: 'GET_CONTACTS',
    GET_CONTACTS_SUCCESS: 'GET_CONTACTS_SUCCESS',
    GET_CONTACTS_ERR: 'GET_CONTACTS_ERR'
}

export function submitContactForm(form) {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM, form };
}

export function submitContactFormErr(err) {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM_ERR, err };
}

export function submitContactFormSuccess() {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM_SUCCESS }
}

export function getContacts() {
    return { type: contactFormActions.GET_CONTACTS }
}

export function getContactsSuccess(contacts) {
    return { type: contactFormActions.GET_CONTACTS_SUCCESS, contacts }
}

export function getContactsErr(err) {
    return { type: contactFormActions.GET_CONTACTS_ERR, err }
}
