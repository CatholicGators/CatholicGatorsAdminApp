export const adminActions = {
    GET_USERS: 'GET_USERS',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    GET_USERS_ERR: 'GET_USERS_ERR',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERR: 'UPDATE_USER_ERR',
    DELETE_USER: 'DELETE_USER',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_ERR: 'DELETE_USER_ERR',
    BATCH_DELETE_USERS: 'BATCH_DELETE_USERS',
    BATCH_DELETE_USERS_SUCCESS: 'BATCH_DELETE_USERS_SUCCESS',
    BATCH_DELETE_USERS_ERR: 'BATCH_DELETE_USERS_ERR'
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

export function batchDeleteUsers(ids: String[]) {
    return { type: adminActions.BATCH_DELETE_USERS, ids }
}

export function batchDeleteUsersErr(err) {
    return { type: adminActions.BATCH_DELETE_USERS_ERR, err}
}
