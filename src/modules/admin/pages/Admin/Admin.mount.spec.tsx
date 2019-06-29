import React from 'react'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Admin from './Admin'
import UserTable from '../../components/UserTable/UserTable';

describe('Admin Mount', () => {
    let props, wrapper, mockStore

    beforeEach(() => {
        mockStore = configureStore()({
            admin: {
                users: []
            }
        })
        props = {
            match: { 
                url: 'test'
            },
            location: {
                pathname: 'test/testing'
            }
        }
        wrapper = mount(
            <MemoryRouter initialEntries={[props.match.url]}>
                <Provider store={mockStore}>
                    <Admin {...props}></Admin>
                </Provider>
            </MemoryRouter>
        )
    })

    it('should render a redirect to the default page on the base route', () => {
        expect(wrapper.exists(UserTable)).toBe(true)
    })
})
