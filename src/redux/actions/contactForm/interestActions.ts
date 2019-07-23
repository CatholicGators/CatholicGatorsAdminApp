import { Option, Section } from '../../../../src/modules/admin/components/Interests/Interests'

export const interestActions = {
    GET_INTERESTS: 'GET_INTERESTS',
    GET_INTERESTS_SUCCESS: 'GET_INTERESTS_SUCCESS',
    GET_INTERESTS_ERR: 'GET_INTERESTS_ERR',
    ADD_OPTION: 'ADD_OPTION',
    ADD_OPTION_SUCCESS: 'ADD_OPTION_SUCCESS',
    ADD_OPTION_ERR: 'ADD_OPTION_ERR',
    UPDATE_INTERESTS: 'UPDATE_INTERESTS',
    UPDATE_INTERESTS_SUCCESS: 'UPDATE_INTERESTS_SUCCESS',
    UPDATE_INTERESTS_ERR: 'UPDATE_INTERESTS_ERR',
    ADD_SECTION: 'ADD_SECTION',
    ADD_SECTION_SUCCESS: 'ADD_SECTION_SUCCESS',
    ADD_SECTION_ERR: 'ADD_SECTION_ERR'
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

export const addOption = (option: Option) => ({
    type: interestActions.ADD_OPTION,
    option
})
export const addOptionSuccess = (option: Option) => ({
    type: interestActions.ADD_OPTION_SUCCESS,
    option 
})
export const addOptionErr = (err) => ({
    type: interestActions.ADD_OPTION_ERR,
    err
})

export const addSection = (section: Section) => ({
    type: interestActions.ADD_SECTION,
    section
})
export const addSectionSuccess = (section: Section) => ({
    type: interestActions.ADD_SECTION_SUCCESS,
    section 
})
export const addSectionErr = (err) => ({
    type: interestActions.ADD_SECTION_ERR,
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
