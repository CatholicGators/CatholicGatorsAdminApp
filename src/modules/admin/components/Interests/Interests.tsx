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
import {
    getInterests,
    updateInterests,
    addOption,
    addSection
} from '../../../../redux/actions/contactForm/interestActions';
import AddOptionButton from './components/AddOptionButton/AddOptionButton';
import EditableOptionRow from './components/EditableOptionRow/EditableOptionRow';
import EditableTextField from './components/EditableTextField/EditableTextField';

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
    addOption: (option: Option) => void,
    addSection: (section: Section) => void
}

type State = {
    editingOptionId: any
    addingSectionId: string
    isAddingSection: boolean
}

export type Section = {
    id?: string
    text: string
    options: Option[]
}

export type Option = {
    id?: any
    sectionId: string
    text: string
}

export class Interests extends Component<Props, State> {
    state = {
        editingOptionId: null,
        addingSectionId: null,
        isAddingSection: false
    }

    componentDidMount() {
        this.props.getInterests()
    }

    beginAddingSection() {
        this.setState({
            isAddingSection: true,
            addingSectionId: null,
            editingOptionId: null
        })
    }

    addSection(text: string) {
        this.props.addSection({
            text,
            options: []
        })
        this.setState({ isAddingSection: false })
    }

    beginEditingOption(optionId: any) {
        this.setState({
            editingOptionId: optionId,
            addingSectionId: null,
            isAddingSection: false
        })
    }

    cancelEditingOption() {
        this.setState({ editingOptionId: null })
    }

    deleteOption(sectionId: string, optionId: any) {
        this.setState({ editingOptionId: null })
    }

    saveOption(sectionId: string, optionId: any, newText: string) {
        this.props.updateInterests([
            ...this.props.interests.map(section => section.id !== sectionId ? section : {
                ...section,
                options: [
                    ...section.options.map(option => option.id !== optionId ? option : {
                        ...option,
                        sectionId,
                        text: newText
                    })
                ]
            })
        ])
        this.setState({ editingOptionId: null })
    }

    beginAddingOption(sectionId: string) {
        this.setState({
            addingSectionId: sectionId,
            editingOptionId: null,
            isAddingSection: false
        })
    }   

    cancelAddingOption() {
        this.setState({ addingSectionId: null })
    }

    addOption(sectionId: string, text: string) {
        this.props.addOption({ sectionId, text })
        this.setState({ addingSectionId: null })
    }

    render() {
        const { classes, interests } = this.props
        const {
            addingSectionId,
            editingOptionId,
            isAddingSection
        } = this.state
        return (
            <Paper className={classes.formWrapper}>
                <Toolbar>
                    <Typography variant="h6">Edit Interests step of form</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.addSectionBtn}
                        onClick={() => this.beginAddingSection()}>
                        Add Section
                    </Button>
                </Toolbar>
                {interests ? (
                    <div className={classes.form}>
                        {interests.map(section => 
                            <div key={section.id}>
                                <Typography>{section.text}</Typography>
                                {section.options.map(option =>
                                    <EditableOptionRow
                                        key={option.id}
                                        option={option}
                                        editingOptionId={editingOptionId}
                                        beginEditingOption={optionId => this.beginEditingOption(optionId)}
                                        deleteOption={optionId => this.deleteOption(section.id, optionId)}
                                        saveOption={(optionId, newText) => this.saveOption(section.id, optionId, newText)}
                                        cancelEditingOption={() => this.cancelEditingOption()}
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
                {isAddingSection ? (
                    <EditableTextField
                        isEditing={true}
                        isHovered={false}
                        text={""}
                        beginEditing={() => {}}
                        cancelEditing={() => {}}
                        save={(_, text: string) => this.addSection(text)}
                        deleteText={() => {}}
                    />
                ) : null}
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
    addOption: (option: Option) => dispatch(addOption(option)),
    addSection: (section: Section) => dispatch(addSection(section))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Interests))
