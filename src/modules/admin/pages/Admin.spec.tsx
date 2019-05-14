import React from 'react'
import { shallow } from 'enzyme';

import { Admin } from './Admin'
import { TableHead, Checkbox } from '@material-ui/core';

describe('Admin', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            getUsers: jest.fn(),
            users: [
                {
                    id: "1",
                    name: "Joey",
                    isAdmin: false
                },
                {
                    id: "2",
                    name: "Ryan",
                    isAdmin: false
                },
                {
                    id: "3",
                    name: "Espresso Shot Capuccino",
                    isAdmin: true
                }
            ]
        }
        wrapper = shallow(<Admin {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    it('should call getUsers when mounted', () => {
        expect(props.getUsers).toHaveBeenCalled()
    })

    it('shows the circular progress when run loading the users', () => {
        wrapper.setProps({ users: undefined })
        expect(wrapper.find('#loading-spinner').exists()).toBe(true)
    })

    it('sets the selected array to contain all of the ids when the table head checkbox is clicked', () => {
        const header = wrapper.find(TableHead)
        const checkbox = header.find(Checkbox)

        checkbox.simulate('change', { target: { checked: true } })

        const selected = wrapper.state().selected
        expect(selected.length).toEqual(props.users.length)
        for(var i = 0; i < props.users.length; i++) {
            expect(selected).toContain(props.users[i].id)
        }
    })
})
