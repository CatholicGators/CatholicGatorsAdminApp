import { authActions } from '../../actions/auth/authActions';

const INITIAL_STATE = {
    user: null,
};

const applySetUser = (state, action) => ({
    ...state,
    user: action.user
});

function authReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case authActions.SET_USER : {
            return applySetUser(state, action);
        }
        default : return state;
    }
}

export default authReducer;
