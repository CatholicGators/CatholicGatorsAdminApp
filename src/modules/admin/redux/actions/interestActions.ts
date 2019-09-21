import { Option, Section } from '../../services/interestsService'

export const interestActions = {
    GET_INTERESTS: 'GET_INTERESTS',
    GET_INTERESTS_SUCCESS: 'GET_INTERESTS_SUCCESS',
    GET_INTERESTS_ERR: 'GET_INTERESTS_ERR',
    ADD_OPTION: 'ADD_OPTION',
    ADD_OPTION_SUCCESS: 'ADD_OPTION_SUCCESS',
    ADD_OPTION_ERR: 'ADD_OPTION_ERR',
    UPDATE_OPTION_TEXT: 'UPDATE_OPTION_TEXT',
    UPDATE_OPTION_TEXT_SUCCESS: 'UPDATE_OPTION_TEXT_SUCCESS',
    UPDATE_OPTION_TEXT_ERR: 'UPDATE_OPTION_TEXT_ERR',
    ADD_SECTION: 'ADD_SECTION',
    ADD_SECTION_SUCCESS: 'ADD_SECTION_SUCCESS',
    ADD_SECTION_ERR: 'ADD_SECTION_ERR'
}

export function getInterests() {
    return { type: interestActions.GET_INTERESTS }
}

export function getInterestsSuccess(interests: Section[]) {
    return { type: interestActions.GET_INTERESTS_SUCCESS, interests }
}

export function getInterestsErr(err : any) {
    return { type: interestActions.GET_INTERESTS_ERR, err }
}

export type NewOptionReq = {
    text: string
}
export const addOption = (sectionId: string, option: NewOptionReq) => ({
    type: interestActions.ADD_OPTION,
    sectionId,
    option
})
export const addOptionSuccess = (sectionId: string, option: Option) => ({
    type: interestActions.ADD_OPTION_SUCCESS,
    sectionId,
    option
})
export const addOptionErr = (err) => ({
    type: interestActions.ADD_OPTION_ERR,
    err
})

export type NewSectionReq = {
    text: string
    position: number
    options: Option[]
}
export const addSection = (section: NewSectionReq) => ({
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

export const updateOptionText = (optionId: string, newText: string) => ({
    type: interestActions.UPDATE_OPTION_TEXT,
    optionId,
    newText
})
export const updateOptionTextSuccess = (option: Option) => ({
    type: interestActions.UPDATE_OPTION_TEXT_SUCCESS,
    option
})
export const updateOptionTextErr = (err) => ({
    type: interestActions.UPDATE_OPTION_TEXT_ERR,
    err
})
