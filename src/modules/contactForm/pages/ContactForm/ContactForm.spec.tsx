import React from 'react'
import { shallow } from 'enzyme';

import { ContactForm } from './ContactForm';
import { steps } from '../../utils/ContactFormUtils'

describe('ContactForm', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            listenForUser: jest.fn(),
            submitContactForm: jest.fn(),
            classes: jest.enableAutomock()
        };
        wrapper = shallow(<ContactForm {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    describe('control functions', () => {

        it('should handle next correctly', () => {
            wrapper.setState({ activeStep: 1 })
            wrapper.instance().handleNext()

            expect(wrapper.state('activeStep')).toBe(2)
        });

        it('should submit form on last next', () => {
            wrapper.setState({ activeStep: (steps.length - 1) })
            wrapper.instance().handleNext()

            expect(wrapper.state('activeStep')).toBe(steps.length - 1)
            expect(props.submitContactForm).toBeCalled()
        });

        it('should change step on back', () => {
            wrapper.setState({ activeStep: 1 })
            wrapper.instance().handleBack()

            expect(wrapper.state('activeStep')).toBe(0)
        });
    });
});
