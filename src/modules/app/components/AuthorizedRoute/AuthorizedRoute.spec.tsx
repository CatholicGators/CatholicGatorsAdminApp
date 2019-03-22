import React from 'react'
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom'

import AuthorizedRoute from './AuthorizedRoute';

class TestComponent extends React.Component {
    render() {
        return <div>"test"</div>
    }
}
class RedirectComponent extends React.Component {
    render() {
        return <div>"redirect"</div>
    }
}

describe('AuthorizedRoute', () => {
    let props= {
        component: TestComponent,
        isAuthorized: true,
        redirectPathname: '/redirect',
        path: '/admin'
    };

    it('renders the component when authorized', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[props.path]}>
                <div>
                    <AuthorizedRoute {...props}></AuthorizedRoute>
                    <Route path={props.redirectPathname} component={RedirectComponent}></Route>
                </div>
            </MemoryRouter>
        );

        expect(wrapper.exists('TestComponent')).toBe(true)
        expect(wrapper.exists('Redirect')).toBe(false)
    })

    it('renders the redirect with redirectPathname when not authorized', () => {
        props = {
            ...props,
            isAuthorized: false
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={[props.path]}>
                <div>
                    <AuthorizedRoute {...props}></AuthorizedRoute>
                    <Route path={props.redirectPathname} component={RedirectComponent}></Route>
                </div>
            </MemoryRouter>
        );

        expect(wrapper.exists('TestComponent')).toBe(false)
        expect(wrapper.exists('RedirectComponent')).toBe(true)
    })
})