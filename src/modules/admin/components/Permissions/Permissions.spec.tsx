import React from 'react'
import { shallow } from 'enzyme';

import Permissions from './Permissions'

describe('Permissions', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
        }
        wrapper = shallow(<Permissions {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
