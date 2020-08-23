import React from "react"
import { connect } from "react-redux"
import {
    TableRow,
    TableCell,
    Checkbox,
    Avatar,
    Switch,
    Theme,
    createStyles,
    withStyles,
    IconButton,
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import { updateUser } from "../../../../redux/actions/usersActions"

export const styles = (theme: Theme) =>
    createStyles({
        hiddenxs: {
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
        hiddensm: {
            [theme.breakpoints.down("sm")]: {
                display: "none",
            },
        },
        avatarIconBtn: {
            padding: 0,
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        profilePicCol: {
            paddingRight: theme.spacing(2),
        },
    })

type Props = {
    user: any
    classes: any
    isSelected: boolean
    handleSelect: (id) => any
    updateUser: (user) => void
}

export class UserTableRow extends React.Component<Props> {
    handleApproveToggle(user, checked) {
        this.props.updateUser({
            ...user,
            isApproved: checked,
        })
    }

    handleAuthorizeToggle(user, checked) {
        this.props.updateUser({
            ...user,
            isAdmin: checked,
        })
    }

    render() {
        const { user, classes, isSelected, handleSelect } = this.props

        return (
            <TableRow
                hover
                aria-checked={isSelected}
                tabIndex={-1}
                key={user.id}
                selected={isSelected}
            >
                <TableCell
                    className={classes ? classes.hiddenxs : null}
                    padding="checkbox"
                >
                    <Checkbox
                        onClick={() => handleSelect(user.id)}
                        checked={isSelected}
                    />
                </TableCell>
                <TableCell className={classes ? classes.profilePicCol : null}>
                    <Avatar
                        className={classes ? classes.hiddenxs : null}
                        src={user.photoUrl}
                    />
                    <IconButton
                        className={classes ? classes.avatarIconBtn : null}
                        onClick={() => handleSelect(user.id)}
                    >
                        <Avatar src={isSelected ? null : user.photoUrl}>
                            {isSelected ? <CheckIcon /> : null}
                        </Avatar>
                    </IconButton>
                </TableCell>
                <TableCell className={classes ? classes.hiddensm : null}>
                    {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Switch
                        id="approve-switch"
                        checked={user.isApproved}
                        onChange={(_, checked) =>
                            this.handleApproveToggle(user, checked)
                        }
                    />
                </TableCell>
                <TableCell>
                    <Switch
                        id="authorize-switch"
                        disabled={!user.isApproved}
                        checked={user.isAdmin}
                        onChange={(_, checked) =>
                            this.handleAuthorizeToggle(user, checked)
                        }
                    />
                </TableCell>
            </TableRow>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(updateUser(user)),
})

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(UserTableRow))
