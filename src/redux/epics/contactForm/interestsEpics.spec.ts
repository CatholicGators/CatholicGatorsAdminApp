import { of } from "rxjs"
import { ActionsObservable } from "redux-observable"

import {
    getInterestsEpic, addOptionEpic, updateOptionTextEpic, addSectionEpic
} from './interestsEpics'
import {
    getInterests,
    getInterestsSuccess,
    getInterestsErr,
    NewOptionReq,
    addOption,
    addOptionSuccess,
    addOptionErr,
    updateOptionText,
    updateOptionTextSuccess,
    updateOptionTextErr,
    NewSectionReq,
    addSection,
    addSectionSuccess,
    addSectionErr
} from "../../actions/contactForm/interestActions";
import {
    Section, Option
} from "../../../services/interestsService";

describe('interestEpics', () => {
    let dependencies,
    interestsService,
    interests: Section[]

    beforeEach(() => {
        interestsService = {
            updateOptionText: jest.fn(),
            getInterests: jest.fn(),
            addOption: jest.fn(),
            addSection: jest.fn()
        }
        dependencies = {
            interestsService
        }
        interests = [{
            id: "1",
            position: 0,
            text: "section1",
            options: []
        }, {
            id: "2",
            position: 1,
            text: "section2",
            options: []
        }]
    })

    describe('getInterestsEpic', () => {
        let action$, state$

        beforeAll(() => {
            action$ = ActionsObservable.from([getInterests()])
            state$ = of()
        })

        it('emits GET_INTERESTS_SUCCESS action after successful get', done => {
            interestsService.getInterests.mockResolvedValue(interests)
            const expectedAction = getInterestsSuccess(interests)

            getInterestsEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })

        it('emits GET_INTERESTS_ERR when getInterests returns an error', done => {
            const err = "test"
            interestsService.getInterests.mockRejectedValue(err)
            const expectedAction = getInterestsErr(err)

            getInterestsEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })
    })

    describe('addOptionEpic', () => {
        let action$, state$, optionReq: NewOptionReq, sectionId: string

        beforeAll(() => {
            sectionId = interests[0].id
            optionReq = {
                text: "option1"
            }
            action$ = ActionsObservable.from([addOption(sectionId, optionReq)])
            state$ = of()
        })

        it('emits ADD_OPTION_SUCCESS action after successful add', done => {
            const expectedOption: Option = {
                id: "1",
                ...optionReq
            }
            interestsService.addOption.mockResolvedValue(expectedOption)
            const expectedAction = addOptionSuccess(sectionId, expectedOption)

            addOptionEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })

        it('emits ADD_OPTION_ERR when addOption returns an error', done => {
            const err = "test"
            interestsService.addOption.mockRejectedValue(err)
            const expectedAction = addOptionErr(err)

            addOptionEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })
    })

    describe('updateOptionTextEpic', () => {
        let action$, state$, optionId: string, newText: string

        beforeAll(() => {
            optionId = "1"
            newText = "newText"
            action$ = ActionsObservable.from([updateOptionText(optionId, newText)])
            state$ = of()
        })

        it('emits UPDATE_OPTION_TEXT_SUCCESS action after successful update', done => {
            const expectedOption: Option = {
                id: "1",
                text: newText
            }
            interestsService.updateOptionText.mockResolvedValue(expectedOption)
            const expectedAction = updateOptionTextSuccess(expectedOption)

            updateOptionTextEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })

        it('emits UPDATE_OPTION_TEXT_ERR when updateOptionText returns an error', done => {
            const err = "test"
            interestsService.updateOptionText.mockRejectedValue(err)
            const expectedAction = updateOptionTextErr(err)

            updateOptionTextEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })
    })

    describe('addSectionEpic', () => {
        let action$, state$, sectionReq: NewSectionReq

        beforeAll(() => {
            sectionReq = {
                position: 0,
                text: "test",
                options: []
            }
            action$ = ActionsObservable.from([addSection(sectionReq)])
            state$ = of()
        })

        it('emits ADD_SECTION_SUCCESS action after successful add', done => {
            const expectedSection: Section = {
                id: "1",
                ...sectionReq
            }
            interestsService.addSection.mockResolvedValue(expectedSection)
            const expectedAction = addSectionSuccess(expectedSection)

            addSectionEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })

        it('emits ADD_SECTION_ERR when updateOptionText returns an error', done => {
            const err = "test"
            interestsService.addSection.mockRejectedValue(err)
            const expectedAction = addSectionErr(err)

            addSectionEpic(action$, state$, dependencies)
                .subscribe(result => {
                    expect(result).toEqual(expectedAction)
                    done()
                })
        })
    })
})
