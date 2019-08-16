import React from 'react'
import { shallow } from 'enzyme';
import { UserTableToolbar, styles } from './UserTableToolbar';
import { IconButton } from '@material-ui/core';
import mockStyles from '../../../../../../utils/mockStyles';

describe('UserTableToolbar', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            numSelected: 0,
            handleBatchApprove: jest.fn(),
            handleBatchAuthorize: jest.fn(),
            handleBatchDelete: jest.fn()
        }
        wrapper = shallow(<UserTableToolbar {...props}/>)
    })

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('hides action buttons when nothing selected', () => {
        expect(wrapper.exists(IconButton)).toBe(false)
    })

    it('shows the title when nothing selected', () => {
        expect(wrapper.find('#title').exists()).toBe(true)
        expect(wrapper.find('#num-selected').exists()).toBe(false)
    })

    it('shows the action buttons when something is selected', () => {
        wrapper.setProps({ numSelected: 1 })

        expect(wrapper.exists(IconButton)).toBe(true)
    })

    it('shows the numSelected when > 0', () => {
        wrapper.setProps({ numSelected: 1 })

        expect(wrapper.find('#title').exists()).toBe(false)
        expect(wrapper.find('#num-selected').exists()).toBe(true)
    })

    it('calls handleBatchApprove() when the approve IconButton is clicked', () => {
        wrapper.setProps({ numSelected: 1 })
        wrapper.find('#approve-icon-btn').simulate('click')

        expect(props.handleBatchApprove).toHaveBeenCalled()
    })

    it('calls handleBatchAuthorize() when the authorize IconButton is clicked', () => {
        wrapper.setProps({ numSelected: 1 })
        wrapper.find('#authorize-icon-btn').simulate('click')

        expect(props.handleBatchAuthorize).toHaveBeenCalled()
    })

    it('calls handleBatchDelete() when the delete IconButton is clicked', () => {
        wrapper.setProps({ numSelected: 1 })
        wrapper.find('#delete-icon-btn').simulate('click')

        expect(props.handleBatchDelete).toHaveBeenCalledWith()
    })
})