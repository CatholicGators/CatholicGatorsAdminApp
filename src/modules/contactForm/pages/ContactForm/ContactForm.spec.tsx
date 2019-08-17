import React from 'react'
import { shallow } from 'enzyme'

import { ContactForm } from './ContactForm'
import { steps } from '../../utils/ContactFormUtils'
import mockStyles from '../../../../utils/mockStyles'
import { styles } from '../../utils/ContactFormStyles'
import toJson from 'enzyme-to-json'

describe('ContactForm', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            listenForUser: jest.fn(),
            submitContactForm: jest.fn()
        }
        wrapper = shallow(<ContactForm {...props} />)
    })

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    describe('control functions', () => {
        it('should handle next correctly', () => {
            wrapper.setState({ activeStep: 1 })
            wrapper.instance().handleNext()

            expect(wrapper.state('activeStep')).toBe(2)
        })

        it('should submit form on last next', () => {
            wrapper.setState({ activeStep: steps.length - 1 })
            wrapper.instance().handleNext()

            expect(wrapper.state('activeStep')).toBe(steps.length - 1)
            expect(props.submitContactForm).toBeCalled()
        })

        it('should change step on back', () => {
            wrapper.setState({ activeStep: 1 })
            wrapper.instance().handleBack()

            expect(wrapper.state('activeStep')).toBe(0)
        })

        it('should do nothing on back when on step 0', () => {
            wrapper.setState({ activeStep: 0 })
            wrapper.instance().handleBack()

            expect(wrapper.state('activeStep')).toBe(0)
        })

        it('should reset step on invalid step', () => {
            wrapper.setState({ activeStep: 1234 })
            wrapper.instance().resetStep()

            expect(wrapper.state('activeStep')).toBe(0)
        })
    })
})
