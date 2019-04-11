import React from 'react'
import { shallow } from 'enzyme';

import { MyContacts } from './MyContacts';

describe('MyContacts', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            getContacts: jest.fn()
        };
        wrapper = shallow(<MyContacts {...props} />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});