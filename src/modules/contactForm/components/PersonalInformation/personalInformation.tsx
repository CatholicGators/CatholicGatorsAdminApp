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
    value: '',
    label: '',
  },
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
                onChange={(e) => handleChange(e, 'firstName')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="last-name"
                label="Last Name"
                className={classes.field}
                value={this.props.data.lastName}
                onChange={(e) => handleChange(e, 'lastName')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="gender"
                select
                required
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                label="Gender"
                className={classes.fieldSmaller}
                value={this.props.data.gender}
                onChange={(e) => handleChange(e, 'gender')}
                margin="normal"
                variant="outlined"
                
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
                required
                SelectProps={{ 
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                label="School"
                className={classes.fieldSmaller}
                value={this.props.data.school}
                onChange={(e) => handleChange(e, 'school')}
                margin="normal"
                variant="outlined"            
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
                    onChange={(e) => handleChange(e, 'phoneNumber')}
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
                onChange={(e) => handleChange(e, 'email')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="housing-complex"
                label="Name of Dorm/Complex"
                className={classes.fieldLarger}
                value={this.props.data.housingComplex}
                onChange={(e) => handleChange(e, 'housingComplex')}
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
                    onChange={(e) => handleChange(e, 'graduationYear')}
                    inputComponent={YearTextMask as any}
                    labelWidth={this.state.yearWidth}
                    required
                />
            </FormControl>
            <TextField
                id="graduationSemester"
                select
                required
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                label="Graduation Semester"
                className={classes.field}
                value={this.props.data.graduationSemester}
                onChange={(e) => handleChange(e, 'graduationSemester')}
                margin="normal"
                variant="outlined"
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
