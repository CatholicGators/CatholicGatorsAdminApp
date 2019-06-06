import React, { Component } from 'react'
import {
    Paper,
    Typography,
    Toolbar,
    Checkbox,
    FormControlLabel,
    Theme,
    createStyles,
    withStyles,
    IconButton
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'

const styles = (theme: Theme) => createStyles({
    form: {
        margin: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    formCtrl: {
        margin: 0
    },
    optionRow: {
        display: 'flex',
        '&:hover': {
            '& div': {
                display: 'block'
            }
        }
    },
    actions: {
        display: 'none'
    }
})

type Props = {
    classes: any
}

const interests = [
    {
        name: 'I am interested in...',
        options: [
            'events for Greek students',
            'events for Latino/a students',
            'events for graduate students'
        ]
    },
    {
        name: 'I would like to...',
        options: [
            'receive the monthly e-newsletter',
            'register as a parishioner'
        ]
    },
    {
        name: 'I am interested in getting involved in...',
        options: [
            'English Bible Studies',
            'Spanish/Bilingual Bible Study',
            'Free Food',
            'Guest Speakers',
            'Music Ministry',
            'Socials',
            'Retreats',
            'Intramural Sports',
            'Pro-Life Club',
            'Communications (Photo, Print, Graphics, PR, Advertising, and Video)',
            'Serving at Mass',
            'Teach Religious Education',
            'Service Projects and Trips'
        ]
    }
]

export class Permissions extends Component<Props> {
    render() {
        const { classes } = this.props
        return (
            <Paper>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                </Toolbar>
                <div className={classes ? classes.form : null}>
                    {interests.map(section => 
                        <div key={section.name}>
                            <Typography>{section.name}</Typography>
                            {section.options.map(option =>
                                <div className={classes ? classes.optionRow : null}>
                                    <FormControlLabel
                                        key={option}
                                        className={classes ? classes.formCtrl : null}
                                        control={
                                            <Checkbox
                                                color='primary'
                                                value={option}
                                            ></Checkbox>
                                        }
                                        label={option}
                                    />
                                    <div className={classes ? classes.actions : null}>
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(Permissions)
