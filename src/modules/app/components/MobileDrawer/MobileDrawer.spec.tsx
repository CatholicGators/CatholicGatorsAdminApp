import React from 'react'
import { shallow } from 'enzyme';

import { MobileDrawer } from './MobileDrawer';
import VpnKey from '@material-ui/icons/VpnKey';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';

describe('MobileDrawer', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            user: {},
            menuLinks: [
                {
                    text: 'Contact Form',
                    href: '/',
                    icon: FormatAlignLeft
                },
                {
                    text: 'Admin',
                    href: '/admin',
                    icon: VpnKey
                }
            ],
            isOpen: false,
            selectedPath: '/',
            closeDrawer: jest.fn(),
            logout: jest.fn(),
            login: jest.fn()
        }
        wrapper = shallow(<MobileDrawer {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
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