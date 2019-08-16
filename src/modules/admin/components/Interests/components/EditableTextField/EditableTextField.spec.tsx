import React from 'react'
import { shallow } from 'enzyme';

import { EditableTextField, Props, styles } from './EditableTextField'
import {
    Edit,
    Delete,
    Save,
    Close
} from '@material-ui/icons';
import { Input } from '@material-ui/core';
import mockStyles from '../../../../../../utils/mockStyles';

describe('EditableTextField', () => {
    let props: Props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            isEditing: false,
            isHovered: false,
            id: "1",
            text: "totally testing",
            beginEditing: jest.fn(),
            cancelEditing: jest.fn(),
            deleteText: jest.fn(),
            save: jest.fn()
        }
        wrapper = shallow(<EditableTextField {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('defaults the editedText to the text of the option that is passed in', () => {
        expect(wrapper.state().editedText).toBe(props.text)
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

            expect(props.beginEditing).toHaveBeenCalledWith(props.id)
        })

        it('cancelEdit is called when cancel clicked', () => {
            const deleteButton = wrapper.find('#delete')
            deleteButton.simulate('click')

            expect(props.deleteText).toHaveBeenCalledWith(props.id)
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

        it('save is called when save clicked', () => {
            const newText = 'test'
            const input = wrapper.find(Input)
            input.simulate("change", { target: { value: newText } });
            const save = wrapper.find('#save')
            save.simulate('click')

            expect(props.save).toHaveBeenCalledWith(props.id, newText)
        })

        it('cancelEdit is called when cancel clicked', () => {
            const cancel = wrapper.find('#cancel')
            cancel.simulate('click')

            expect(props.cancelEditing).toHaveBeenCalled()
        })
    })
})
