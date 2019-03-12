import React from 'react'
import { shallow } from 'enzyme';

import { Header } from './Header';

describe('Header', () => {
    let props, wrapper, pathname;

    beforeEach(() => {
        pathname = '/';
        props = {
            user: {},
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
    
    it('should show the avatar and hide the login button when user is not null', () => {
        expect(wrapper.exists('#login-btn')).toBe(false);
        expect(wrapper.exists('#avatar-btn')).toBe(true);
    });

    describe('login btn', () => {
        beforeEach(() => {
            wrapper.setProps({ user: null });
        });

        it('should show the login button and hide the avatar when user is null', () => {
            expect(wrapper.exists('#login-btn')).toBe(true);
            expect(wrapper.exists('#avatar-btn')).toBe(false);
        });

        it('calls googleSignIn()', () => {
            wrapper.find('#login-btn').simulate('click');

            expect(props.googleSignIn).toHaveBeenCalled();
        });
    });

    describe('menu', () => {
        const testTarget = 'test';

        beforeEach(() => {
            wrapper.find('#avatar-btn').simulate('click', { currentTarget: testTarget });
        });

        it('clicking avatar sets anchorEl', () => {
            expect(wrapper.state('anchorEl')).toBe(testTarget);
        });

        describe('logout', () => {
            it('closes the menu', () => {
                wrapper.find('#logout').simulate('click');

                expect(wrapper.state('anchorEl')).toBe(null);
            });

            it('calls signOut()', () => {
                wrapper.find('#logout').simulate('click');

                expect(props.signOut).toHaveBeenCalled();
            });
        });
    });
});