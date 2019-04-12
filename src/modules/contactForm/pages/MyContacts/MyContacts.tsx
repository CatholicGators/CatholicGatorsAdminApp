import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Theme,
  createStyles,
  withStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  Typography,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@material-ui/core'

import { getContacts } from '../../../../redux/actions/contactForm/contactFormActions'

const styles = (theme: Theme) => createStyles({
  tableWrapper: {
    maxWidth: '1000px',
    margin: '50px auto'
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  tableCard: {
    overflowX: 'auto'
  },
  tableLoadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
})

type Props = {
    history: any,
    user: any,
    classes: any,
    contacts: any,
    getContacts: () => void
}

export class MyContacts extends Component<Props> {
    componentDidMount() {
        this.props.getContacts()
    }

    goToHome() {
        this.props.history.push('/')
    }

    render() {
        const { classes, contacts, user } =  this.props
    
        return user && user.isApproved ? (
            <div className={classes ? classes.tableWrapper : null}>
                <Paper className={classes ? classes.tableCard : null}>
                    <Toolbar>
                        <Typography variant="h6">
                            My Contacts
                        </Typography>
                    </Toolbar>
                    {contacts ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Called</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {contacts.map(contact => (
                                <TableRow hover key={contact.id}>
                                    <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={contact.called} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    :
                        <div id='loading-spinner' className={classes ? classes.tableLoadingContainer : null}>
                            <CircularProgress size="60px" />
                        </div>
                    }
                </Paper>
            </div>
        ) : (
            <div className={classes ? classes.cardWrapper : null}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            You are not approved
                        </Typography>
                        <Typography component="p">
                            Please seek approval from an admin
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => this.goToHome()}>Ok</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactForm.contacts,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getContacts: () => dispatch(getContacts())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyContacts)))
