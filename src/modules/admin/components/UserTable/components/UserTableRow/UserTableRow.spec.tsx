import React from 'react'
import { shallow } from 'enzyme';
import { UserTableRow } from './UserTableRow';
import { Checkbox, IconButton } from '@material-ui/core';

describe('UserTableRow', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            user: {
                id: 'test',
                photoUrl: ''
            },
            isSelected: true,
            handleSelect: jest.fn(),
            updateUser: jest.fn()
        }
        wrapper = shallow(<UserTableRow {...props}/>)
    })

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('calls handleSelect with user.id when the checkbox is clicked', () => {
        wrapper.find(Checkbox).simulate('click')

        expect(props.handleSelect).toHaveBeenCalledWith(props.user.id)
    })

    it('calls handleSelect with user.id when the Avatar is clicked', () => {
        wrapper.find(IconButton).simulate('click')

        expect(props.handleSelect).toHaveBeenCalledWith(props.user.id)
    })

    it('updates the user when the approve switched is toggled', () => {
        const checked = true
        wrapper.find('#approve-switch').simulate('change', {target: {checked}}, checked)

        expect(props.updateUser).toHaveBeenCalledWith({
            ...props.user,
            isApproved: checked
        })
    })

    it('updates the user when the authorize switch is toggled', () => {
        const checked = true
        wrapper.find('#authorize-switch').simulate('change', {target: {checked}}, checked)

        expect(props.updateUser).toHaveBeenCalledWith({
            ...props.user,
            isAdmin: checked
        })
    })
})