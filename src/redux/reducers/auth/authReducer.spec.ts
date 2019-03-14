import { setUser, getUsersSuccess } from '../../actions/auth/authActions';
import authReducer, { INITIAL_AUTH_STATE } from './authReducer';

describe('authReducer', () => {
    let user, users;

    beforeAll(() => {
        user = {
            name: "Joey"
        };

        users = [
            user,
            {
                name: "Joey"
            },
            {
                name: "Ryan"
            }
        ];
    });

    it('returns the state unmutated by default', () => {
        const action = { type: 'foo' };
        const state = {
            ...INITIAL_AUTH_STATE,
            user: 'bar'
        };

        expect(authReducer(state, action)).toEqual(state);
    });

    it('applies user on SET_USER', () => {
        const action = setUser(user);

        expect(authReducer(undefined, action)).toEqual({
            ...INITIAL_AUTH_STATE,
            user: action.user
        });
    });

    it('applies list of users on GET_USERS_SUCCESS', () => {
        const action = getUsersSuccess(users);

        expect(authReducer(undefined, action)).toEqual({
            ...INITIAL_AUTH_STATE,
            users: action.users
        })
    })
});