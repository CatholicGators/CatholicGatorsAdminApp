import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { Header, menuLinks } from './Header'

describe('Header', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            user: {
                isAdmin: true
            },
            location: {
                pathname: '/'
            },
            signOut: jest.fn(),
            googleSignIn: jest.fn()
        }
        wrapper = shallow(<Header {...props} />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should have the drawer not open by default', () => {
        expect(wrapper.state('drawerOpen')).toBe(false)
    })

    it('renders all links when user is an admin', () => {
        const dom = mount(
            <MemoryRouter>
                <div>
                    <Header {...props} />
                </div>
            </MemoryRouter>
        )

        menuLinks.forEach(link => expect(dom.exists(`NavLink[to='${link.href}']`)).toBe(true))
    })

    it('renders only unAuthorized links when user is not an admin', () => {
        props = {
            ...props,
            user: {
                ...props.user,
                isAdmin: false
            }
        }
        const dom = mount(
            <MemoryRouter>
                <div>
                    <Header {...props} />
                </div>
            </MemoryRouter>
        )

        menuLinks.forEach(link => expect(dom.exists(`NavLink[to='${link.href}']`)).toBe(!link.needsAuthorization))
    })
})