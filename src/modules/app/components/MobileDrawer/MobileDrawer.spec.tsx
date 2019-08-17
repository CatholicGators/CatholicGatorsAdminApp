import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from 'react-router-dom'
import toJson from 'enzyme-to-json'

import { menuLinks } from '../Header/Header'
import { MobileDrawer, styles } from './MobileDrawer'
import mockStyles from '../../../../utils/mockStyles'

describe('MobileDrawer', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            user: {
                isAdmin: true
            },
            menuLinks,
            isOpen: false,
            selectedPath: '/',
            closeDrawer: jest.fn(),
            logout: jest.fn(),
            login: jest.fn()
        }
        wrapper = shallow(<MobileDrawer {...props} />)
    })

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('closes the drawer when a NavLink is clicked on', () => {
        const listItem = wrapper.find(NavLink).first()

        listItem.simulate('click')

        expect(props.closeDrawer).toHaveBeenCalled()
    })

    describe('user is loading', () => {
        beforeEach(() => {
            wrapper.setProps({ user: undefined })
        })

        it('should only show a spinner', () => {
            expect(wrapper.exists('#spinner')).toBe(true)
            expect(wrapper.exists('#login-btn')).toBe(false)
            expect(wrapper.exists('#logout-btn')).toBe(false)
            expect(wrapper.exists('#avatar')).toBe(false)
        })

        it('renders no links', () => {
            menuLinks.forEach(link =>
                expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(false)
            )
        })
    })

    describe('user is not logged in', () => {
        beforeEach(() => {
            wrapper.setProps({ user: null })
        })

        it('should only show the login btn', () => {
            expect(wrapper.exists('#spinner')).toBe(false)
            expect(wrapper.exists('#login-btn')).toBe(true)
            expect(wrapper.exists('#logout-btn')).toBe(false)
            expect(wrapper.exists('#avatar')).toBe(false)
        })

        it('renders no links', () => {
            menuLinks.forEach(link =>
                expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(false)
            )
        })

        describe('login', () => {
            it('closes the drawer', () => {
                wrapper.find('#login-btn').simulate('click')

                expect(props.closeDrawer).toHaveBeenCalled()
            })

            it('calls googleSignIn()', () => {
                wrapper.find('#login-btn').simulate('click')

                expect(props.login).toHaveBeenCalled()
            })
        })
    })

    describe('user is logged in', () => {
        it('should show the logout btn and avatar', () => {
            expect(wrapper.exists('#spinner')).toBe(false)
            expect(wrapper.exists('#login-btn')).toBe(false)
            expect(wrapper.exists('#logout-btn')).toBe(true)
            expect(wrapper.exists('#avatar')).toBe(true)
        })

        it('renders all links when user is an admin', () => {
            menuLinks.forEach(link =>
                expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(true)
            )
        })

        it('renders only unAuthorized links when user is not an admin', () => {
            wrapper.setProps({ user: { ...props.user, isAdmin: false } })

            menuLinks.forEach(link =>
                expect(wrapper.exists(`NavLink[to='${link.href}']`)).toBe(
                    !link.needsAuthorization
                )
            )
        })

        describe('logout', () => {
            it('closes the drawer', () => {
                wrapper.find('#logout-btn').simulate('click')

                expect(props.closeDrawer).toHaveBeenCalled()
            })

            it('calls logout()', () => {
                wrapper.find('#logout-btn').simulate('click')

                expect(props.logout).toHaveBeenCalled()
            })
        })
    })
})
