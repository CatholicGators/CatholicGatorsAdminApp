import { usersActions } from "../actions/usersActions";

export const INITIAL_USERS_STATE = {
    users: undefined,
};

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users,
});

const applyUpdatedUser = (state, action) => ({
    ...state,
    users: state.users.map((user) =>
        user.id === action.user.id ? { ...action.user } : user
    ),
});

function usersReducer(state = INITIAL_USERS_STATE, action) {
    switch (action.type) {
        case usersActions.GET_USERS_SUCCESS: {
            return applyUsersList(state, action);
        }
        case usersActions.UPDATE_USER_SUCCESS: {
            return applyUpdatedUser(state, action);
        }
        default:
            return state;
    }
}

export default usersReducer;
