import { getUsersSuccess } from '../../actions/admin/adminActions';
import adminReducer, { INITIAL_AUTH_STATE } from './adminReducer';

describe('adminReducer', () => {
    let users;

    beforeAll(() => {
        users = [
            {
                name: "Joey"
            },
            {
                name: "Ryan"
            }
        ];
    });

    it('applies list of users on GET_USERS_SUCCESS', () => {
        const action = getUsersSuccess(users);

        expect(adminReducer(undefined, action)).toEqual({
            ...INITIAL_AUTH_STATE,
            users: action.users
        })
    })
});