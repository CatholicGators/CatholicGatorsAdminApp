import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Paper,
    Typography,
    Toolbar,
    Theme,
    createStyles,
    withStyles,
    CircularProgress
} from '@material-ui/core'
import EditableInterestOption from './components/EditableInterestOption/EditableInterestOption';
import {
    getInterests,
    updateInterests
} from '../../../../redux/actions/contactForm/interestActions';

const styles = (theme: Theme) => createStyles({
    formWrapper: {
        width: 600
    },
    form: {
        margin: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    formLoadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
    },
})

export type Props = {
    classes: any,
    interests: Section[]
    getInterests: () => void,
    updateInterests: (interests : Section[]) => void
}

type State = {
    editingOptionId: number | null
}

type Section = {
    id: string,
    text: string,
    options: Option[]
}

export type Option = {
    id: number,
    text: string
}

export class Interests extends Component<Props, State> {
    state = {
        editingOptionId: null
    }

    componentDidMount() {
        this.props.getInterests()
    }

    beginEditing(optionId: number) {
        this.setState({ editingOptionId: optionId })
    }

    cancelEditing() {
        this.setState({ editingOptionId: null })
    }

    deleteOption(sectionId: string, optionId: number) {
        this.setState({ editingOptionId: null })
    }

    saveOption(sectionId: string, optionId: number, newText: string) {
        this.props.updateInterests([
            ...this.props.interests.map(section => section.id !== sectionId ? section : {
                ...section,
                options: [
                    ...section.options.map(option => option.id !== optionId ? option : {
                        ...option,
                        text: newText
                    })
                ]
            })
        ])
        this.setState({ editingOptionId: null })
    }

    render() {
        const { classes, interests } = this.props
        return (
            <Paper className={classes.formWrapper}>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                </Toolbar>
                {interests ? (
                    <div className={classes.form}>
                        {interests.map(section => 
                            <div key={section.id}>
                                <Typography>{section.text}</Typography>
                                {section.options.map(option =>
                                    <EditableInterestOption
                                        key={option.id}
                                        isEditing={option.id === this.state.editingOptionId}
                                        option={option}
                                        editOption={optionId => this.beginEditing(optionId)}
                                        deleteOption={optionId => this.deleteOption(section.id, optionId)}
                                        onSave={(optionId, newText) => this.saveOption(section.id, optionId, newText)}
                                        onCancel={() => this.cancelEditing()}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={classes.formLoadingContainer}>
                        <CircularProgress size="60px" />
                    </div>
                )}
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    interests: state.contactForm.interests
})

const mapDispatchToProps = dispatch => ({
    getInterests: () => dispatch(getInterests()),
    updateInterests: interests => dispatch(updateInterests(interests))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Interests))
