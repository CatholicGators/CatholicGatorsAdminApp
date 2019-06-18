import React from 'react'
import { shallow } from 'enzyme';

import Interests from './Interests'

describe('Interests', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
        }
        wrapper = shallow(<Interests {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
