import React, { Component } from 'react'
import { connect } from 'react-redux';

import PersonalInformation from '../../components/PersonalInformation/personalInformation'
import ParentsInformation from '../../components/ParentsInformation/parentsInformation'
import Interests from '../../components/Interests/interests'
import { submitContactForm } from '../../../../redux/actions/contactForm/contactFormActions';
import { styles } from '../../utils/ContactFormStyles'
import { steps, filterState } from '../../utils/ContactFormUtils'

import {
    withStyles,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
    Button
} from '@material-ui/core';

const initState = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    graduationSemester: '',
    graduationYear: '',
    school: '',
    permanentAddress: '',
    city: '',
    state: '',
    zipCode: '',
    housingComplex: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    eventsGreekStudents: false,
    eventsLatinoStudents: false,
    eventsGraduateStudents: false,
    receiveMonthlyNewsletter: false,
    registerAsParishioner: false,
    englishBibleStudy: false,
    spanishBibleStudy: false,
    freeFood: false,
    guestSpeakers: false,
    musicMinistry: false,
    socials: false,
    retreats: false,
    intramuralSports: false,
    proLifeClub: false,
    RHC: false,
    servingAtMass: false,
    teachReligiousEd: false,
    serviceProjects: false,
    activeStep: 0
};

export class ContactForm extends Component<any, any> {
    state = initState

    handleChange = (name: string) => event => {
        if (event.target.type === "checkbox") {
            this.setState({
                [name]: event.target.checked
            });
        } else {
            this.setState({
                [name]: event.target.value
            });
        }
    };

    handleNext() {
        if (this.state.activeStep === (steps.length - 1)) {
            this.props.submitContactForm(filterState(this.state));
        } else {
            this.setState((prevState: any) => ({
                activeStep: prevState.activeStep + 1
            }));
        }
    };

    handleBack() {
        if(this.state.activeStep > 0){
            this.setState((prevState: any) => ({
                activeStep: prevState.activeStep - 1
            }));
        }
    };

    resetStep() {
        this.setState({
            activeStep: 0
        });
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Join Catholic Gators
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel classes={{ label: classes.stepLabel }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {getStepContent(this.state, this.props, this.handleChange, this.handleNext, this.handleBack, this.resetStep.bind(this))}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

function getStepContent(state, props, handleChange, handleNext, handleBack, resetStep) {
    if(props.loading) {
        return <CircularProgress id='spinner' className={props.classes.spinner} />
    } else if (props.success === true) {
        return (
            <React.Fragment>
                <Typography component="h1" variant="h6" className={props.classes.margins}>
                    Thank you for submitting! We will be contacting you soon.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    className={props.classes.button}
                > Back to form </Button>
            </React.Fragment>
        )
    } else if (props.success === false) {
        return (
            <React.Fragment>
                <Typography component="h1" variant="h6" className={props.classes.margins}>
                    There was an error submitting. Please try again later.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    className={props.classes.button}
                > Back to form </Button>
            </React.Fragment>
        )
    } else {
        switch (state.activeStep) {
            case 0:
                return <PersonalInformation data={state} handleChange={handleChange} handleNext={handleNext} />;
            case 1:
                return <ParentsInformation data={state} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />;
            case 2:
                return <Interests data={state} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />;
            default:
                resetStep();
        }
    }
}

const mapDispatchToProps = dispatch => ({
    submitContactForm: form => dispatch(submitContactForm(form))
});

const mapStateToProps = state => ({
    loading: state.contactForm.loading,
    success: state.contactForm.success,
    errorMessage: state.contactForm.errorMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactForm));
