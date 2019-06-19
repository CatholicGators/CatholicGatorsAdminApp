import { contactFormActions } from "../../actions/contactForm/contactFormActions";

export const INITIAL_CONTACT_FORM_STATE = {
    errorMessage: null,
    success: null,
    loading: false,
    contacts: undefined
};

const setLoading = state => ({
    ...state,
    errorMessage: null,
    success: null,
    loading: true
});

const setSuccess = state => ({
    ...state,
    success: true,
    loading: false
});

const setError = (state, action) => ({
    ...state,
    errorMessage: action.err,
    success: false,
    loading: false
});

const applyContacts = (state, action) => ({
    ...state,
    contacts: action.contacts
});

const updateContactStatus = (state, action) => ({
    ...state,
    contacts: state.contacts.map(contact =>
        contact.id == action.contact.id ? { ...action.contact } : contact
    )
});

const logError = (state: any, err: Error) => {
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }
    return state;
};

function contactFormReducer(state = INITIAL_CONTACT_FORM_STATE, action) {
    switch (action.type) {
        case contactFormActions.SUBMIT_CONTACT_FORM: {
            return setLoading(state);
        }
        case contactFormActions.SUBMIT_CONTACT_FORM_SUCCESS: {
            return setSuccess(state);
        }
        case contactFormActions.SUBMIT_CONTACT_FORM_ERR: {
            return setError(state, action);
        }
        case contactFormActions.GET_CONTACTS_SUCCESS: {
            return applyContacts(state, action);
        }
        case contactFormActions.UPDATE_CONTACT_STATUS_SUCCESS: {
            return updateContactStatus(state, action);
        }
        case contactFormActions.GET_CONTACTS_ERR:
        case contactFormActions.SUBMIT_CONTACT_FORM_ERR:
        case contactFormActions.UPDATE_CONTACT_STATUS_ERR:
            return logError(state, action.err);
        default:
            return state;
    }
}

export default contactFormReducer;
