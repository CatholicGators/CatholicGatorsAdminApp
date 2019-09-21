import interestsReducer, { INITIAL_INTERESTS_STATE } from './interestsReducer'
import { Section, Option } from '../../services/interestsService'
import {
    getInterestsSuccess,
    addOptionSuccess,
    addSectionSuccess
} from '../actions/interestActions'

describe('interestsReducer', () => {
    let interests: Section[]

    beforeAll(() => {
        interests = [
            {
                id: '1',
                position: 0,
                text: 'section1',
                options: []
            },
            {
                id: '2',
                position: 1,
                text: 'section2',
                options: []
            }
        ]
    })

    it('returns the state unmutated by default', () => {
        const action = { type: 'foo' }
        const state = {
            ...INITIAL_INTERESTS_STATE,
            user: 'bar'
        }

        expect(interestsReducer(state, action)).toEqual(state)
    })

    it('updates the interests field on GET_INTERESTS_SUCCESS', () => {
        const action = getInterestsSuccess(interests)

        expect(interestsReducer(INITIAL_INTERESTS_STATE, action)).toEqual({
            ...INITIAL_INTERESTS_STATE,
            interests
        })
    })

    it('updates the interests field with the new option on ADD_OPTION_SUCCESS', () => {
        const newOption: Option = {
            id: '1',
            text: 'test'
        }
        const action = addOptionSuccess(interests[0].id, newOption)
        const state = {
            ...INITIAL_INTERESTS_STATE,
            interests
        }

        expect(interestsReducer(state, action).interests[0].options[0]).toEqual(
            newOption
        )
    })

    it('updates the interests field with the new section on ADD_SECTION_SUCCESS', () => {
        const newSection: Section = {
            id: '3',
            position: interests.length,
            text: 'section3',
            options: []
        }
        const action = addSectionSuccess(newSection)
        const state = {
            ...INITIAL_INTERESTS_STATE,
            interests
        }

        expect(
            interestsReducer(state, action).interests[newSection.position]
        ).toBe(newSection)
    })
})
