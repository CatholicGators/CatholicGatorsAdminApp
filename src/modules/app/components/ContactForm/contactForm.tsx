import React from 'react'
import { 
  PhoneNumberTextMask, 
  ZipCodeTextMask, 
  YearTextMask 
} from './customTextMasks' 

import {  
  MenuItem, 
  TextField, 
  withStyles,
  createStyles,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@material-ui/core';

const styles = createStyles({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: 10,
      marginRight: 10,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
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
    gender: 'Controlled',
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
    labelWidth: 0,
  };

  constructor(public props: any) {
    super(props)
    this.inputLabelRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    console.log(this.inputLabelRef.current.offsetWidth)
    this.setState({
      labelWidth: this.inputLabelRef.current.offsetWidth
    });
  }

  handleChange = (name: string) => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    //Make a network call somewhere
    event.preventDefault();
 }

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField 
          id="first-name"
          label="First Name" 
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        
        <TextField 
          id="last-name"
          label="Last Name" 
          className={classes.textField}
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
          className={classes.textField}
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
          className={classes.formControl} 
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

        {/** Here lies Graduation year ans semester */}

        <FormControl
          id="graduation-year"
          className={classes.formControl} 
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
          className={classes.textField}
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
        className={classes.textField}
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

        <TextField 
          id="permanent-address"
          label="Permanent Address" 
          className={classes.textField}
          value={this.state.permanentAddress}
          onChange={this.handleChange('permanentAddress')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <TextField 
          id="city"
          label="City" 
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <TextField 
          id="state"
          label="State" 
          className={classes.textField}
          value={this.state.state}
          onChange={this.handleChange('state')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <FormControl
          id="zip-code"
          className={classes.formControl} 
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
          className={classes.textField}
          value={this.state.parentName}
          onChange={this.handleChange('parentName')}
          margin="normal"
          variant="outlined"
        ></TextField>

        <FormControl
          id="parent-phone-number"
          className={classes.formControl} 
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
          className={classes.textField}
          value={this.state.parentEmail}
          onChange={this.handleChange('parentEmail')}
          margin="normal"
          variant="outlined"
        ></TextField>

        <TextField 
          id="housing-complex"
          label="Name of Dorm/Complex you live in" 
          className={classes.textField}
          value={this.state.housingComplex}
          onChange={this.handleChange('housingComplex')}
          margin="normal"
          variant="outlined"
        ></TextField>
        
      </form>
    );
  }
}

export default withStyles(styles)(ContactForm);
