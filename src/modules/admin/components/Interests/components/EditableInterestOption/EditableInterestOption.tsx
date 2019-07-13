import React, { Component } from 'react'
import {
    Checkbox,
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Input,
    Typography
} from '@material-ui/core'
import {
    Delete,
    Edit,
    Save,
    Close
} from '@material-ui/icons'
import { Option } from '../../Interests'

const styles = (theme: Theme) => createStyles({
    checkbox: {
        margin: 0,
        pointerEvents: 'none'
    },
    input: {
        margin: 0
    },
    optionRow: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            '& section': {
                display: 'block'
            }
        }
    },
    actions: {
        display: 'none',
        marginLeft: `${theme.spacing.unit}px`
    },
    editActions: {
        display: 'flex',
        alignItems: 'center'
    }
})

export type Props = {
    isEditing: boolean,
    classes: any,
    option: Option,
    beginEditing: (optionId: number) => void,
    cancelEditing: () => void,
    deleteOption: (optionId: number) => void,
    saveOption: (optionId: number, newText: string) => void
}

type State = {
    editedOptionText: string
}

export class EditableInterestOption extends Component<Props, State> {
    state = {
        editedOptionText: this.props.option.text
    }

    onEditOptionChange(newText: string) {
        this.setState({ editedOptionText: newText })
    }

    render() {
        const {
            isEditing,
            classes,
            option,
            beginEditing,
            deleteOption,
            saveOption,
            cancelEditing
        } = this.props

        const {
            editedOptionText
        } = this.state

        return (
            <div className={classes ? classes.optionRow : null}>
                <Checkbox
                    className={classes ? classes.checkbox : null}
                    color='primary'
                />
                {isEditing ? ([
                    <Input
                        fullWidth
                        key={1}
                        className={classes ? classes.input : null}
                        value={this.state.editedOptionText}
                        onChange={ev => this.onEditOptionChange(ev.target.value)}
                    />,
                    <div key={2} className={classes ? classes.editActions : null}>
                        <IconButton id="save" onClick={() => saveOption(option.id, editedOptionText)}>
                            <Save />
                        </IconButton>
                        <IconButton id="cancel" onClick={() => cancelEditing()}>
                            <Close />
                        </IconButton>
                    </div>
                ]) : ([
                    <Typography key={1}>{option.text}</Typography>,
                    <section key={2} className={classes ? classes.actions : null}>
                        <IconButton id="edit" onClick={() => beginEditing(option.id)}>
                            <Edit />
                        </IconButton>
                        <IconButton id="delete" onClick={() => deleteOption(option.id)}>
                            <Delete />
                        </IconButton>
                    </section>
                ])}
            </div>
        )
    }
}

export default withStyles(styles)(EditableInterestOption)