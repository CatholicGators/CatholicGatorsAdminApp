import { interestActions } from '../actions/interestActions'

export const INITIAL_INTERESTS_STATE = {
    interests: undefined
}

const setInterests = (state, action) => ({
    ...state,
    interests: action.interests
})

const addOption = (state, action) => ({
    ...state,
    interests: [
        ...state.interests.map(section =>
            section.id !== action.sectionId
                ? section
                : {
                      ...section,
                      options: [...section.options, action.option]
                  }
        )
    ]
})

const addSection = (state, action) => ({
    ...state,
    interests: [...state.interests, action.section]
})

export default (state = INITIAL_INTERESTS_STATE, action) => {
    switch (action.type) {
        case interestActions.GET_INTERESTS_SUCCESS: {
            return setInterests(state, action)
        }
        case interestActions.ADD_OPTION_SUCCESS: {
            return addOption(state, action)
        }
        case interestActions.ADD_SECTION_SUCCESS: {
            return addSection(state, action)
        }
        default:
            return state
    }
}
