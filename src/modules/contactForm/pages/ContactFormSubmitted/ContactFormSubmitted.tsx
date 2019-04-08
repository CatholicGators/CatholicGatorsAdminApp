import React from 'react'
import { styles } from '../../utils/ContactFormStyles'

import {
  withStyles,
  Typography,
  Paper
} from '@material-ui/core';

class ContactFormSubmitted extends React.Component {

  constructor(public props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Thank you submitting! We will be contacting you soon.
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ContactFormSubmitted);
