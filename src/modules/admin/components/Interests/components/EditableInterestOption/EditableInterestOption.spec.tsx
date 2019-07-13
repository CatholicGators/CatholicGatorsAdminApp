import React from 'react'
import { shallow } from 'enzyme';

import { EditableInterestOption, Props } from './EditableInterestOption'
import {
    Edit,
    Delete,
    Save,
    Close
} from '@material-ui/icons';
import { Input } from '@material-ui/core';

describe('EditableInterestOption', () => {
    let props: Props, wrapper, instance: EditableInterestOption

    beforeEach(() => {
        props = {
            classes: {},
            isEditing: false,
            option: {
                id: 1,
                text: "totally testing"
            },
            beginEditing: jest.fn(),
            cancelEditing: jest.fn(),
            deleteOption: jest.fn(),
            saveOption: jest.fn()
        }
        wrapper = shallow(<EditableInterestOption {...props} />)
        instance = wrapper.instance()
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('defaults the editedOptionText to the text of the option that is passed in', () => {
        expect(wrapper.state().editedOptionText).toBe(props.option.text)
    })

    describe('when not editing', () => {
        it('renders the edit and delete buttons', () => {
            expect(wrapper.exists(Edit)).toBe(true)
            expect(wrapper.exists(Delete)).toBe(true)
            expect(wrapper.exists(Save)).toBe(false)
            expect(wrapper.exists(Close)).toBe(false)
            expect(wrapper.exists(Input)).toBe(false)
        })

        it('beginEdit is called when edit clicked', () => {
            const edit = wrapper.find('#edit')
            edit.simulate('click')

            expect(props.beginEditing).toHaveBeenCalledWith(props.option.id)
        })

        it('cancelEdit is called when cancel clicked', () => {
            const deleteButton = wrapper.find('#delete')
            deleteButton.simulate('click')

            expect(props.deleteOption).toHaveBeenCalledWith(props.option.id)
        })
    })

    describe('when editing', () => {
        beforeEach(() => {
            wrapper.setProps({ isEditing: true })
        })

        it('renders the input, save, and cancel buttons', () => {
            expect(wrapper.exists(Edit)).toBe(false)
            expect(wrapper.exists(Delete)).toBe(false)
            expect(wrapper.exists(Save)).toBe(true)
            expect(wrapper.exists(Close)).toBe(true)
            expect(wrapper.exists(Input)).toBe(true)
        })

        it('saveOption is called when save clicked', () => {
            const newText = 'test'
            const input = wrapper.find(Input)
            input.simulate("change", { target: { value: newText } });
            const save = wrapper.find('#save')
            save.simulate('click')

            expect(props.saveOption).toHaveBeenCalledWith(props.option.id, newText)
        })

        it('cancelEdit is called when cancel clicked', () => {
            const cancel = wrapper.find('#cancel')
            cancel.simulate('click')

            expect(props.cancelEditing).toHaveBeenCalled()
        })
    })
})
