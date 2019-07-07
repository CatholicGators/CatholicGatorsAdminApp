import React, { Component } from 'react'
import {
    Checkbox,
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Input
} from '@material-ui/core'
import {
    Save,
    Close,
    Add
} from '@material-ui/icons'

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

type Props = {
    isAdding: boolean,
    classes: any,
    beginAddingOption: () => void,
    addOption: (text: string) => void,
    cancelAddingOption: () => void
}

type State = {
    text: string
}

export class AddOptionButton extends Component<Props, State> {
    state = {
        text: ''
    }

    onAddOptionChange(text: string) {
        this.setState({ text })
    }

    addOption() {
        const { text } = this.state
        if(text) {
            this.props.addOption(text)
            this.setState({ text: '' })
        }
    }

    render() {
        const {
            isAdding,
            classes,
            beginAddingOption,
            cancelAddingOption
        } = this.props

        const {
            text
        } = this.state

        return (
            <div>
                {isAdding ? (
                    <div className={classes.optionRow}>
                        <Checkbox
                            className={classes.checkbox}
                            color='primary'
                        />
                        <Input
                            fullWidth
                            key={1}
                            className={classes.input}
                            value={text}
                            onChange={ev => this.onAddOptionChange(ev.target.value)}
                        />
                        <div className={classes.editActions}>
                            <IconButton
                                disabled={!text}
                                onClick={() => this.addOption()}
                            >
                                <Save />
                            </IconButton>
                            <IconButton onClick={() => cancelAddingOption()}>
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                ) : (
                    <IconButton onClick={() => beginAddingOption()}>
                        <Add />
                    </IconButton>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(AddOptionButton)