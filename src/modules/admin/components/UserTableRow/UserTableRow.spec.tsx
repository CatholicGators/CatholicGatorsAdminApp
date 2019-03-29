import React from 'react'
import { shallow } from 'enzyme';
import { UserTableRow } from './UserTableRow';

describe('UserTableRow', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            user: {
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
})