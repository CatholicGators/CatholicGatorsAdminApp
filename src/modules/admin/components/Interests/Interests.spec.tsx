import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Interests, Props, defaultState, styles } from './Interests'
import { CircularProgress } from '@material-ui/core'
import EditableOptionRow from './components/EditableOptionRow/EditableOptionRow'
import { Checkbox } from '@material-ui/core'
import AddableTextField from './components/AddableTextField/AddableTextField'
import mockStyles from '../../../../utils/mockStyles'

describe('Interests', () => {
    let props: Props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            interests: [
                {
                    id: 'test',
                    position: 0,
                    text: 'testing',
                    options: [
                        {
                            id: '1',
                            text: 'totally testing'
                        }
                    ]
                }
            ],
            getInterests: jest.fn(),
            updateOptionText: jest.fn(),
            addOption: jest.fn(),
            addSection: jest.fn()
        }
        wrapper = shallow(<Interests {...props} />)
    })

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('calls getInterests() on componentDidMount', () => {
        expect(props.getInterests).toHaveBeenCalled()
    })

    it('renders a spinner when interests is falsy', () => {
        wrapper.setProps({ interests: undefined })
        expect(wrapper.exists(CircularProgress)).toBe(true)
    })

    it('is not adding or editing an item by default', () => {
        expect(wrapper.state().editingOptionId).toBe(null)
        expect(wrapper.state().addingSectionId).toBe(null)
        expect(wrapper.state().isAddingSection).toBe(false)
    })

    describe('option crud', () => {
        let optionId,
            row,
            newText = 'newText'
        beforeEach(() => {
            optionId = props.interests[0].options[0].id
            row = wrapper
                .find('#section')
                .first()
                .find(EditableOptionRow)
                .first()

            row.props().beginEditingOption(optionId)
        })

        describe('beginEditingOption', () => {
            it('sets the editingOptionId to the id of the option being edited', () => {
                expect(wrapper.state()).toEqual({
                    ...defaultState,
                    editingOptionId: optionId
                })
            })
        })

        describe('cancelEditingOption', () => {
            it('resets the editing state to default', () => {
                row.props().cancelEditingOption()
                expect(wrapper.state()).toEqual(defaultState)
            })
        })

        describe('deleteOption', () => {
            it('resets the editing state to default', () => {
                row.props().deleteOption(optionId)
                expect(wrapper.state()).toEqual(defaultState)
            })
        })

        describe('saveOption', () => {
            it('resets the editing state to default', () => {
                row.props().saveOption(optionId, newText)
                expect(wrapper.state()).toEqual(defaultState)
            })

            it('calls updateInterests with the field updated', () => {
                row.props().saveOption(optionId, newText)
                expect(props.updateOptionText).toHaveBeenCalledWith(
                    optionId,
                    newText
                )
            })
        })
    })

    describe('section crud', () => {
        let addOptioncomponent

        beforeEach(() => {
            addOptioncomponent = wrapper
                .find('#section')
                .first()
                .find('#add-option')
                .first()
        })

        it('doesnt show the check box when addingSectionId === section.id', () => {
            expect(wrapper.exists(Checkbox)).toBe(false)
        })

        describe('add section button', () => {
            it('sets the state to adding a section on click and shows the add section input input', () => {
                wrapper.find('#add-section-btn').simulate('click')

                expect(wrapper.state()).toEqual({
                    ...defaultState,
                    isAddingSection: true
                })
                expect(wrapper.exists('#add-section-input')).toBe(true)
            })
        })

        describe('adding an option to a section', () => {
            let textField, sectionId

            beforeEach(() => {
                sectionId = props.interests[0].id
                textField = addOptioncomponent.find(AddableTextField)
                textField.props().beginAdding()
            })

            it('sets addingSectionId to the id of the section being added to', () => {
                expect(wrapper.state()).toEqual({
                    ...defaultState,
                    addingSectionId: sectionId
                })
            })

            it('shows a checkbox', () => {
                expect(wrapper.exists(Checkbox)).toBe(true)
            })

            it('resets the state when adding cancelled', () => {
                textField.props().cancelAdding()

                expect(wrapper.state()).toEqual(defaultState)
            })

            it('calls addOption when option saved and resets state', () => {
                const newText = 'newText'

                textField.props().onAdd(newText)

                expect(props.addOption).toHaveBeenCalledWith(sectionId, {
                    text: newText
                })
                expect(wrapper.state()).toEqual(defaultState)
            })
        })
    })
})
