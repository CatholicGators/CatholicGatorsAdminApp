import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    NewSectionReq,
    updateOptionText
} from '../../../../redux/actions/contactForm/interestActions'
import AddableTextField from './components/AddableTextField/AddableTextField'
import EditableOptionRow from './components/EditableOptionRow/EditableOptionRow'
import { Section } from '../../../../services/interestsService'

export const styles = (theme: Theme) =>
    createStyles({
        formWrapper: {
            width: 600
        },
        form: {
            margin: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
        },
        formLoadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px'
        },
        addSectionBtn: {
            marginLeft: 'auto'
        },
        row: {
            display: 'flex',
            alignItems: 'center'
        },
        addSectionWrapper: {
            margin: `${theme.spacing(3)}px`
        }
    })

export type Props = {
    classes: any
    interests: Section[]
    getInterests: () => void
    updateOptionText: (optionId: string, newText: string) => void
    addOption: (sectionId: string, option: NewOptionReq) => void
    addSection: (section: NewSectionReq) => void
}

type State = {
    editingOptionId: any
    addingSectionId: string
    isAddingSection: boolean
}

export const defaultState = {
    editingOptionId: null,
    addingSectionId: null,
    isAddingSection: false
}

export class Interests extends Component<Props, State> {
    state = defaultState

    componentDidMount() {
        this.props.getInterests()
    }

    beginAddingSection() {
        this.setState({
            ...defaultState,
            isAddingSection: true
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
            ...defaultState,
            editingOptionId: optionId
        })
    }

    cancelEditingOption() {
        this.setState(defaultState)
    }

    deleteOption(sectionId: string, optionId: any) {
        this.setState(defaultState)
    }

    saveOption(optionId: string, newText: string) {
        this.props.updateOptionText(optionId, newText)
        this.setState(defaultState)
    }

    beginAddingOption(sectionId: string) {
        this.setState({
            ...defaultState,
            addingSectionId: sectionId
        })
    }

    cancelAddingOption() {
        this.setState(defaultState)
    }

    addOption(sectionId: string, text: string) {
        this.props.addOption(sectionId, {
            text
        })
        this.setState(defaultState)
    }

    render() {
        const { classes, interests } = this.props
        const { addingSectionId, editingOptionId, isAddingSection } = this.state
        return (
            <Paper className={classes.formWrapper}>
                <Toolbar>
                    <Typography variant="h6">
                        Edit Interests step of form
                    </Typography>
                    <Button
                        id="add-section-btn"
                        variant="outlined"
                        color="primary"
                        className={classes.addSectionBtn}
                        onClick={() => this.beginAddingSection()}
                    >
                        Add Section
                    </Button>
                </Toolbar>
                {interests ? (
                    <div className={classes.form}>
                        {interests.map(section => (
                            <div id="section" key={section.id}>
                                <Typography>{section.text}</Typography>
                                {section.options.map(option => (
                                    <EditableOptionRow
                                        key={option.id}
                                        option={option}
                                        editingOptionId={editingOptionId}
                                        beginEditingOption={optionId =>
                                            this.beginEditingOption(optionId)
                                        }
                                        deleteOption={optionId =>
                                            this.deleteOption(
                                                section.id,
                                                optionId
                                            )
                                        }
                                        saveOption={(optionId, newText) =>
                                            this.saveOption(optionId, newText)
                                        }
                                        cancelEditingOption={() =>
                                            this.cancelEditingOption()
                                        }
                                    />
                                ))}
                                <div id="add-option" className={classes.row}>
                                    {addingSectionId === section.id ? (
                                        <Checkbox
                                            className={classes.checkbox}
                                            color="primary"
                                        />
                                    ) : null}
                                    <AddableTextField
                                        isAdding={
                                            addingSectionId === section.id
                                        }
                                        beginAdding={() =>
                                            this.beginAddingOption(section.id)
                                        }
                                        cancelAdding={() =>
                                            this.cancelAddingOption()
                                        }
                                        onAdd={text =>
                                            this.addOption(section.id, text)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={classes.formLoadingContainer}>
                        <CircularProgress size="60px" />
                    </div>
                )}
                {isAddingSection ? (
                    <div
                        id="add-section-input"
                        className={classes.addSectionWrapper}
                    >
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
    interests: state.contact.interests
})

const mapDispatchToProps = dispatch => ({
    getInterests: () => dispatch(getInterests()),
    updateOptionText: (optionId: string, newText: string) =>
        dispatch(updateOptionText(optionId, newText)),
    addOption: (sectionId: string, option: NewOptionReq) =>
        dispatch(addOption(sectionId, option)),
    addSection: (section: NewSectionReq) => dispatch(addSection(section))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Interests))
