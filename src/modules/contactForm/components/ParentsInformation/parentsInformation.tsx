import React from "react";
import { PhoneNumberTextMask } from '../CustomTextMasks/phoneNumberTextMask'
import { ZipCodeTextMask } from '../CustomTextMasks/zipCodeTextMask'
import { styles } from '../../utils/ContactFormStyles'

import {
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button
} from "@material-ui/core";

class ParentsInformation extends React.Component {

  constructor(public props: any) {
    super(props)
  }

  state = {
    zipCodeWidth: 75,
    phoneNumberWidth: 165
  }

  render() {
    const { classes } = this.props;
    const handleChange = this.props.handleChange;

    return (
      <React.Fragment>
        <form onSubmit={this.props.handleNext}>
            <TextField
                id="permanent-address"
                label="Permanent Address"
                className={classes.fieldLarger}
                value={this.props.data.permanentAddress}
                onChange={handleChange('permanentAddress')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="city"
                label="City"
                className={classes.field}
                value={this.props.data.city}
                onChange={handleChange('city')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <TextField
                id="state"
                label="State"
                className={classes.fieldSmaller}
                value={this.props.data.state}
                onChange={handleChange('state')}
                margin="normal"
                variant="outlined"
                required
            ></TextField>
            <FormControl
                id="zip-code"
                className={classes.fieldSmaller}
                variant="outlined"
                margin="normal"
                required
            >
                <InputLabel htmlFor="zip-code">
                        Zip Code
                </InputLabel>
                <OutlinedInput
                    id="zip-code"
                    value={this.props.data.zipCode}
                    onChange={handleChange('zipCode')}
                    inputComponent={ZipCodeTextMask as any}
                    labelWidth={this.state.zipCodeWidth}
                    required
                />
            </FormControl>
            <TextField
                id="parent-name"
                label="Parent's Name"
                className={classes.field}
                value={this.props.data.parentName}
                onChange={handleChange('parentName')}
                margin="normal"
                variant="outlined"
            ></TextField>
            <FormControl
                id="parent-phone-number"
                className={classes.field}
                variant="outlined"
                margin="normal"
            >
                <InputLabel htmlFor="parent-phone-number">
                    Parent's phone number
                </InputLabel>
                <OutlinedInput
                    id="parent-phone-number"
                    value={this.props.data.parentPhone}
                    onChange={handleChange('parentPhone')}
                    inputComponent={PhoneNumberTextMask as any}
                    labelWidth={this.state.phoneNumberWidth}
                />
            </FormControl>
            <TextField
                id="parent-email"
                label="Parent's Email"
                className={classes.field}
                value={this.props.data.parentEmail}
                onChange={handleChange('parentEmail')}
                margin="normal"
                variant="outlined"
            ></TextField>
            <div className={classes.buttons}>
                <Button
                    onClick={this.props.handleBack}
                    className={classes.button}
                > Back </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                > Next </Button>
              </div>
        </form>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ParentsInformation);
