import React, { Component } from "react"
import { Route, Redirect, NavLink } from "react-router-dom"
import {
    Theme,
    createStyles,
    withStyles,
    ListItem,
    ListItemText,
    List,
    ListItemIcon,
} from "@material-ui/core"
import { VpnKey, Group } from "@material-ui/icons"
import UserTable from "../../modules/users/components/UserTable/UserTable"
import Interests from "../../modules/interests/components/Interests/Interests"

export const styles = (theme: Theme) =>
    createStyles({
        pageWrapper: {
            display: "flex",
            margin: "50px 0px",
            padding: `0px ${theme.spacing(1)}px`,
            width: "100%",
        },
        pageNav: {
            width: 250,
            minWidth: 250,
            padding: 0,
            marginRight: `${theme.spacing(1)}px`,
        },
        navLink: {
            textDecoration: "none",
            "&:visited": {
                color: "inherit",
            },
        },
        colorInitial: {
            color: "initial",
        },
    })

type Props = {
    classes: any
    match: any
    location: any
}

export type MenuLink = {
    text: string
    href: string
    icon: any
}
export const menuLinks: Array<MenuLink> = [
    {
        text: "Users",
        href: "/users",
        icon: Group,
    },
    {
        text: "Interests",
        href: "/interests",
        icon: VpnKey,
    },
]

export class Admin extends Component<Props> {
    render() {
        const { classes, match, location } = this.props

        return (
            <div className={classes.pageWrapper}>
                <List className={classes.pageNav}>
                    {menuLinks.map((link) => (
                        <NavLink
                            exact
                            key={link.text}
                            to={`${match.url}${link.href}`}
                            className={classes.navLink}
                        >
                            <ListItem
                                button
                                className={classes.colorInitial}
                                selected={
                                    location.pathname ===
                                    `${match.url}${link.href}`
                                }
                            >
                                <ListItemIcon>
                                    <link.icon />
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Route
                    exact
                    path={`${match.url}`}
                    render={() => <Redirect to={`${match.url}/users`} />}
                />
                <Route path={`${match.url}/users`} component={UserTable} />
                <Route path={`${match.url}/interests`} component={Interests} />
            </div>
        )
    }
}

export default withStyles(styles)(Admin)
