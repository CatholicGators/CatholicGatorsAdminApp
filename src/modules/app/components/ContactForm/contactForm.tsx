import React from 'react';
import MaskedInput from 'react-text-mask';

import {  
  MenuItem, 
  TextField, 
  withStyles,
  createStyles
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
    },
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

class ContactForm extends React.Component {
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
    parent: {
      name: '',
      phone: '',
      email: ''
    }
  };

  constructor(public props: any) {
    super(props)
  }

  handleChange = name => event => {
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
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        
        <TextField 
          id="last-name"
          label="Last Name" 
          className={classes.textField}
          value={this.state.lastName}
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
          onChange={(this.handleChange('gender'))}
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

        <TextField
          id="phone-number"
          label="Phone number"
          className={classes.textField}
          value={this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
          margin="normal"
          variant="outlined"
          required
          >
            <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
          </TextField>

          /** Here lies Graduation year ans semester */

          <TextField
          id="school"
          select
          label="School"
          className={classes.textField}
          value={this.state.gender}
          onChange={(this.handleChange('school'))}
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
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <TextField 
          id="city"
          label="City" 
          className={classes.textField}
          value={this.state.city}
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <TextField 
          id="state"
          label="State" 
          className={classes.textField}
          value={this.state.state}
          margin="normal"
          variant="outlined"
          required
        ></TextField>

        <TextField 
          id="zip-code"
          label="Zip Code" 
          className={classes.textField}
          value={this.state.zipCode}
          margin="normal"
          variant="outlined"
          required
        >
          <MaskedInput mask={[ /\d/, /\d/, /\d/, /\d/, /\d/]} />
        </TextField>

        <TextField 
          id="parent-name"
          label="Parent's Name" 
          className={classes.textField}
          value={this.state.parent.name}
          margin="normal"
          variant="outlined"
        ></TextField>

        <TextField 
          id="parent-phone"
          label="Parent's Phone" 
          className={classes.textField}
          value={this.state.parent.phone}
          margin="normal"
          variant="outlined"
        >
          <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
        </TextField>

        <TextField 
          id="parent-email"
          label="Parent's Email" 
          className={classes.textField}
          value={this.state.parent.email}
          margin="normal"
          variant="outlined"
        ></TextField>

        <TextField 
          id="housing-complex"
          label="Name of Dorm/Complex you live in" 
          className={classes.textField}
          value={this.state.housingComplex}
          margin="normal"
          variant="outlined"
        ></TextField>
        
      </form>
    );
  }
}

export default withStyles(styles)(ContactForm);
