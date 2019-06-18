import React, { Component } from 'react'
import {
    Paper,
    Typography,
    Toolbar,
    Theme,
    createStyles,
    withStyles
} from '@material-ui/core'
import EditableInterestOption from './components/EditableInterestOption/EditableInterestOption';

const styles = (theme: Theme) => createStyles({
    formWrapper: {
        width: 600
    },
    form: {
        margin: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    }
})

type Props = {
    classes: any
}

type State = {
    editingOptionId: number | null
}

type Section = {
    id: number,
    text: String,
    options: Option[]
}

export type Option = {
    id: number,
    text: string
}

const interests: Section[] = [
    {
        id: 1,
        text: 'I am interested in...',
        options: [
            {
                id: 1,
                text: 'events for Greek students'
            },
            {
                id: 2,
                text: 'events for Latino/a students'
            },
            {
                id: 3,
                text: 'events for graduate students'
            }
        ]
    },
    {
        id: 2,
        text: 'I would like to...',
        options: [
            {
                id: 4,
                text: 'receive the monthly e-newsletter'
            },
            {
                id: 5,
                text: 'register as a parishioner'
            }
        ]
    },
    {
        id: 3,
        text: 'I am interested in getting involved in...',
        options: [
            {
                id: 6,
                text: 'English Bible Studies'
            },
            {
                id: 7,
                text: 'Spanish/Bilingual Bible Study'
            },
            {
                id: 8,
                text: 'Free Food'
            },
            {
                id: 9,
                text: 'Guest Speakers'
            },
            {
                id: 10,
                text: 'Music Ministry'
            },
            {
                id: 11,
                text: 'Socials'
            },
            {
                id: 12,
                text: 'Retreats'
            },
            {
                id: 13,
                text: 'Intramural Sports'
            },
            {
                id: 14,
                text: 'Pro-Life Club'
            },
            {
                id: 15,
                text: 'Communications (Photo, Print, Graphics, PR, Advertising, and Video)'
            },
            {
                id: 16,
                text: 'Serving at Mass'
            },
            {
                id: 17,
                text: 'Teach Religious Education'
            },
            {
                id: 18,
                text: 'Service Projects and Trips'
            }
        ]
    }
]

export class Interests extends Component<Props, State> {
    state = {
        editingOptionId: null
    }

    editOption(id: number) {
        this.setState({ editingOptionId: id })
    }

    deleteOption(id: number) {
        this.setState({ editingOptionId: null })
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes ? classes.formWrapper : null}>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                </Toolbar>
                <div className={classes ? classes.form : null}>
                    {interests.map(section => 
                        <div key={section.id}>
                            <Typography>{section.text}</Typography>
                            {section.options.map(option =>
                                <EditableInterestOption
                                    key={option.id}
                                    isEditing={option.id === this.state.editingOptionId}
                                    option={option}
                                    editOption={id => this.editOption(id)}
                                    deleteOption={id => this.deleteOption(id)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(Interests)
