import React from 'react'
import { shallow } from 'enzyme'

import {
    CircularProgress,
    Card,
    CardActions,
    Button
} from '@material-ui/core';
import { MyContacts } from './MyContacts'

describe('MyContacts', () => {
    let props, wrapper, instance

    beforeEach(() => {
        props = {
            user: {
                isApproved: true,
            },
            history: {
                push: jest.fn()
            },
            getContacts: jest.fn(),
            updateContactStatus: jest.fn()
        }
        wrapper = shallow(<MyContacts {...props} />)
        instance = wrapper.instance()
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    describe('user is not approved', () => {
        beforeEach(() => {
            wrapper.setProps({ user: undefined })
        })

        it('should show the redirect card', () => {
            expect(wrapper.exists('#redirect-card')).toBe(true)
        })

        it('should send the user home when the button is pressed', () => {
            const card = wrapper.find(Card)
            const cardActions = card.find(CardActions)
            const button = cardActions.find(Button)

            button.simulate('click')

            expect(props.history.push).toHaveBeenCalledWith('/')
        })
    })

    it('should call getContacts() on startup', () => {
        expect(props.getContacts).toHaveBeenCalled()
    })

    it('shows a spinner when loading the contacts', () => {
        expect(wrapper.exists(CircularProgress)).toBe(true)
    })

    describe('getClassFromStatus(status, classes)', () => {
        let classes = {
                called: "called",
                needToCall: "needToCall",
                notCalled: "notCalled"
            }

        it('returns null if classes is null', () => {
            const result = instance.getClassFromStatus("test", null)
            
            expect(result).toBe(null)
        })

        it('returns null if classes is undefined', () => {
            const result = instance.getClassFromStatus("test", undefined)
            
            expect(result).toBe(null)
        })

        it('returns classes.notCalled by default', () => {
            const result = instance.getClassFromStatus("test", classes)

            expect(result).toBe(classes.notCalled)
        })

        it('returns classes.called when the status is Called', () => {
            const result = instance.getClassFromStatus("Called", classes)

            expect(result).toBe(classes.called)
        })

        it('returns classes.needToCall when the status is "Need to call again"', () => {
            const result = instance.getClassFromStatus("Need to call again", classes)

            expect(result).toBe(classes.needToCall)
        })
    })

    describe('changeContactStatus(contact, status)', () => {
        it('calls updateContactStatus(contact, status)', () => {
            const contact = {}
            const status = "test"

            instance.changeContactStatus(contact, status)

            expect(props.updateContactStatus).toHaveBeenLastCalledWith(contact, status)
        })
    })
})
