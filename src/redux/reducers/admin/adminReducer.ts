import { adminActions } from '../../actions/admin/adminActions';

export const INITIAL_AUTH_STATE = {
    users: undefined
}

const applyUsersList = (state, action) => ({
    ...state,
    users: action.users
})

const applyUpdatedUser = (state, action) => ({
    ...state,
    users: state.users.map(user => user.id === action.user.id ?
        { ...action.user } : 
        user
    ) 
})

const applyDeletedUser = (state, action) => ({
    ...state,
    users: state.users.filter(user => user.id != action.id)
})

function adminReducer(state = INITIAL_AUTH_STATE, action) {
    switch(action.type) {
        case adminActions.GET_USERS_SUCCESS : {
            return applyUsersList(state, action)
        }
        case adminActions.UPDATE_USER_SUCCESS : {
            return applyUpdatedUser(state, action)
        }
        case adminActions.DELETE_USER_SUCCESS : {
            return applyDeletedUser(state, action)
        }
        default : return state;
    }
}

export default adminReducer
