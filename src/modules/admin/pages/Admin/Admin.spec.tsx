import React from 'react'
import { shallow } from 'enzyme';

import { Admin, menuLinks } from './Admin'

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

    it('should render all of the sub nav links', () => {
        menuLinks.forEach(link => expect(wrapper.exists(`NavLink[to='${props.match.url}${link.href}']`)).toBe(true))
    })
})
