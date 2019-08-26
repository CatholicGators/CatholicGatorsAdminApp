import { NewContactReq, Contact } from '../../services/contactFormService'

export const contactFormActions = {
    SUBMIT_CONTACT_FORM: 'SUBMIT_CONTACT_FORM',
    SUBMIT_CONTACT_FORM_ERR: 'SUBMIT_CONTACT_FORM_ERR',
    SUBMIT_CONTACT_FORM_SUCCESS: 'SUBMIT_CONTACT_FORM_SUCCESS',
    GET_CONTACTS: 'GET_CONTACTS',
    GET_CONTACTS_SUCCESS: 'GET_CONTACTS_SUCCESS',
    GET_CONTACTS_ERR: 'GET_CONTACTS_ERR',
    UPDATE_CONTACT_STATUS: 'UPDATE_CONTACT_STATUS',
    UPDATE_CONTACT_STATUS_SUCCESS: 'UPDATE_CONTACT_STATUS_SUCCESS',
    UPDATE_CONTACT_STATUS_ERR: 'UPDATE_CONTACT_STATUS_ER'
}

export function submitContactForm(contact: NewContactReq) {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM, contact }
}

export function submitContactFormErr(err: any) {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM_ERR, err }
}

export function submitContactFormSuccess() {
    return { type: contactFormActions.SUBMIT_CONTACT_FORM_SUCCESS }
}

export function getContacts() {
    return { type: contactFormActions.GET_CONTACTS }
}

export function getContactsSuccess(contacts: Contact[]) {
    return { type: contactFormActions.GET_CONTACTS_SUCCESS, contacts }
}

export function getContactsErr(err: any) {
    return { type: contactFormActions.GET_CONTACTS_ERR, err }
}

export function updateContactStatus(contact: Contact, status: number) {
    return { type: contactFormActions.UPDATE_CONTACT_STATUS, contact, status }
}

export function updateContactStatusSuccess(contact: Contact) {
    return { type: contactFormActions.UPDATE_CONTACT_STATUS_SUCCESS, contact }
}

export function updateContactStatusErr(err: any) {
    return { type: contactFormActions.UPDATE_CONTACT_STATUS_ERR, err }
}
