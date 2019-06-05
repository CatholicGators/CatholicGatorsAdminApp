import React, { Component } from 'react'
import {
    Paper,
    Typography,
    Toolbar,
    Checkbox,
    FormControlLabel
} from '@material-ui/core'
// import { Delete, Edit } from '@material-ui/icons';


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
        return (
            <Paper>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                </Toolbar>
                {interests.map(section => 
                    <div key={section.name}>
                        <Typography>{section.name}</Typography>
                        {section.options.map(option =>
                            <FormControlLabel
                                key={option}
                                control={
                                    <Checkbox
                                        color='primary'
                                        value={option}
                                    ></Checkbox>
                                }
                                label={option}
                            />
                        )}
                    </div>
                )}
            </Paper>
        )
    }
}

export default Permissions
