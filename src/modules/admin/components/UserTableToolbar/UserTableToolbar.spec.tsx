import React from 'react'
import { shallow } from 'enzyme';
import { UserTableToolbar } from './UserTableToolbar';

describe('UserTableToolbar', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
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
})