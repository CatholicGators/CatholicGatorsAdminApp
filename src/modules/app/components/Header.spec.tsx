import React from 'react'
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Header from './Header';

describe('Header', () => {
    const initialState = {
        user: null
    };
    const mockStore = configureStore();
    let props, wrapper, store;

    beforeEach(() => {
        store = mockStore(initialState);
        props = {
            signOut: jest.fn(),
            googleSignIn: jest.fn()
        };
        wrapper = shallow(<Header store={store}/>);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('handleLogin()', () => {
        it('should call googleSignIn()', () => {
            const component = wrapper.dive();

            component.find('#login-btn').simulate('click');

            expect(store.getActions()).toBe('');
        });
    });
});