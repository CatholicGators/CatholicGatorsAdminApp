import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames';
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
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  OutlinedInput
} from '@material-ui/core'

import {
    getContacts,
    updateContactStatus
} from '../../../../redux/actions/contactForm/contactFormActions'

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
    select: {
        width: '100%',
        borderRadius: 4
    },
    outlinedInput: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    },
    notCalled: {
        background: 'rgb(234, 153, 153, 0.5)'
    },
    needToCall: {
        background: 'rgb(255, 229, 153, 0.5)'
    },
    called: {
        background: 'rgb(182, 215, 168, 0.5)'
    }
})

type Props = {
    history: any,
    user: any,
    classes: any,
    contacts: any,
    getContacts: () => void,
    updateContactStatus: (contact, status) => void
}

export class MyContacts extends Component<Props> {
    componentDidMount() {
        this.props.getContacts()
    }

    goToHome() {
        this.props.history.push('/')
    }

    changeContactStatus(contact, status) {
        this.props.updateContactStatus(contact, status)
    }

    getClassFromStatus(status, classes) {
        if(!classes) {
            return null
        }

        switch(status) {
            case "Called":
                return classes.called
            case "Need to call again":
                return classes.needToCall
            default:
                return classes.notCalled
        }
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
                                    <TableCell>Call Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {contacts.map(contact => (
                                <TableRow hover key={contact.id}>
                                    <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            className={classNames(
                                                classes ? classes.select : null,
                                                this.getClassFromStatus(contact.status, classes)
                                            )}
                                            value={contact.status || "Not called"}
                                            onChange={ev => this.changeContactStatus(contact, ev.target.value)}
                                            input={
                                                <OutlinedInput
                                                    classes={{ input: classes ? classes.outlinedInput : null }}
                                                    labelWidth={0}
                                                />
                                            }
                                        >
                                            <MenuItem value={"Not called"}>Not called</MenuItem>
                                            <MenuItem value={"Need to call again"}>Need to call again</MenuItem>
                                            <MenuItem value={"Called"}>Called</MenuItem>
                                        </Select>
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
    getContacts: () => dispatch(getContacts()),
    updateContactStatus: (contact, status) => dispatch(updateContactStatus(contact, status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyContacts)))
