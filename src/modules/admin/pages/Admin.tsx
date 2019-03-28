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
  CircularProgress,
  Checkbox,
  Tooltip,
  IconButton
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKey from '@material-ui/icons/VpnKey';

import {
  getUsers,
  updateUser,
  deleteUser
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
  toolbarTitle: {
    marginRight: 'auto'
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
  }
})

type Props = {
  classes: any
  users: any
  getUsers: () => any,
  updateUser: (user) => any,
  deleteUser: (id) => any
}

type State = {
  selected: Array<any>
}

export class Admin extends Component<Props, State> {
  state = {
    selected: []
  }

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

  handleSelectAllClick(event) {
    if (event.target.checked) {
      this.setState({ selected: this.props.users.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleSelect(id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };
  
  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1
  }

  handleBatchApprove() {
    this.props.users
      .filter(user => this.isSelected(user.id))
      .map(user => this.props.updateUser({
        ...user,
        data: {
          ...user.data,
          isApproved: true
        }
      }))
  }

  handleBatchAuthorize() {
    this.props.users
      .filter(user => this.isSelected(user.id))
      .map(user => this.props.updateUser({
        ...user,
        data: {
          ...user.data,
          isApproved: true,
          isAdmin: true
        }
      }))
  }

  handleBatchDelete() {
    this.props.users
      .filter(user => this.isSelected(user.id))
      .map(user => this.props.deleteUser(user.id))
  }

  render() {
    const { classes, users } = this.props;
    const { selected } = this.state;

    return (
      <div className={classes ? classes.tableWrapper : null}>
        <Paper className={classes ? classes.tableCard : null}>
          <Toolbar>
            <div className={classes ? classes.toolbarTitle : null}>
              {selected.length > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                  {selected.length} selected
                </Typography>
              ) : (
                <Typography variant="h6">
                  Users
                </Typography>
              )}
            </div>
            {selected.length > 0 ? (
              <div>
                <Tooltip title="Approve">
                  <IconButton
                    onClick={() => this.handleBatchApprove()}
                    aria-label="Approve"
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Make admin">
                  <IconButton
                    onClick={() => this.handleBatchAuthorize()}
                    aria-label="Make admin"
                  >
                    <VpnKey />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.handleBatchDelete()}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : null}
          </Toolbar>
            {users ? 
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < users.length}
                      checked={selected.length === users.length}
                      onChange={event => this.handleSelectAllClick(event)}
                    />
                  </TableCell>
                    <TableCell className={classes ? classes.profilePicCol : null}>Profile Pic</TableCell>
                    <TableCell className={classes ? classes.hiddenColsm : null}>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell className={classes ? classes.hiddenColxs : null}>Approved</TableCell>
                    <TableCell className={classes ? classes.hiddenColxs : null}>Admin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => {
                    const isSelected = this.isSelected(user.id);
                    return (
                      <TableRow
                        hover
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={user.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={() => this.handleSelect(user.id)}
                            checked={isSelected}
                          />
                        </TableCell>
                        <TableCell className={classes ? classes.profilePicCol : null}>
                          <Avatar src={user.data.photoURL} />
                        </TableCell>
                        <TableCell className={classes ? classes.hiddenColsm : null}>{user.data.name}</TableCell>
                        <TableCell>{user.data.email}</TableCell>
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
                    )
                  })}
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
  updateUser: user => dispatch(updateUser(user)),
  deleteUser: id => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin))
