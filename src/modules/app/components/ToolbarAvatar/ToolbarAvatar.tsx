import React from "react"

import { createStyles, withStyles, Theme } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

export const styles = (theme: Theme) =>
    createStyles({
        progress: {
            margin: 12,
            color: theme.palette.secondary.main,
        },
    })

type Props = {
    classes: any
    user: any
    login: () => any
    logout: () => any
}

type State = {
    anchorEl: string | null
}

export class ToolbarAvatar extends React.Component<Props, State> {
    state = {
        anchorEl: null,
    };

    handleMenu(event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleClose() {
        this.setState({
            anchorEl: null,
        })
    }

    handleLogin() {
        this.props.login()
    }

    handleLogout() {
        this.props.logout()
        this.handleClose()
    }

    render() {
        const { anchorEl } = this.state
        const { classes, user } = this.props

        switch (this.props.user) {
            case undefined:
                return (
                    <CircularProgress
                        id="spinner"
                        className={classes ? classes.progress : null}
                    />
                )

            case null:
                return (
                    <Button
                        id="login-btn"
                        color="inherit"
                        variant="outlined"
                        onClick={this.handleLogin.bind(this)}
                    >
                        Login
                    </Button>
                )

            default:
                return (
                    <div>
                        <IconButton
                            id="avatar-btn"
                            aria-owns={anchorEl ? "menu" : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu.bind(this)}
                            color="inherit"
                        >
                            <Avatar src={user.photoUrl} />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={!!anchorEl}
                            onClose={this.handleClose.bind(this)}
                        >
                            <MenuItem
                                id="logout"
                                onClick={this.handleLogout.bind(this)}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                )
        }
    }
}

export default withStyles(styles)(ToolbarAvatar)
