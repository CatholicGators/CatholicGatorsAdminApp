import { adminActions } from '../../actions/admin/adminActions';

export const INITIAL_AUTH_STATE = {
    users: undefined
}

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users
})

function adminReducer(state = INITIAL_AUTH_STATE, action) {
    switch(action.type) {
        case adminActions.GET_USERS_SUCCESS : {
            return applyUsersList(state, action)
        }
        default : return state;
    }
}

export default adminReducer
