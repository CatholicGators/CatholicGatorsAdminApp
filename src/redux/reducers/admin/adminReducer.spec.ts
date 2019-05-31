import {
    getUsersSuccess,
    updateUserSuccess
} from '../../actions/admin/adminActions'
import adminReducer, { INITIAL_ADMIN_STATE } from './adminReducer'

describe('adminReducer', () => {
    let users

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
        ]
    })

    it('returns the state unmutated by default', () => {
        const action = { type: 'foo' }
        const state = {
            ...INITIAL_ADMIN_STATE,
            user: 'bar'
        }

        expect(adminReducer(state, action)).toEqual(state)
    })

    it('applies list of users on GET_USERS_SUCCESS', () => {
        const action = getUsersSuccess(users)

        expect(adminReducer(undefined, action)).toEqual({
            ...INITIAL_ADMIN_STATE,
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
            ...INITIAL_ADMIN_STATE,
            users
        }

        expect(adminReducer(state, action)).toEqual({
            ...state,
            users: newUsers
        })
    })
})