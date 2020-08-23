import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

import { EditableOptionRow, Props, styles } from "./EditableOptionRow"
import EditableTextField from "../EditableTextField/EditableTextField"
import mockStyles from "utils/mockStyles"

describe("EditableOptionRow", () => {
    let props: Props, wrapper

    beforeEach(() => {
        props = {
            classes: mockStyles(styles),
            option: {
                id: "1",
                text: "option",
            },
            editingOptionId: null,
            beginEditingOption: jest.fn(),
            cancelEditingOption: jest.fn(),
            deleteOption: jest.fn(),
            saveOption: jest.fn(),
        }
        wrapper = shallow(<EditableOptionRow {...props} />)
    })

    it("should match snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it("should set the state according to whether hovering or not and pass that down to the text field", () => {
        let textField = wrapper.find(EditableTextField)
        expect(wrapper.state().isHovered).toBe(false)
        expect(textField.props().isHovered).toBe(false)

        wrapper.simulate("mouseenter")
        expect(wrapper.state().isHovered).toBe(true)
        textField = wrapper.find(EditableTextField)
        expect(textField.props().isHovered).toBe(true)

        wrapper.simulate("mouseleave")
        expect(wrapper.state().isHovered).toBe(false)
        textField = wrapper.find(EditableTextField)
        expect(textField.props().isHovered).toBe(false)
    })

    it("sets isEditing on text field to whether the option id is equal to the editingOptionId", () => {
        let textField = wrapper.find(EditableTextField)

        expect(props.editingOptionId === props.option.id).toBe(false)
        expect(textField.props().isEditing).toBe(false)

        props.editingOptionId = props.option.id
        wrapper.setProps({ ...props })

        textField = wrapper.find(EditableTextField)
        expect(textField.props().isEditing).toBe(true)
    })

    it("when beginEditing is called from EditableTextField it calls beginEditingOption", () => {
        const textField = wrapper.find(EditableTextField)
        textField.props().beginEditing(props.option.id)
        expect(props.beginEditingOption).toHaveBeenCalledWith(props.option.id)
    })

    it("when deleteText is called from EditableTextField it calls deleteOption", () => {
        const textField = wrapper.find(EditableTextField)
        textField.props().deleteText(props.option.id)
        expect(props.deleteOption).toHaveBeenCalledWith(props.option.id)
    })

    it("when save is called from EditableTextField it calls saveOption", () => {
        const newText = "newText"
        const textField = wrapper.find(EditableTextField)
        textField.props().save(props.option.id, newText)
        expect(props.saveOption).toHaveBeenCalledWith(props.option.id, newText)
    })

    it("when cancelEditing is called from EditableTextField it calls cancelEditingOption", () => {
        const textField = wrapper.find(EditableTextField)
        textField.props().cancelEditing()
        expect(props.cancelEditingOption).toHaveBeenCalledWith()
    })
})
