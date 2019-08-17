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
    OutlinedInput,
    Button
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

class PersonalInformation extends React.Component<any, any> {

  state = {
    yearWidth: 120,
    phoneNumberWidth: 110
  };

  constructor(public props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const handleChange = this.props.handleChange;

    return (
      <React.Fragment>
        <form onSubmit={this.props.handleNext}>
            <TextField
                id="first-name"
                label="First Name"
                className={classes.field}
                value={this.props.data.firstName}
                onChange={handleChange('firstName')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="last-name"
                label="Last Name"
                className={classes.field}
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
                className={classes.fieldSmaller}
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
            <TextField
                id="school"
                select
                label="School"
                className={classes.fieldSmaller}
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
            <FormControl
                id="phone-number"
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
            >
                <InputLabel htmlFor="phone-number">
                    Phone number
                </InputLabel>
                <OutlinedInput
                    id="phone-number"
                    value={this.props.data.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    inputComponent={PhoneNumberTextMask as any}
                    labelWidth={this.state.phoneNumberWidth}
                    required
                />
            </FormControl>
            <TextField
                id="email"
                label="Email"
                className={classes.fieldLarger}
                value={this.props.data.email}
                onChange={handleChange('email')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="housing-complex"
                label="Name of Dorm/Complex"
                className={classes.fieldLarger}
                value={this.props.data.housingComplex}
                onChange={handleChange('housingComplex')}
                margin="normal"
                variant="outlined"
            ></TextField>
            <FormControl
                id="graduation-year"
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
            >
                <InputLabel htmlFor="graduation-year">
                    Graduation Year
                </InputLabel>
                <OutlinedInput
                    id="graduationYear"
                    value={this.props.data.graduationYear}
                    onChange={handleChange('graduationYear')}
                    inputComponent={YearTextMask as any}
                    labelWidth={this.state.yearWidth}
                    required
                />
            </FormControl>
            <TextField
                id="graduationSemester"
                select
                label="Graduation Semester"
                className={classes.field}
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
            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                > Next </Button>
            </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PersonalInformation);
