import React from "react";
import { PhoneNumberTextMask } from '../CustomTextMasks/phoneNumberTextMask'
import { YearTextMask } from '../CustomTextMasks/yearTextMask'
import { styles } from '../../utils/ContactFormStyles'

import { 
    withStyles,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@material-ui/core";

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

class PersonalInformation extends React.Component {
  private inputLabelRef: React.RefObject<HTMLDivElement>

  state = { 
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

  render() {
    const { classes } = this.props;
    const handleChange = this.props.handleChange;

    return (
      <React.Fragment>
        <form>
          <TextField 
            id="first-name"
            label="First Name" 
            className={classes.feild}
            value={this.props.data.firstName}
            onChange={handleChange('firstName')}
            margin="normal"
            variant="outlined"
            required
          ></TextField>
          <TextField 
            id="last-name"
            label="Last Name" 
            className={classes.feild}
            value={this.props.data.lastName}
            onChange={handleChange('lastName')}
            margin="normal"
            variant="outlined"
            required
          ></TextField>
          <TextField
            id="gender"
            select
            label="Gender"
            className={classes.feildSmaller}
            value={this.props.data.gender}
            onChange={handleChange('gender')}
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
              value={this.props.data.phoneNumber}
              onChange={handleChange('phoneNumber')}
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
            value={this.props.data.email}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
            required
          ></TextField>
          <TextField 
            id="housing-complex"
            label="Name of Dorm/Complex you live in" 
            className={classes.feildLarger}
            value={this.props.data.housingComplex}
            onChange={handleChange('housingComplex')}
            margin="normal"
            variant="outlined"
          ></TextField>
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
              id="graduationYear"
              value={this.props.data.graduationYear}
              onChange={handleChange('graduationYear')}
              inputComponent={YearTextMask as any}
              labelWidth={this.state.labelWidth}
              onClick={this.focusTextInput}
              required
            />
          </FormControl>
          <TextField
            id="graduationSemester"
            select
            label="Graduation Semester"
            className={classes.feild}
            value={this.props.data.graduationSemester}
            onChange={handleChange('graduationSemester')}
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
          value={this.props.data.school}
          onChange={handleChange('school')}
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
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PersonalInformation);
