import React from 'react'
import { shallow } from 'enzyme';

import { Interests, Props } from './Interests'
import { CircularProgress } from '@material-ui/core';

describe('Interests', () => {
    let props: Props, wrapper, instance: Interests

    beforeEach(() => {
        props = {
            classes: {},
            interests: [{
                id: "test",
                text: "testing",
                options: [
                    {
                        id: 1,
                        sectionId: "test",
                        text: "totally testing"
                    }
                ]
            }],
            getInterests: jest.fn(),
            updateInterests: jest.fn(),
            addOption: jest.fn(),
            addSection: jest.fn()
        }
        wrapper = shallow(<Interests {...props} />)
        instance = wrapper.instance()
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('calls getInterests() on componentDidMount', () => {
        expect(props.getInterests).toHaveBeenCalled()
    })

    it('renders a spinner when interests is falsy', () => {
        wrapper.setProps({ interests: undefined })
        expect(wrapper.exists(CircularProgress)).toBe(true)
    })

    it('is not editing an item by default', () => {
        expect(wrapper.state().editingOptionId).toBe(null)
    })

    describe('beginEditingOption', () => {
        it('sets editingOptionId to the optionId passed in', () => {
            const id = props.interests[0].options[0].id
            instance.beginEditingOption(id)
            expect(wrapper.state().editingOptionId).toBe(id)
        })
    })

    describe('cancelEditingOption', () => {
        it('resets the editing state to default', () => {
            const optionId = props.interests[0].options[0].id

            instance.beginEditingOption(optionId)
            expect(wrapper.state().editingOptionId).toBe(optionId)

            instance.cancelEditingOption()
            expect(wrapper.state().editingOptionId).toBe(null)
        })
    })

    describe('deleteOption', () => {
        it('resets the editing state to default', () => {
            const sectionId = props.interests[0].id
            const optionId = props.interests[0].options[0].id

            instance.beginEditingOption(optionId)
            expect(wrapper.state().editingOptionId).toBe(optionId)

            instance.deleteOption(sectionId, optionId)
            expect(wrapper.state().editingOptionId).toBe(null)
        })
    })

    describe('saveOption', () => {
        it('resets the editing state to default', () => {
            const sectionId = props.interests[0].id
            const optionId = props.interests[0].options[0].id
            const newText = "newText"

            instance.beginEditingOption(optionId)
            expect(wrapper.state().editingOptionId).toBe(optionId)

            instance.saveOption(sectionId, optionId, newText)
            expect(wrapper.state().editingOptionId).toBe(null)
        })

        it('calls updateInterests with the field updated', () => {
            const sectionId = props.interests[0].id
            const optionId = props.interests[0].options[0].id
            const newText = "newText"
            const newInterests = [
                ...props.interests.map(section => section.id !== sectionId ? section : {
                    ...section,
                    options: [
                        ...section.options.map(option => option.id !== optionId ? option : {
                            ...option,
                            sectionId,
                            text: newText
                        })
                    ]
                })
            ]

            instance.beginEditingOption(optionId)
            expect(wrapper.state().editingOptionId).toBe(optionId)

            instance.saveOption(sectionId, optionId, newText)
            expect(props.updateInterests).toHaveBeenCalledWith(newInterests)
        })
    })
})
