import React from 'react'
import { shallow } from 'enzyme';

import { Admin } from './Admin'

describe('Admin', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            match: { 
                url: 'test'
            },
            location: {
                pathname: 'test/testing'
            }
        }
        wrapper = shallow(<Admin {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
