import React, { Component } from 'react'
import {
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Input
} from '@material-ui/core'
import { Save, Close, Add } from '@material-ui/icons'

export const styles = (theme: Theme) =>
    createStyles({
        checkbox: {
            margin: 0,
            pointerEvents: 'none'
        },
        input: {
            margin: 0
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                '& section': {
                    display: 'block'
                }
            },
            width: '100%'
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
    isAdding: boolean
    classes: any
    beginAdding: () => void
    onAdd: (text: string) => void
    cancelAdding: () => void
}

type State = {
    text: string
}

export class AddableTextField extends Component<Props, State> {
    state = {
        text: ''
    }

    onChange(text: string) {
        this.setState({ text })
    }

    add() {
        const { text } = this.state
        if (text) {
            this.props.onAdd(text)
            this.setState({ text: '' })
        }
    }

    render() {
        const { isAdding, classes, beginAdding, cancelAdding } = this.props

        const { text } = this.state

        return isAdding ? (
            <div className={classes.row}>
                <Input
                    fullWidth
                    className={classes.input}
                    value={text}
                    onChange={ev => this.onChange(ev.target.value)}
                />
                <div className={classes.editActions}>
                    <IconButton
                        id="save-btn"
                        disabled={!text}
                        onClick={() => this.add()}
                    >
                        <Save />
                    </IconButton>
                    <IconButton id="close-btn" onClick={cancelAdding}>
                        <Close />
                    </IconButton>
                </div>
            </div>
        ) : (
            <IconButton onClick={beginAdding}>
                <Add />
            </IconButton>
        )
    }
}

export default withStyles(styles)(AddableTextField)
