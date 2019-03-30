import React from 'react'
import { shallow } from 'enzyme';

import { Admin } from './Admin'

describe('Admin', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            getUsers: jest.fn()
        }
        wrapper = shallow(<Admin {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    it('should call getUsers when mounted', () => {
        expect(props.getUsers).toHaveBeenCalled()
    })

    it('shows the circular progress when run loading the users', () => {
        expect(wrapper.find('#loading-spinner').exists()).toBe(true)
    })
})
