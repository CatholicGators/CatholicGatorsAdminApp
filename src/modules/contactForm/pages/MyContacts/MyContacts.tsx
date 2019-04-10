import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getContacts } from '../../../../redux/actions/contactForm/contactFormActions'
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
  Checkbox
} from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  tableWrapper: {
    maxWidth: '1000px',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tableCard: {
    overflowX: 'auto'
  }
})

type Props = {
    classes: any,
    contacts: any,
    getContacts: () => void
}

export class MyContacts extends Component<Props> {
    componentDidMount() {
        this.props.getContacts()
    }

    render() {
        const { classes, contacts } =  this.props
    
        return (
            <div className={classes ? classes.tableWrapper : null}>
                <Paper className={classes ? classes.tableCard : null}>
                    <Toolbar>
                        <Typography variant="h6">
                            My Contacts
                        </Typography>
                    </Toolbar>
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
                        {contacts ? contacts.map(contact => (
                            <TableRow hover key={contact.id}>
                                <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                                <TableCell>{contact.phoneNumber}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                    <Checkbox checked={contact.called} />
                                </TableCell>
                            </TableRow>
                        )) : null}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contactForm.contacts
})

const mapDispatchToProps = dispatch => ({
    getContacts: () => dispatch(getContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyContacts))
