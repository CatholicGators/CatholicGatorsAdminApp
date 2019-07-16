import { Option } from '../../../../src/modules/admin/components/Interests/Interests'

export const interestActions = {
    GET_INTERESTS: 'GET_INTERESTS',
    GET_INTERESTS_SUCCESS: 'GET_INTERESTS_SUCCESS',
    GET_INTERESTS_ERR: 'GET_INTERESTS_ERR',
    ADD_INTERESTS: 'ADD_INTERESTS',
    ADD_INTERESTS_SUCCESS: 'ADD_INTERESTS_SUCCESS',
    ADD_INTERESTS_ERR: 'ADD_INTERESTS_ERR',
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

export const addOption = (sectionId: string, option: Option) => ({
    type: interestActions.ADD_INTERESTS,
    sectionId,
    option
})
export const addOptionSuccess = (option: Option) => ({
    type: interestActions.ADD_INTERESTS_SUCCESS,
    option 
})
export const addOptionErr = (err) => ({
    type: interestActions.ADD_INTERESTS_ERR,
    err
})

export const updateInterests = (interests) => ({
    type: interestActions.UPDATE_INTERESTS,
    interests
})

export function updateInterestsSuccess(interests) {
    return { type: interestActions.UPDATE_INTERESTS_SUCCESS, interests }
}

export function updateInterestsErr(err) {
    return { type: interestActions.UPDATE_INTERESTS_ERR, err }
}
