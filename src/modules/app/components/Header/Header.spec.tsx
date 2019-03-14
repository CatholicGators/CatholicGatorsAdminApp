import React from 'react'
import { shallow } from 'enzyme';

import { Header } from './Header';

describe('Header', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            user: {},
            location: {
                pathname: '/'
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
});