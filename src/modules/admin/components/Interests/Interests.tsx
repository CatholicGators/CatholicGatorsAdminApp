import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Paper,
    Typography,
    Toolbar,
    Theme,
    createStyles,
    withStyles,
    CircularProgress,
    Button
} from '@material-ui/core'
import EditableInterestOption from './components/EditableInterestOption/EditableInterestOption';
import {
    getInterests,
    updateInterests,
    addOption
} from '../../../../redux/actions/contactForm/interestActions';
import AddOptionButton from './components/AddOptionButton/AddOptionButton';

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
    addSectionBtn: {
        marginLeft: 'auto'
    }
})

export type Props = {
    classes: any,
    interests: Section[]
    getInterests: () => void,
    updateInterests: (interests : Section[]) => void,
    addOption: (sectionId: string, option: Option) => void
}

type State = {
    editingOptionId: number | null
    addingSectionId: string
}

export type Section = {
    id: string
    text: string
    options: Option[]
}

export type Option = {
    id?: number
    sectionId: string
    text: string
}

export class Interests extends Component<Props, State> {
    state = {
        editingOptionId: null,
        addingSectionId: null
    }

    componentDidMount() {
        this.props.getInterests()
    }

    beginEditingOption(optionId: number) {
        this.setState({ editingOptionId: optionId, addingSectionId: null })
    }

    cancelEditingOption() {
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

    beginAddingOption(sectionId: string) {
        this.setState({ addingSectionId: sectionId, editingOptionId: null })
    }   

    cancelAddingOption() {
        this.setState({ addingSectionId: null })
    }

    addOption(sectionId: string, text: string) {
        this.props.addOption(sectionId, { sectionId, text })
        this.setState({ addingSectionId: null })
    }

    render() {
        const { classes, interests } = this.props
        const { addingSectionId, editingOptionId } = this.state
        return (
            <Paper className={classes.formWrapper}>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                    <Button variant="outlined" color="primary" className={classes.addSectionBtn}>
                        Add Section
                    </Button>
                </Toolbar>
                {interests ? (
                    <div className={classes.form}>
                        {interests.map(section => 
                            <div key={section.id}>
                                <Typography>{section.text}</Typography>
                                {section.options.map(option =>
                                    <EditableInterestOption
                                        key={option.id}
                                        isEditing={option.id === editingOptionId}
                                        option={option}
                                        beginEditing={optionId => this.beginEditingOption(optionId)}
                                        deleteOption={optionId => this.deleteOption(section.id, optionId)}
                                        saveOption={(optionId, newText) => this.saveOption(section.id, optionId, newText)}
                                        cancelEditing={() => this.cancelEditingOption()}
                                    />
                                )}
                                <AddOptionButton
                                    isAdding={addingSectionId === section.id}
                                    beginAddingOption={() => this.beginAddingOption(section.id)}
                                    cancelAddingOption={() => this.cancelAddingOption()}
                                    addOption={text => this.addOption(section.id, text)}
                                />
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
    updateInterests: interests => dispatch(updateInterests(interests)),
    addOption: (sectionId: string, option: Option) => dispatch(addOption(sectionId, option))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Interests))
