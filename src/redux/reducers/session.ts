import { authActions } from '../actions/authActions';

const INITIAL_STATE = {
    user: null,
};

const applySetUser = (state, action) => ({
    ...state,
    user: action.user
});

function sessionReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case authActions.SET_USER : {
            return applySetUser(state, action);
        }
        default : return state;
    }
}

export default sessionReducer;