import {
    getUsersSuccess,
    updateUserSuccess
} from '../../actions/admin/adminActions';
import adminReducer, { INITIAL_AUTH_STATE } from './adminReducer';

describe('adminReducer', () => {
    let users;

    beforeAll(() => {
        users = [
            {
                id: "1",
                name: "Joey",
                isAdmin: false
            },
            {
                id: "2",
                name: "Ryan",
                isAdmin: false
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

    it('updates user on UPDATE_USER_SUCCESS', () => {
        const newUser = {
            ...users[0],
            isAdmin: true
        }
        const newUsers = [...users]
        newUsers[0] = newUser
        const action = updateUserSuccess(newUser)
        const state = {
            ...INITIAL_AUTH_STATE,
            users
        }

        expect(adminReducer(state, action)).toEqual({
            ...state,
            users: newUsers
        })
    })
});