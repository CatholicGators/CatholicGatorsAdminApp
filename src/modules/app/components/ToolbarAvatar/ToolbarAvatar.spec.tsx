import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

import { ToolbarAvatar, styles } from "./ToolbarAvatar"
import mockStyles from "utils/mockStyles"

describe("ToolbarAvatar", () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            user: {},
            login: jest.fn(),
            logout: jest.fn(),
        }
        wrapper = shallow(<ToolbarAvatar {...props} />)
    })

    it("should match snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    describe("user is loading", () => {
        beforeEach(() => {
            wrapper.setProps({ user: undefined })
        })

        it("should only show a spinner", () => {
            expect(wrapper.exists("#spinner")).toBe(true)
            expect(wrapper.exists("#login-btn")).toBe(false)
            expect(wrapper.exists("#avatar-btn")).toBe(false)
        })
    })

    describe("user is not logged in", () => {
        beforeEach(() => {
            wrapper.setProps({ user: null })
        })

        it("should only show the login button", () => {
            expect(wrapper.exists("#spinner")).toBe(false)
            expect(wrapper.exists("#login-btn")).toBe(true)
            expect(wrapper.exists("#avatar-btn")).toBe(false)
        })

        it("calls googleSignIn()", () => {
            wrapper.find("#login-btn").simulate("click")

            expect(props.login).toHaveBeenCalled()
        })
    })

    describe("user is logged in", () => {
        const testTarget = "test"

        beforeEach(() => {
            wrapper
                .find("#avatar-btn")
                .simulate("click", { currentTarget: testTarget })
        })

        it("should only show the avatar", () => {
            expect(wrapper.exists("#spinner")).toBe(false)
            expect(wrapper.exists("#login-btn")).toBe(false)
            expect(wrapper.exists("#avatar-btn")).toBe(true)
        })

        it("clicking avatar sets anchorEl", () => {
            expect(wrapper.state("anchorEl")).toBe(testTarget)
        })

        describe("logout", () => {
            it("closes the menu", () => {
                wrapper.find("#logout").simulate("click")

                expect(wrapper.state("anchorEl")).toBe(null)
            })

            it("calls signOut()", () => {
                wrapper.find("#logout").simulate("click")

                expect(props.logout).toHaveBeenCalled()
            })
        })
    })
})
