import { contactActions } from '../../actions/contact/contactActions';

export const INITIAL_CONTACT_STATE = {
    contacts: undefined,
}

const applyContacts = (state, action) => ({
    ...state,
    contacts: action.contacts
})

function contactReducer(state = INITIAL_CONTACT_STATE, action) {
    switch(action.type) {
        case contactActions.GET_CONTACTS_SUCCESS : {
            return applyContacts(state, action)
        }
        default : return state;
    }
}

export default contactReducer
