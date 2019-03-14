import { authActions } from '../../actions/auth/authActions';

export const INITIAL_AUTH_STATE = {
    user: undefined,
    users: undefined
}

const applySetUser = (state, action) => ({
    ...state,
    user: action.user
})

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users
})

function authReducer(state = INITIAL_AUTH_STATE, action) {
    switch(action.type) {
        case authActions.SET_USER : {
            return applySetUser(state, action)
        }
        case authActions.GET_USERS_SUCCESS : {
            return applyUsersList(state, action)
        }
        default : return state;
    }
}

export default authReducer
