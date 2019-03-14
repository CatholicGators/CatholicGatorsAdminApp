import React from 'react'
import { shallow } from 'enzyme';

import { Header } from './Header';

describe('Header', () => {
    let props, wrapper, user, pathname;

    beforeEach(() => {
        pathname = '/';
        user = {};
        props = {
            user,
            location: {
                pathname
            },
            signOut: jest.fn(),
            googleSignIn: jest.fn()
        };
        wrapper = shallow(<Header {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have the drawer not open by default', () => {
        expect(wrapper.state('drawerOpen')).toBe(false);
    });

    describe('user is loading', () => {
        beforeEach(() => {
            wrapper.setProps({ user: undefined });
        });

        it('should only show a spinner', () => {
            expect(wrapper.exists('#desktop-spinner')).toBe(true)
            expect(wrapper.exists('#desktop-login-btn')).toBe(false)
            expect(wrapper.exists('#avatar-btn')).toBe(false)
        })
    })

    describe('user is not logged in', () => {
        beforeEach(() => {
            wrapper.setProps({ user: null });
        });

        it('should only show the login button', () => {
            expect(wrapper.exists('#desktop-spinner')).toBe(false)
            expect(wrapper.exists('#desktop-login-btn')).toBe(true)
            expect(wrapper.exists('#avatar-btn')).toBe(false)
        });

        it('calls googleSignIn()', () => {
            wrapper.find('#desktop-login-btn').simulate('click');

            expect(props.googleSignIn).toHaveBeenCalled();
        });
    });

    describe('user is logged in', () => {
        const testTarget = 'test';

        beforeEach(() => {
            wrapper.find('#avatar-btn').simulate('click', { currentTarget: testTarget });
        });

        it('should only show the avatar', () => {
            expect(wrapper.exists('#desktop-spinner')).toBe(false)
            expect(wrapper.exists('#desktop-login-btn')).toBe(false)
            expect(wrapper.exists('#avatar-btn')).toBe(true)
        })

        it('clicking avatar sets anchorEl', () => {
            expect(wrapper.state('anchorEl')).toBe(testTarget);
        });

        describe('logout', () => {
            it('closes the menu', () => {
                wrapper.find('#desktop-logout').simulate('click');

                expect(wrapper.state('anchorEl')).toBe(null);
            });

            it('calls signOut()', () => {
                wrapper.find('#desktop-logout').simulate('click');

                expect(props.signOut).toHaveBeenCalled();
            });
        });
    });
});