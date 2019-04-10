import { contactFormActions } from "../../actions/contactForm/contactFormActions"

export const INITIAL_CONTACT_FORM_STATE = {
    errorMessage: null,
    success: null,
    loading: false
};

const setLoading = (state) => ({
    ...state,
    errorMessage: null,
    success: null,
    loading: true
});

const setSuccess = (state) => ({
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

function contactFormReducer(state = INITIAL_CONTACT_FORM_STATE, action) {
    switch(action.type) {
        case contactFormActions.SUBMIT_CONTACT_FORM : {
            return setLoading(state);
        }
        case contactFormActions.SUBMIT_CONTACT_FORM_SUCCESS : {
            return setSuccess(state);
        }
        case contactFormActions.SUBMIT_CONTACT_FORM_ERR : {
            return setError(state, action);
        }
        default : return state;
    }
}

export default contactFormReducer;
