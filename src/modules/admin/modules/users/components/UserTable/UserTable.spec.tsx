import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

import { UserTable, styles } from "./UserTable"
import { TableHead, Checkbox, CircularProgress } from "@material-ui/core"
import mockStyles from "utils/mockStyles"

describe("UserTable", () => {
    let props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            getUsers: jest.fn(),
            updateUser: jest.fn(),
            batchDeleteUsers: jest.fn(),
            users: [
                {
                    id: "1",
                    name: "Joey",
                    isAdmin: false,
                },
                {
                    id: "2",
                    name: "Ryan",
                    isAdmin: false,
                },
                {
                    id: "3",
                    name: "Espresso Shot Capuccino",
                    isAdmin: true,
                },
            ],
        }
        wrapper = shallow(<UserTable {...props} />)
    })

    it("should match snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it("should call getUsers when mounted", () => {
        expect(props.getUsers).toHaveBeenCalled()
    })

    it("shows the circular progress when run loading the users", () => {
        wrapper.setProps({ users: undefined })
        expect(wrapper.find(CircularProgress).exists()).toBe(true)
    })

    describe("handleSelectAll()", () => {
        it("sets the selected array to contain all of the ids when the table head checkbox is clicked", () => {
            const header = wrapper.find(TableHead)
            const checkbox = header.find(Checkbox)

            checkbox.simulate("change", { target: { checked: true } })

            const selected = wrapper.state().selected
            expect(selected.length).toEqual(props.users.length)
            for (var i = 0; i < props.users.length; i++) {
                expect(selected).toContain(props.users[i].id)
            }
        })

        it("resets the selected array when unchecked", () => {
            const header = wrapper.find(TableHead)
            const checkbox = header.find(Checkbox)

            checkbox.simulate("change", { target: { checked: false } })

            const selected = wrapper.state().selected
            expect(selected.length).toBe(0)
        })
    })

    describe("handleSelect(id)", () => {
        it("adds the id to the selected field when id is not originally in the array", () => {
            const id = props.users[1].id
            wrapper.instance().handleSelect(id)
            expect(wrapper.state().selected).toEqual([id])
        })

        describe("when multiple users already selected", () => {
            let instance, expectedArr

            beforeEach(() => {
                instance = wrapper.instance()
                expectedArr = props.users.map((user) => user.id)

                for (var i = 0; i < props.users.length; i++) {
                    instance.handleSelect(props.users[i].id)
                }
            })

            it("removes the id from the selected field when id is at the end of the array", () => {
                expectedArr.splice(-1, 1)
                instance.handleSelect(props.users[props.users.length - 1].id)

                expect(wrapper.state().selected).toEqual(expectedArr)
            })

            it("removes the id from the selected field when id is at the beginning of the array", () => {
                expectedArr.splice(0, 1)

                instance.handleSelect(props.users[0].id)

                expect(wrapper.state().selected).toEqual(expectedArr)
            })

            it("removes the id from the selected field when id is not at the beginning nor end of the array", () => {
                expectedArr.splice(1, 1)

                instance.handleSelect(props.users[1].id)

                expect(wrapper.state().selected).toEqual(expectedArr)
            })
        })
    })

    describe("handleBatchApprove()", () => {
        let instance, ammountToApprove

        beforeEach(() => {
            ammountToApprove = props.users.length - 1
            instance = wrapper.instance()

            for (var i = 0; i < ammountToApprove; i++) {
                instance.handleSelect(props.users[i].id)
            }
        })

        it("approves all of the selected users", () => {
            instance.handleBatchApprove()

            for (var i = 0; i < ammountToApprove; i++) {
                expect(props.updateUser).toHaveBeenCalledWith({
                    ...props.users[i],
                    isApproved: true,
                })
            }
            expect(props.updateUser).toHaveBeenCalledTimes(ammountToApprove)
        })

        it("clears the selected array", () => {
            let selected = wrapper.state().selected
            expect(selected.length).toBe(ammountToApprove)

            instance.handleBatchApprove()

            selected = wrapper.state().selected
            expect(selected.length).toBe(0)
        })
    })

    describe("handleBatchAuthorize()", () => {
        let instance, ammountToAuthorize

        beforeEach(() => {
            ammountToAuthorize = props.users.length - 1
            instance = wrapper.instance()

            for (var i = 0; i < ammountToAuthorize; i++) {
                instance.handleSelect(props.users[i].id)
            }
        })

        it("authorizes all of the selected users", () => {
            instance.handleBatchAuthorize()

            for (var i = 0; i < ammountToAuthorize; i++) {
                expect(props.updateUser).toHaveBeenCalledWith({
                    ...props.users[i],
                    isApproved: true,
                    isAdmin: true,
                })
            }
            expect(props.updateUser).toHaveBeenCalledTimes(ammountToAuthorize)
        })

        it("clears the selected array", () => {
            let selected = wrapper.state().selected
            expect(selected.length).toBe(ammountToAuthorize)

            instance.handleBatchApprove()

            selected = wrapper.state().selected
            expect(selected.length).toBe(0)
        })
    })

    describe("handleBatchDelete()", () => {
        let instance, ammountToDelete

        beforeEach(() => {
            ammountToDelete = props.users.length - 1
            instance = wrapper.instance()

            for (var i = 0; i < ammountToDelete; i++) {
                instance.handleSelect(props.users[i].id)
            }
        })

        it("deletes all of the selected users", () => {
            const selected = wrapper.state().selected

            instance.handleBatchDelete()

            expect(props.batchDeleteUsers).toHaveBeenCalledWith(selected)
            expect(props.batchDeleteUsers).toHaveBeenCalledTimes(1)
        })

        it("clears the selected array", () => {
            let selected = wrapper.state().selected
            expect(selected.length).toBe(ammountToDelete)

            instance.handleBatchDelete()

            selected = wrapper.state().selected
            expect(selected.length).toBe(0)
        })
    })
})
