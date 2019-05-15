import React from 'react'
import { shallow } from 'enzyme';

import { Admin } from './Admin'
import {
    TableHead,
    Checkbox,
    CircularProgress,
    TableRow
} from '@material-ui/core';

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
        expect(wrapper.find(CircularProgress).exists()).toBe(true)
    })

    describe('handleSelectAll()', () => {
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

    describe('handleSelect(id)', () => {
        it('adds the id to the selected field when id is not originally in the array', () => {
            const id = props.users[1].id
            wrapper.instance().handleSelect(id)
            expect(wrapper.state().selected).toEqual([id])
        })
    
        it('removes the id from the selected field when id is at the end of the array', () => {
            const instance = wrapper.instance()
            const expectedArr = props.users.map(user => user.id)
            expectedArr.splice(-1, 1)

            for(var i = 0; i < props.users.length; i++) {
                instance.handleSelect(props.users[i].id)
            }
            instance.handleSelect(props.users[props.users.length - 1].id)

            expect(wrapper.state().selected).toEqual(expectedArr)
        })
    })
})
