export const interestActions = {
    GET_INTERESTS: 'GET_INTERESTS',
    GET_INTERESTS_SUCCESS: 'GET_INTERESTS_SUCCESS',
    GET_INTERESTS_ERR: 'GET_INTERESTS_ERR',
    UPDATE_INTERESTS: 'UPDATE_INTERESTS',
    UPDATE_INTERESTS_SUCCESS: 'UPDATE_INTERESTS_SUCCESS',
    UPDATE_INTERESTS_ERR: 'UPDATE_INTERESTS_ERR'
}

export function getInterests() {
    return { type: interestActions.GET_INTERESTS }
}

export function getInterestsSuccess(interests) {
    return { type: interestActions.GET_INTERESTS_SUCCESS, interests }
}

export function getInterestsErr(err) {
    return { type: interestActions.GET_INTERESTS_ERR, err }
}

export function updateInterests(interests) {
    return { type: interestActions.UPDATE_INTERESTS, interests }
}

export function updateInterestsSuccess(interests) {
    return { type: interestActions.UPDATE_INTERESTS_SUCCESS, interests }
}

export function updateInterestsErr(err) {
    return { type: interestActions.UPDATE_INTERESTS_ERR, err }
}
