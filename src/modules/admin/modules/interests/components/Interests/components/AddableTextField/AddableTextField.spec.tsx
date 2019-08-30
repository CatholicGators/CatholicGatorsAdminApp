import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { AddableTextField, Props, styles } from './AddableTextField'
import { Add, Save, Close } from '@material-ui/icons'
import { Input } from '@material-ui/core'
import mockStyles from '../../../../../../../../utils/mockStyles'

describe('AddableTextField', () => {
    let props: Props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            isAdding: false,
            beginAdding: jest.fn(),
            onAdd: jest.fn(),
            cancelAdding: jest.fn()
        }
        wrapper = shallow(<AddableTextField {...props} />)
    })

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('should only display the add button when not adding', () => {
        expect(props.isAdding).toBe(false)
        expect(wrapper.exists(Add)).toBe(true)
        expect(wrapper.exists(Save)).toBe(false)
        expect(wrapper.exists(Close)).toBe(false)
        expect(wrapper.exists(Input)).toBe(false)
    })

    describe('when adding', () => {
        beforeEach(() => {
            wrapper.setProps({ isAdding: true })
        })

        it('should only display the input, save, and close components', () => {
            expect(wrapper.exists(Add)).toBe(false)
            expect(wrapper.exists(Save)).toBe(true)
            expect(wrapper.exists(Close)).toBe(true)
            expect(wrapper.exists(Input)).toBe(true)
        })

        it('should set the state with the text from the input component on change', () => {
            expect(wrapper.state().text).toBe('')
            const newText = 'newText'

            wrapper
                .find(Input)
                .simulate('change', { target: { value: newText } })

            expect(wrapper.state().text).toBe(newText)
        })

        describe('save button', () => {
            it('should be disabled when text empty', () => {
                expect(wrapper.state().text).toBe('')
                expect(wrapper.find('#save-btn').props().disabled).toBe(true)

                wrapper.setState({ text: 'not empty' })

                expect(wrapper.find('#save-btn').props().disabled).toBe(false)
            })

            it('when clicked does not call onAdd when the text is empty', () => {
                expect(wrapper.state().text).toBe('')

                wrapper.find('#save-btn').simulate('click')

                expect(props.onAdd).not.toHaveBeenCalled()
            })

            it('when clicked onAdd is called and the state reset when the text isnt empty', () => {
                const newText = 'newText'
                wrapper
                    .find(Input)
                    .simulate('change', { target: { value: newText } })

                wrapper.find('#save-btn').simulate('click')

                expect(props.onAdd).toHaveBeenCalledWith(newText)
                expect(wrapper.state().text).toBe('')
            })
        })

        describe('close button', () => {
            it('calls cancelAdding when clicked', () => {
                wrapper.find('#close-btn').simulate('click')

                expect(props.cancelAdding).toHaveBeenCalled()
            })
        })
    })
})
