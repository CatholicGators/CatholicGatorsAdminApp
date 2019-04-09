import React from "react";
import { PhoneNumberTextMask } from '../CustomTextMasks/phoneNumberTextMask'
import { ZipCodeTextMask } from '../CustomTextMasks/zipCodeTextMask'
import { styles } from '../../utils/ContactFormStyles'

import { 
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";

class ParentsInformation extends React.Component {
  private inputLabelRef: React.RefObject<HTMLDivElement>

  constructor(public props: any) {
    super(props)
    this.inputLabelRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  state = {
    labelWidth: 0
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
        <TextField 
          id="permanent-address"
          label="Permanent Address" 
          className={classes.feild}
          value={this.props.data.permanentAddress}
          onChange={handleChange('permanentAddress')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="city"
          label="City" 
          className={classes.feild}
          value={this.props.data.city}
          onChange={handleChange('city')}
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField 
          id="state"
          label="State" 
          className={classes.feildSmaller}
          value={this.props.data.props}
          onChange={handleChange('state')}
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
            value={this.props.data.zipCode}
            onChange={handleChange('zipCode')}
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
          value={this.props.data.parentName}
          onChange={handleChange('parentName')}
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
            value={this.props.data.parentPhone}
            onChange={handleChange('parentPhone')}
            inputComponent={PhoneNumberTextMask as any}
            labelWidth={this.state.labelWidth}
            onClick={this.focusTextInput}
          />
        </FormControl>
        <TextField 
          id="parent-email"
          label="Parent's Email" 
          className={classes.feild}
          value={this.props.data.parentEmail}
          onChange={handleChange('parentEmail')}
          margin="normal"
          variant="outlined"
        ></TextField>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ParentsInformation);
