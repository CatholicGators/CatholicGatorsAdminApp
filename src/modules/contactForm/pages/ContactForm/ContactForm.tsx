import React from 'react'
import { connect } from 'react-redux';

import PersonalInformation from '../../components/PersonalInformation/personalInformation'
import ParentsInformation from '../../components/ParentsInformation/parentsInformation'
import Interests from '../../components/Interests/interests'
import { submitContactForm } from '../../../../redux/actions/contactForm/contactFormActions';
import { styles } from '../../utils/ContactFormStyles'
import { steps, filterState } from '../../utils/ContactFormUtils'

import {
  withStyles,
  Button,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel
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

class ContactForm extends React.Component<any, any> {

  constructor(public props: any) {
    super(props)
    this.state = initState;
  }

  handleChange = (name: string) => event => {
    if(event.target.type === "checkbox") {
      this.setState({
        [name]: event.target.checked
      });
    } else {
      this.setState({
          [name]: event.target.value
      });
    }
  };

  handleNext = () => {
    if(this.state.activeStep === steps.length - 1) {
      this.handleReset();
      this.props.submitContactForm(filterState(this.state));
      this.props.history.push('/thank-you')
    } else {
      this.setState((prevState : any) => ({
        activeStep: prevState.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    this.setState((prevState : any) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState(initState);
  };

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
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {getStepContent(activeStep, this.state, this.handleChange)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Submit form' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

function getStepContent(step, state, handleChange) {
  switch (step) {
    case 0:
      return <PersonalInformation data={state} handleChange = {handleChange} />;
    case 1:
      return <ParentsInformation data={state} handleChange = {handleChange} />;
    case 2:
      return <Interests data={state} handleChange = {handleChange} />;
    default:
      throw new Error('Unknown step');
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
