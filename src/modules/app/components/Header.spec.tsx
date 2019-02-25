import React from 'react'
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header.tsx', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            user: null,
            signOut: jest.fn(),
            googleSignIn: jest.fn()
        };
        wrapper = shallow(<Header {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should show the login button when user is null', () => {
        expect(wrapper.exists('#login-btn'));
    });
});