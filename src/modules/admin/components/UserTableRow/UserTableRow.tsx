import React from "react"
import {
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Switch,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
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
  user: any,
  classes: any,
  isSelected: boolean,
  handleSelect: (id) => any,
  handleApproveToggle: (user: any, checked: boolean) => any,
  handleAuthorizeToggle: (user: any, checked: boolean) => any
}

export const UserTableRow = (props: Props) => {
  const {
    user,
    classes,
    isSelected,
    handleSelect,
    handleApproveToggle,
    handleAuthorizeToggle
  } = props

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
          onClick={() => handleSelect(user.id)}
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
          onChange={(_, checked) => handleApproveToggle(user, checked)}/>
      </TableCell>
      <TableCell className={classes ? classes.hiddenColxs : null}>
        <Switch
          disabled={!user.data.isApproved}
          checked={user.data.isAdmin}
          onChange={(_, checked) => handleAuthorizeToggle(user, checked)}
        />
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(UserTableRow)
