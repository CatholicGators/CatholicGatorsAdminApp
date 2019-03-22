import React from 'react'
import { shallow } from 'enzyme'

import { Header, menuLinks } from './Header'

describe('Header', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            user: {
                isAdmin: true
            },
            location: {
                pathname: '/'
            },
            signOut: jest.fn(),
            googleSignIn: jest.fn()
        }
        wrapper = shallow(<Header {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should have the drawer not open by default', () => {
        expect(wrapper.state('drawerOpen')).toBe(false)
    })

    it('renders all links when user is an admin', () => {
        menuLinks.forEach(link => expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(true))
    })

    it('renders only unAuthorized links when user is not an admin', () => {
        wrapper.setProps({ user: { ...props.user, isAdmin: false }})

        menuLinks.forEach(link => expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(!link.needsAuthorization))
    })
})