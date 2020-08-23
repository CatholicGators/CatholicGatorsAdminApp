export const usersActions = {
    GET_USERS: "GET_USERS",
    GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
    GET_USERS_ERR: "GET_USERS_ERR",
    UPDATE_USER: "UPDATE_USER",
    UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
    UPDATE_USER_ERR: "UPDATE_USER_ERR",
    DELETE_USER: "DELETE_USER",
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_ERR: "DELETE_USER_ERR",
    BATCH_DELETE_USERS: "BATCH_DELETE_USERS",
    BATCH_DELETE_USERS_SUCCESS: "BATCH_DELETE_USERS_SUCCESS",
    BATCH_DELETE_USERS_ERR: "BATCH_DELETE_USERS_ERR",
}

export function getUsers() {
    return { type: usersActions.GET_USERS }
}

export function getUsersSuccess(users) {
    return { type: usersActions.GET_USERS_SUCCESS, users }
}

export function getUsersErr(err) {
    return { type: usersActions.GET_USERS_ERR, err }
}

export function updateUser(user) {
    return { type: usersActions.UPDATE_USER, user }
}

export function updateUserErr(err) {
    return { type: usersActions.UPDATE_USER_ERR, err }
}

export function updateUserSuccess(user) {
    return { type: usersActions.UPDATE_USER_SUCCESS, user }
}

export function batchDeleteUsers(ids: String[]) {
    return { type: usersActions.BATCH_DELETE_USERS, ids }
}

export function batchDeleteUsersErr(err) {
    return { type: usersActions.BATCH_DELETE_USERS_ERR, err }
}
