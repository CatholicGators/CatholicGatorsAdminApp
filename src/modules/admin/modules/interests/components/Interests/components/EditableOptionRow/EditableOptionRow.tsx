import React, { Component } from "react"
import { Checkbox, withStyles, createStyles, Theme } from "@material-ui/core"
import EditableTextField from "../EditableTextField/EditableTextField"
import { Option } from "../../../../services/interestsService"

export const styles = (theme: Theme) =>
    createStyles({
        checkbox: {
            margin: 0,
            pointerEvents: "none",
        },
        optionRow: {
            display: "flex",
            alignItems: "center",
            "&:hover": {
                section: {
                    display: "block",
                },
            },
            height: "48px",
        },
    })

export type Props = {
    classes: any
    option: Option
    editingOptionId: string
    beginEditingOption: (optionId: string) => void
    cancelEditingOption: () => void
    deleteOption: (optionId: string) => void
    saveOption: (optionId: string, newText: string) => void
}

export type State = {
    isHovered: boolean
}

export class EditableOptionRow extends Component<Props, State> {
    state = {
        isHovered: false,
    };

    render() {
        const { option, editingOptionId, classes } = this.props
        const { isHovered } = this.state

        return (
            <div
                className={classes.optionRow}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <Checkbox className={classes.checkbox} color="primary" />
                <EditableTextField
                    isHovered={isHovered}
                    isEditing={option.id === editingOptionId}
                    id={option.id}
                    text={option.text}
                    beginEditing={this.props.beginEditingOption}
                    deleteText={this.props.deleteOption}
                    save={this.props.saveOption}
                    cancelEditing={this.props.cancelEditingOption}
                />
            </div>
        )
    }
}

export default withStyles(styles)(EditableOptionRow)
