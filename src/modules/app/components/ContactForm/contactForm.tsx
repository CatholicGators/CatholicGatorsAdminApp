import React from 'react'
import { 
  PhoneNumberTextMask, 
  ZipCodeTextMask, 
  YearTextMask 
} from './customTextMasks' 
import { connect } from 'react-redux';
import { submitContactForm } from '../../../../redux/actions/contactForm/contactFormActions';

import {  
  MenuItem, 
  TextField, 
  withStyles,
  createStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Button,
  Typography,
  Divider,
  Grid
} from '@material-ui/core';

const styles = createStyles({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    feild: {
      marginLeft: 10,
      marginRight: 10,
      width: 250
    },
    feildSmaller: {
      marginLeft: 10,
      marginRight: 10,
      width: 100
    },
    feildLarger: {
      marginLeft: 10,
      marginRight: 10,
      width: 300
    },
    margins: {
      marginLeft: 10,
      marginRight: 10
    },
    button: {
      marginLeft: 10,
      marginRight: 10
    }
});

const genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

const schools = [
  {
    value: 'UF',
    label: 'UF',
  },
  {
    value: 'SFC',
    label: 'SFC',
  },
];

const semester = [
  {
    value: 'Spring',
    label: 'Spring',
  },
  {
    value: 'Summer',
    label: 'Summer',
  },
  {
    value: 'Fall',
    label: 'Fall',
  },
];

class ContactForm extends React.Component {
  private inputLabelRef: React.RefObject<HTMLDivElement>

  state = {
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
    labelWidth: 0
  };

  constructor(public props: any) {
    super(props)
    this.inputLabelRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.setState({
      labelWidth: this.inputLabelRef.current.offsetWidth
    });
  }

