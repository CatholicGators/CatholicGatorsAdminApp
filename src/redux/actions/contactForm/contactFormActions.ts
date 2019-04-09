export const contactFormActions = {
    SUBMIT_CONTACT_FORM: 'SUBMIT_CONTACT_FORM',
    SUBMIT_CONTACT_FORM_ERR: 'SUBMIT_CONTACT_FORM_ERR',
    SUBMIT_CONTACT_FORM_SUCCESS: 'SUBMIT_CONTACT_FORM_SUCCESS',
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
