import React from 'react'
import { shallow } from 'enzyme';

import ContactForm from './ContactForm';

describe('ContactForm', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            listenForUser: jest.fn(),
            submitContactForm: jest.fn()
        };
        wrapper = shallow(<ContactForm {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    describe('handleBack()', () => {
        it('should handle changes correctly', () => {
            const instance = wrapper.instance()
            wrapper.setState({ activeStep: 1 })

            instance.handleBack()

            expect(wrapper.find('activeStep')).toBe(0)
        });
    });
});
