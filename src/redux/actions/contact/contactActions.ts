export const contactActions = {
    GET_CONTACTS: 'GET_CONTACTS',
    GET_CONTACTS_SUCCESS: 'GET_CONTACTS_SUCCESS',
    GET_CONTACTS_ERR: 'GET_CONTACTS_ERR'
}

export function getContacts() {
    return { type: contactActions.GET_CONTACTS }
}

export function getContactsSuccess(contacts) {
    return { type: contactActions.GET_CONTACTS_SUCCESS, contacts }
}

export function getContactsErr(err) {
    return { type: contactActions.GET_CONTACTS_ERR, err }
}
