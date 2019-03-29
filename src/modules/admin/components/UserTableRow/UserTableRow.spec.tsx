import React from 'react'
import { shallow } from 'enzyme';
import { UserTableRow } from './UserTableRow';
import { Checkbox, Switch } from '@material-ui/core';

describe('UserTableRow', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            user: {
                id: 'test',
                data: {
                    photoUrl: ''
                }
            },
            isSelected: true,
            handleSelect: jest.fn(),
            handleApproveToggle: jest.fn(),
            handleAuthorizeToggle: jest.fn()
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

    it('calls handleApproveToggle with the user and the checked value when the approve switched is toggled', () => {
        const checked = true
        wrapper.find(Switch).first().simulate('change', {target: {checked}}, checked)

        expect(props.handleApproveToggle).toHaveBeenCalledWith(props.user, checked)
    })

    it('calls handleAuthorizeToggle with the user and the checked value when the authorize switch is toggled', () => {
        const checked = true
        wrapper.find(Switch).at(1).simulate('change', {target: {checked}}, checked)

        expect(props.handleAuthorizeToggle).toHaveBeenCalledWith(props.user, checked)
    })
})