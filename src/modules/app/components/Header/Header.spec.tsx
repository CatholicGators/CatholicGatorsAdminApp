import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from "react-router-dom";

import { Header, menuLinks, styles } from './Header'
import mockStyles from '../../../../utils/mockStyles';

describe('Header', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            user: {
                isAdmin: true,
                isApproved: true
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

    it('shows no links if the user is undefined', () => {
        wrapper.setProps({ user: undefined })

        expect(wrapper.exists(NavLink)).toBe(false)
    })

    it('renders all links when user is an admin', () => {
        menuLinks.forEach(link => expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(true))
    })

    it('renders only unAuthorized links when user is not an admin', () => {
        wrapper.setProps({ user: { ...props.user, isAdmin: false }})

        menuLinks.forEach(link => expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(!link.needsAuthorization))
    })

    describe('toggleDrawer(isOpen)', () => {
        it('toggles the drawerOpen value', () => {
            const instance = wrapper.instance()

            instance.toggleDrawer(true)

            expect(wrapper.state().drawerOpen).toBe(true)
        })
    })
})