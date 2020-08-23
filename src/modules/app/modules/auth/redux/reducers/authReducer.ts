import { authActions } from "../actions/authActions";

export const INITIAL_AUTH_STATE = {
    user: undefined,
    users: undefined,
};

const applySetUser = (state, action) => ({
    ...state,
    user: action.user,
});

function authReducer(state = INITIAL_AUTH_STATE, action) {
    switch (action.type) {
        case authActions.SET_USER: {
            return applySetUser(state, action);
        }
        default:
            return state;
    }
}

export default authReducer;
