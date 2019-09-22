import { adminActions } from '../actions/adminActions'

export const INITIAL_ADMIN_STATE = {
    users: undefined
}

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users
})

const applyUpdatedUser = (state, action) => ({
    ...state,
    users: state.users.map(user =>
        user.id === action.user.id ? { ...action.user } : user
    )
})

// TODO: when we refactor this out, we should structure the reducers in the admin module like this: https://stackoverflow.com/a/42519797
function adminReducer(state = INITIAL_ADMIN_STATE, action) {
    switch (action.type) {
        case adminActions.GET_USERS_SUCCESS: {
            return applyUsersList(state, action)
        }
        case adminActions.UPDATE_USER_SUCCESS: {
            return applyUpdatedUser(state, action)
        }
        default:
            return state
    }
}

export default adminReducer
