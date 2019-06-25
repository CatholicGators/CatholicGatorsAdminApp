import React from 'react'
import { shallow } from 'enzyme';

import { Interests } from './Interests'

describe('Interests', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            interests: [{
                id: "test",
                text: "testing",
                options: [
                    {
                        id: "testOption",
                        text: "totally testing"
                    }
                ]
            }],
            getInterests: jest.fn(),
            updateInterests: jest.fn()
        }
        wrapper = shallow(<Interests {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
