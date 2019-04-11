import React from 'react'
import { shallow } from 'enzyme';

import ContactForm from './ContactForm';

describe('ContactForm', () => {
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