import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Admin, menuLinks, styles } from './Admin'
import mockStyles from '../../../../utils/mockStyles'

describe('Admin', () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            match: {
                url: 'test'
            },
            location: {
                pathname: 'test/testing'
            }
        }
        wrapper = shallow(<Admin {...props} />)
    })

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('should render all of the sub nav links', () => {
        menuLinks.forEach(link =>
            expect(
                wrapper.exists(`NavLink[to='${props.match.url}${link.href}']`)
            ).toBe(true)
        )
    })
})
