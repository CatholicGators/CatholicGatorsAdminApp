import { adminActions } from "../../actions/admin/adminActions";

export const INITIAL_ADMIN_STATE = {
    users: undefined
};

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users
});

const applyUpdatedUser = (state, action) => ({
    ...state,
    users: state.users.map(user =>
        user.id === action.user.id ? { ...action.user } : user
    )
});

const logError = (state: any, err: Error) => {
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }
    return state;
};

function adminReducer(state = INITIAL_ADMIN_STATE, action) {
    switch (action.type) {
        case adminActions.GET_USERS_SUCCESS: {
            return applyUsersList(state, action);
        }
        case adminActions.UPDATE_USER_SUCCESS: {
            return applyUpdatedUser(state, action);
        }
        case adminActions.BATCH_DELETE_USERS_ERR:
        case adminActions.DELETE_USER_ERR:
        case adminActions.GET_USERS_ERR:
        case adminActions.UPDATE_USER_ERR:
            return logError(state, action.err);
        default:
            return state;
    }
}

export default adminReducer;
