import React from 'react'
import { shallow } from 'enzyme';

import ContactForm from './ContactForm';

describe('App', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            listenForUser: jest.fn()
        };
        wrapper = shallow(<ContactForm {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});