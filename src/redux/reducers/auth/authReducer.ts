import { authActions } from "../../actions/auth/authActions";

export const INITIAL_AUTH_STATE = {
    user: undefined,
    users: undefined
};

const applySetUser = (state, action) => ({
    ...state,
    user: action.user
});

const logError = (state: any, err: Error) => {
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }
    return state;
};

function authReducer(state = INITIAL_AUTH_STATE, action) {
    switch (action.type) {
        case authActions.SET_USER: {
            return applySetUser(state, action);
        }
        case authActions.LISTEN_FOR_USER_ERR:
        case authActions.GOOGLE_SIGN_IN_ERR:
        case authActions.SIGN_OUT_ERR:
            return logError(state, action.err);
        default:
            return state;
    }
}

export default authReducer;