  handleChange = (name: string) => event => {
    if(event.target.type === "checkbox") {
      this.setState({
        [name]: event.target.checked,
      });
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  handleSubmit = (event) => {
    this.props.submitContactForm(this.state);
 }

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Typography variant="h5" component="h3" className={classes.margin}>
	        Personal information
        </Typography>
        <TextField 
          id="first-name"
          label="First Name" 
          className={classes.feild}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="last-name"
          label="Last Name" 
          className={classes.feild}
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField
          id="gender"
          select
          label="Gender"
          className={classes.feildSmaller}
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          margin="normal"
          variant="outlined"
          required
          >
          {genders.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl
          id="phone-number"
          className={classes.feild} 
          variant="outlined" 
          margin="normal"
          required
        >
          <div ref={this.inputLabelRef}>
            <InputLabel 
              htmlFor="phone-number"
            >Phone number</InputLabel>
          </div>
          <OutlinedInput
            id="phone-number"
            value={this.state.phoneNumber}
            onChange={this.handleChange('phoneNumber')}
            inputComponent={PhoneNumberTextMask as any}
            labelWidth={this.state.labelWidth}
            onClick={this.focusTextInput}
            required
          />
        </FormControl>
        <TextField 
          id="email"
          label="Email" 
          className={classes.feild}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="housing-complex"
          label="Name of Dorm/Complex you live in" 
          className={classes.feildLarger}
          value={this.state.housingComplex}
          onChange={this.handleChange('housingComplex')}
          margin="normal"
          variant="outlined"
        ></TextField>
        <br/>
        <Divider variant="middle" />
        <br/>
        <Typography variant="h5" component="h3" className={classes.margin}>
	        Academic information
        </Typography>
        <FormControl
          id="graduation-year"
          className={classes.feild} 
          variant="outlined" 
          margin="normal"
          required
        >
          <div ref={this.inputLabelRef}>
            <InputLabel
              htmlFor="graduation-year"
            >Graduation Year</InputLabel>
          </div>
          <OutlinedInput
            id="graduation-year"
            value={this.state.graduationYear}
            onChange={this.handleChange('graduationYear')}
            inputComponent={YearTextMask as any}
            labelWidth={this.state.labelWidth}
            onClick={this.focusTextInput}
            required
          />
        </FormControl>
        <TextField
          id="graduation-semester"
          select
          label="Graduation Semester"
          className={classes.feild}
          value={this.state.graduationSemester}
          onChange={this.handleChange('graduationSemester')}
          margin="normal"
          variant="outlined"
          required
          >
          {semester.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        id="school"
        select
        label="School"
        className={classes.feildSmaller}
        value={this.state.school}
        onChange={this.handleChange('school')}
        margin="normal"
        variant="outlined"
        required
        >
          {schools.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br/>
        <Divider variant="middle" />
        <br/>
        <Typography variant="h5" component="h3" className={classes.margin}>
	        Parent's information
        </Typography>
        <TextField 
          id="permanent-address"
          label="Permanent Address" 
          className={classes.feild}
          value={this.state.permanentAddress}
          onChange={this.handleChange('permanentAddress')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="city"
          label="City" 
          className={classes.feild}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="state"
          label="State" 
          className={classes.feildSmaller}
          value={this.state.state}
          onChange={this.handleChange('state')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <FormControl
          id="zip-code"
          className={classes.feild} 
          variant="outlined" 
          margin="normal"
          required
        >
          <div ref={this.inputLabelRef}>
            <InputLabel
              htmlFor="zip-code"
            >Zip Code</InputLabel>
          </div>
          <OutlinedInput
            id="zip-code"
            value={this.state.zipCode}
            onChange={this.handleChange('zipCode')}
            inputComponent={ZipCodeTextMask as any}
            labelWidth={this.state.labelWidth}
            onClick={this.focusTextInput}
            required
          />
        </FormControl>
        <TextField 
          id="parent-name"
          label="Parent's Name" 
          className={classes.feild}
          value={this.state.parentName}
          onChange={this.handleChange('parentName')}
          margin="normal"
          variant="outlined"
        ></TextField>
        <FormControl
          id="parent-phone-number"
          className={classes.feild} 
          variant="outlined" 
          margin="normal"
        >
          <div ref={this.inputLabelRef}>
            <InputLabel
              htmlFor="parent-phone-number"
            >Parent's phone number</InputLabel>
          </div>
          <OutlinedInput
            id="parent-phone-number"
            value={this.state.parentPhone}
            onChange={this.handleChange('parentPhone')}
            inputComponent={PhoneNumberTextMask as any}
            labelWidth={this.state.labelWidth}
            onClick={this.focusTextInput}
          />
        </FormControl>
        <TextField 
          id="parent-email"
          label="Parent's Email" 
          className={classes.feild}
          value={this.state.parentEmail}
          onChange={this.handleChange('parentEmail')}
          margin="normal"
          variant="outlined"
        ></TextField>
        <br/>
        <Divider variant="middle" />
        <br/>
        <Typography variant="h5" component="h3" className={classes.margin}>
	        Your interests
        </Typography>
        <br/>
        <FormLabel>I am interested in...</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                checked={this.state.eventsGreekStudents} 
                onChange={this.handleChange('eventsGreekStudents')} 
                value="eventsGreekStudents"
              ></Checkbox>
            }
            label="events for Greek students"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={this.state.eventsLatinoStudents} 
                onChange={this.handleChange('eventsLatinoStudents')} 
                value="eventsLatinoStudents" 
              ></Checkbox>
            }
            label="events for Latino/a students"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={this.state.eventsGraduateStudents} 
                onChange={this.handleChange('eventsGraduateStudents')} 
                value="eventsGraduateStudents" 
              ></Checkbox>
            }
            label="events for graduate students"
          />
        </FormGroup>
        <br/>
        <FormLabel className={classes.margins}>I would like to...</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                checked={this.state.receiveMonthlyNewsletter} 
                onChange={this.handleChange('receiveMonthlyNewsletter')} 
                value="receiveMonthlyNewsletter"
              ></Checkbox>
            }
            label="receive the monthly e-newsletter"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={this.state.registerAsParishioner} 
                onChange={this.handleChange('registerAsParishioner')} 
                value="registerAsParishioner"
              ></Checkbox>
            }
            label="register as a parishioner"
          />
        </FormGroup>
        <br/>
        <FormLabel className={classes.margins}>I am interested in getting involved in...</FormLabel>
        <FormGroup>
          <Grid container direction="row">
            <Grid item className={classes.margins}>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.englishBibleStudy} 
                      onChange={this.handleChange('englishBibleStudy')} 
                      value="englishBibleStudy"
                    ></Checkbox>
                  }
                  label="English Bible Studys"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.spanishBibleStudy} 
                      onChange={this.handleChange('spanishBibleStudy')} 
                      value="spanishBibleStudy"
                    ></Checkbox>
                  }
                  label="Spanish/Bilingual Bible Study"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.freeFood} 
                      onChange={this.handleChange('freeFood')} 
                      value="freeFood"
                    ></Checkbox>
                  }
                  label="Free Food"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.guestSpeakers} 
                      onChange={this.handleChange('guestSpeakers')} 
                      value="guestSpeakers"
                    ></Checkbox>
                  }
                  label="Guest Speakers"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.musicMinistry} 
                      onChange={this.handleChange('musicMinistry')} 
                      value="musicMinistry"
                    ></Checkbox>
                  }
                  label="Music Ministry"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.socials} 
                      onChange={this.handleChange('socials')} 
                      value="socials"
                    ></Checkbox>
                  }
                  label="Socials"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.retreats} 
                      onChange={this.handleChange('retreats')} 
                      value="retreats"
                    ></Checkbox>
                  }
                  label="Retreats"
                />
              </Grid>
            </Grid>
            <Grid item className={classes.margins}>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.intramuralSports} 
                      onChange={this.handleChange('intramuralSports')} 
                      value="intramuralSports"
                    ></Checkbox>
                  }
                  label="Intramural Sports"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.proLifeClub} 
                      onChange={this.handleChange('proLifeClub')} 
                      value="proLifeClub"
                    ></Checkbox>
                  }
                  label="Pro-Life Club"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.RHC} 
                      onChange={this.handleChange('RHC')} 
                      value="RHC"
                    ></Checkbox>
                  }
                  label="Communications (Photo, Print, Graphics, PR, Advertising, and Video)"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.servingAtMass} 
                      onChange={this.handleChange('servingAtMass')} 
                      value="servingAtMass"
                    ></Checkbox>
                  }
                  label="Serving at Mass"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.teachReligiousEd} 
                      onChange={this.handleChange('teachReligiousEd')} 
                      value="teachReligiousEd"
                    ></Checkbox>
                  }
                  label="Teach Religious Education"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={this.state.serviceProjects} 
                      onChange={this.handleChange('serviceProjects')} 
                      value="serviceProjects"
                    ></Checkbox>
                  }
                  label="Service Projects and Trips"
                />
              </Grid>
            </Grid>
          </Grid>
        </FormGroup>
        <br/>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          type="submit"
        > Submit </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.contactForm.loading,
  success: state.contactForm.success,
  errorMessage: state.contactForm.errorMessage
});

const mapDispatchToProps = dispatch => ({
  submitContactForm: form => dispatch(submitContactForm(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactForm));
