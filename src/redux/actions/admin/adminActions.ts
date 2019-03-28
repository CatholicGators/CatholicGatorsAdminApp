export const adminActions = {
    GET_USERS: 'GET_USERS',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    GET_USERS_ERR: 'GET_USERS_ERR',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERR: 'UPDATE_USER_ERR',
    DELETE_USER: 'DELETE_USER',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_ERR: 'DELETE_USER_ERR'
}

export function getUsers() {
    return { type: adminActions.GET_USERS }
}

export function getUsersSuccess(users) {
    return { type: adminActions.GET_USERS_SUCCESS, users }
}

export function getUsersErr(err) {
    return { type: adminActions.GET_USERS_ERR, err }
}

export function updateUser(user) {
    return { type: adminActions.UPDATE_USER, user }
}

export function updateUserErr(err) {
    return { type: adminActions.UPDATE_USER_ERR, err }
}

export function updateUserSuccess(user) {
    return { type: adminActions.UPDATE_USER_SUCCESS, user }
}

export function deleteUser(id) {
    return { type: adminActions.DELETE_USER, id }
}

export function deleteUserSuccess(id) {
    return { type: adminActions.UPDATE_USER_SUCCESS, id }
}

export function deleteUserErr(err) {
    return { type: adminActions.DELETE_USER_ERR, err}
}
