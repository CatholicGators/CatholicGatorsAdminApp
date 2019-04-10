import React from "react";
import { styles } from '../../utils/ContactFormStyles'

import {
  withStyles,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Grid,
  Button
} from '@material-ui/core';

class Interests extends React.Component {
  constructor(public props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const handleChange = this.props.handleChange;

    return (
      <React.Fragment>
        <form onSubmit={this.props.handleNext}>
            <FormLabel>I am interested in...</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox
                    checked={this.props.data.eventsGreekStudents}
                    onChange={handleChange('eventsGreekStudents')}
                    value="eventsGreekStudents"
                ></Checkbox>
                }
                label="events for Greek students"
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={this.props.data.eventsLatinoStudents}
                    onChange={handleChange('eventsLatinoStudents')}
                    value="eventsLatinoStudents"
                ></Checkbox>
                }
                label="events for Latino/a students"
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={this.props.data.eventsGraduateStudents}
                    onChange={handleChange('eventsGraduateStudents')}
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
                    checked={this.props.data.receiveMonthlyNewsletter}
                    onChange={handleChange('receiveMonthlyNewsletter')}
                    value="receiveMonthlyNewsletter"
                ></Checkbox>
                }
                label="receive the monthly e-newsletter"
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={this.props.data.registerAsParishioner}
                    onChange={handleChange('registerAsParishioner')}
                    value="registerAsParishioner"
                ></Checkbox>
                }
                label="register as a parishioner"
            />
            </FormGroup>
            <br/>
            <FormLabel className={classes.margins}>
            I am interested in getting involved in...
            </FormLabel>
            <FormGroup>
            <Grid container direction="row">
                <Grid item className={classes.margins}>
                <Grid container direction="column">
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.englishBibleStudy}
                        onChange={handleChange('englishBibleStudy')}
                        value="englishBibleStudy"
                        ></Checkbox>
                    }
                    label="English Bible Studys"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.spanishBibleStudy}
                        onChange={handleChange('spanishBibleStudy')}
                        value="spanishBibleStudy"
                        ></Checkbox>
                    }
                    label="Spanish/Bilingual Bible Study"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.freeFood}
                        onChange={handleChange('freeFood')}
                        value="freeFood"
                        ></Checkbox>
                    }
                    label="Free Food"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.guestSpeakers}
                        onChange={handleChange('guestSpeakers')}
                        value="guestSpeakers"
                        ></Checkbox>
                    }
                    label="Guest Speakers"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.musicMinistry}
                        onChange={handleChange('musicMinistry')}
                        value="musicMinistry"
                        ></Checkbox>
                    }
                    label="Music Ministry"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.socials}
                        onChange={handleChange('socials')}
                        value="socials"
                        ></Checkbox>
                    }
                    label="Socials"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.retreats}
                        onChange={handleChange('retreats')}
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
                        checked={this.props.data.intramuralSports}
                        onChange={handleChange('intramuralSports')}
                        value="intramuralSports"
                        ></Checkbox>
                    }
                    label="Intramural Sports"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.proLifeClub}
                        onChange={handleChange('proLifeClub')}
                        value="proLifeClub"
                        ></Checkbox>
                    }
                    label="Pro-Life Club"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.RHC}
                        onChange={handleChange('RHC')}
                        value="RHC"
                        ></Checkbox>
                    }
                    label="Communications (Photo, Print, Graphics, PR, Advertising, and Video)"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.servingAtMass}
                        onChange={handleChange('servingAtMass')}
                        value="servingAtMass"
                        ></Checkbox>
                    }
                    label="Serving at Mass"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.teachReligiousEd}
                        onChange={handleChange('teachReligiousEd')}
                        value="teachReligiousEd"
                        ></Checkbox>
                    }
                    label="Teach Religious Education"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.props.data.serviceProjects}
                        onChange={handleChange('serviceProjects')}
                        value="serviceProjects"
                        ></Checkbox>
                    }
                    label="Service Projects and Trips"
                    />
                </Grid>
                </Grid>
            </Grid>
            </FormGroup>
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
                > Submit form </Button>
              </div>
        </form>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Interests);
