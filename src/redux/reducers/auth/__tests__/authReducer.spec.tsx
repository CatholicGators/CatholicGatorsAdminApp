import { setUser } from '../../../actions/auth/authActionCreators';
import authReducer, { INITIAL_AUTH_STATE } from '../authReducer';

describe('authReducer', () => {
    let user;

    beforeAll(() => {
        user = {
            name: "Joey"
        };
    });

    it('applies user on SET_USER', () => {
        const action = setUser(user);

        expect(authReducer(undefined, action)).toEqual({
            ...INITIAL_AUTH_STATE,
            user: action.user
        });
    });
});