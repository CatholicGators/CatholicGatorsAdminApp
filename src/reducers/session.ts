import actions from './actions';

const INITIAL_STATE = {
    user: null,
};

const applySetUser = (state, action) => ({
    ...state,
    user: action.user
});

function sessionReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.AUTH_USER_SET : {
            return applySetUser(state, action);
        }
        default : return state;
    }
}

export default sessionReducer;