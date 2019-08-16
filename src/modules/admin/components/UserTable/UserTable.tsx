import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  CircularProgress,
  Checkbox
} from '@material-ui/core'

import {
  getUsers,
  updateUser,
  batchDeleteUsers
} from '../../../../redux/actions/admin/adminActions'
import UserTableRow from './components/UserTableRow/UserTableRow'
import UserTableToolbar from './components/UserTableToolbar/UserTableToolbar'

export const styles = (theme: Theme) => createStyles({
  tableCard: {
    width: '100%',
    overflowX: 'auto',
  },
  tableLoadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  hiddensm: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  profilePicCol: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
})

type Props = {
  classes: any
  users: any
  getUsers: () => void,
  updateUser: (user) => void,
  batchDeleteUsers: (ids) => void
}

type State = {
  selected: Array<any>
}

export class UserTable extends Component<Props, State> {
  state = {
    selected: []
  }

  componentDidMount() {
    this.props.getUsers()
  }

  handleSelectAllClick(event) {
    if (event.target.checked) {
      this.setState({ selected: this.props.users.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  handleSelect(id) {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }
  
  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1
  }

  handleBatchApprove() {
    this.props.users
      .filter(user => this.isSelected(user.id))
      .map(user => this.props.updateUser({
        ...user,
        isApproved: true
      }))
    this.setState({ selected: [] })
  }

  handleBatchAuthorize() {
    this.props.users
      .filter(user => this.isSelected(user.id))
      .map(user => this.props.updateUser({
        ...user,
        isApproved: true,
        isAdmin: true
      }))
    this.setState({ selected: [] })
  }

  handleBatchDelete() {
    this.props.batchDeleteUsers([...this.state.selected])
    this.setState({ selected: [] })
  }

  render() {
    const { classes, users } = this.props
    const { selected } = this.state

    return (
      <Paper className={classes ? classes.tableCard : null}>
        <UserTableToolbar
          numSelected={selected.length}
          handleBatchApprove={this.handleBatchApprove.bind(this)}
          handleBatchAuthorize={this.handleBatchAuthorize.bind(this)}
          handleBatchDelete={this.handleBatchDelete.bind(this)}
        />
        {users ?
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < users.length}
                    checked={selected.length === users.length && users.length !== 0}
                    onChange={event => this.handleSelectAllClick(event)}
                  />
                </TableCell>
                <TableCell className={classes ? classes.profilePicCol : null}>Profile Pic</TableCell>
                <TableCell className={classes ? classes.hiddensm : null}>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                const isSelected = this.isSelected(user.id)
                return (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    isSelected={isSelected}
                    handleSelect={this.handleSelect.bind(this)}
                  />
                )
              })}
            </TableBody>
          </Table>
        :
          <div id='loading-spinner' className={classes ? classes.tableLoadingContainer : null}>
            <CircularProgress size="60px" />
          </div>
        }
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  updateUser: user => dispatch(updateUser(user)),
  batchDeleteUsers: ids => dispatch(batchDeleteUsers(ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserTable))
