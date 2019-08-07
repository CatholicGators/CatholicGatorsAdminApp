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
    Button,
    Checkbox
} from '@material-ui/core'
import {
    getInterests,
    addOption,
    addSection,
    NewOptionReq,
    SectionReq,
    updateOptionText
} from '../../../../redux/actions/contactForm/interestActions';
import AddableTextField from './components/AddableTextField/AddableTextField';
import EditableOptionRow from './components/EditableOptionRow/EditableOptionRow';
import { Section } from '../../../../services/interestsService';

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
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    addSectionWrapper: {
        margin: `${theme.spacing.unit * 3}px`
    }
})

export type Props = {
    classes: any,
    interests: Section[]
    getInterests: () => void,
    updateOptionText: (optionId: string, newText: string) => void,
    addOption: (sectionId: string, option: NewOptionReq) => void,
    addSection: (section: SectionReq) => void
}

type State = {
    editingOptionId: any
    addingSectionId: string
    isAddingSection: boolean
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
            position: this.props.interests.length,
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

    saveOption(optionId: string, newText: string) {
        this.props.updateOptionText(optionId, newText)
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
        this.props.addOption(sectionId, {
            text
        })
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
                                        saveOption={(optionId, newText) => this.saveOption(optionId, newText)}
                                        cancelEditingOption={() => this.cancelEditingOption()}
                                    />
                                )}
                                <div className={classes.row}>
                                    {addingSectionId === section.id ? (
                                        <Checkbox
                                            className={classes.checkbox}
                                            color='primary'
                                        />
                                    ) : null}
                                    <AddableTextField
                                        isAdding={addingSectionId === section.id}
                                        beginAdding={() => this.beginAddingOption(section.id)}
                                        cancelAdding={() => this.cancelAddingOption()}
                                        onAdd={text => this.addOption(section.id, text)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={classes.formLoadingContainer}>
                        <CircularProgress size="60px" />
                    </div>
                )}
                {isAddingSection ? (
                    <div className={classes.addSectionWrapper}>
                        <AddableTextField
                            isAdding={true}
                            beginAdding={() => {}}
                            cancelAdding={() => {}}
                            onAdd={text => this.addSection(text)}
                        />
                    </div>
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
    updateOptionText: (optionId: string, newText: string) => dispatch(updateOptionText(optionId, newText)),
    addOption: (sectionId: string, option: NewOptionReq) => dispatch(addOption(sectionId, option)),
    addSection: (section: SectionReq) => dispatch(addSection(section))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Interests))
