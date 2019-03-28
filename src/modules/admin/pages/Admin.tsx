import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Avatar,
  Switch,
  Toolbar,
  Typography
} from '@material-ui/core';

import {
  getUsers,
  updateUser
} from '../../../redux/actions/admin/adminActions';

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
  classes: any
  users: any
  getUsers: () => any,
  updateUser: (user) => any
}

export class Admin extends Component<Props> {
  componentDidMount() {
    this.props.getUsers()
  }

  handleAdminToggle(user, checked) {
    this.props.updateUser({
      ...user,
      isAdmin: checked
    })
  }

  render() {
    const { classes, users } = this.props;

    return (
      <div className={classes ? classes.tableWrapper : null}>
        <Paper className={classes ? classes.tableCard : null}>
          <Toolbar>
            <Typography variant="h6">
              Users
            </Typography>
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile Pic</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users ? users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar src={user.photoURL} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Switch checked={user.isApproved} />
                  </TableCell>
                  <TableCell>
                    <Switch
                      disabled={!user.isApproved}
                      checked={user.isAdmin}
                      onChange={(_, checked) => this.handleAdminToggle(user, checked)}
                    />
                  </TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  updateUser: user => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin))
