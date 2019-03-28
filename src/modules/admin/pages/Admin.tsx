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
  Typography,
  CircularProgress
} from '@material-ui/core';

import {
  getUsers,
  updateUser
} from '../../../redux/actions/admin/adminActions';

const styles = (theme: Theme) => createStyles({
  tableWrapper: {
    maxWidth: '1000px',
    margin: '50px auto',
  },
  tableCard: {
    overflowX: 'auto',
    margin: `0 ${theme.spacing.unit}px`
  },
  tableLoadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  hiddenColxs: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  hiddenColsm: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  profilePicCol: {
    paddingRight: theme.spacing.unit * 2
  },
  emailCol: {
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
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

  handleApprovedToggle(user, checked) {
    this.props.updateUser({
      ...user,
      data: {
        ...user.data,
        isApproved: checked
      }
    })
  }

  handleAdminToggle(user, checked) {
    this.props.updateUser({
      ...user,
      data: {
        ...user.data,
        isAdmin: checked
      }
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
            {users ? 
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes ? classes.profilePicCol : null}>Profile Pic</TableCell>
                    <TableCell className={classes ? classes.hiddenColsm : null}>Name</TableCell>
                    <TableCell className={classes ? classes.emailCol : null}>Email</TableCell>
                    <TableCell className={classes ? classes.hiddenColxs : null}>Approved</TableCell>
                    <TableCell className={classes ? classes.hiddenColxs : null}>Admin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className={classes ? classes.profilePicCol : null}>
                        <Avatar src={user.data.photoURL} />
                      </TableCell>
                      <TableCell className={classes ? classes.hiddenColsm : null}>{user.data.name}</TableCell>
                      <TableCell className={classes ? classes.emailCol : null}>{user.data.email}</TableCell>
                      <TableCell className={classes ? classes.hiddenColxs : null}>
                        <Switch
                          checked={user.data.isApproved}
                          onChange={(_, checked) => this.handleApprovedToggle(user, checked)}/>
                      </TableCell>
                      <TableCell className={classes ? classes.hiddenColxs : null}>
                        <Switch
                          disabled={!user.data.isApproved}
                          checked={user.data.isAdmin}
                          onChange={(_, checked) => this.handleAdminToggle(user, checked)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            : null }
          {!users ?
            <div className={classes ? classes.tableLoadingContainer : null}>
              <CircularProgress size="60px" />
            </div>
          : null}
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
