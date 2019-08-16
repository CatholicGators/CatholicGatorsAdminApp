import React from 'react';
import { NavLink } from "react-router-dom";

import { createStyles, withStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MenuLink } from '../Header/Header';

export const styles = (theme: Theme) => createStyles({
    menuItems: {
        width: 250,
        marginBottom: 'auto'
    },
    header: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        minHeight: '64px',
        padding: theme.spacing(1)
    },
    profileWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    headerName: {
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    headerEmail: {
        fontSize: '0.75rem',
        color: '#727272'
    },
    navLink: {
        textDecoration: 'none',
        '&:visited': {
            color: 'inherit'
        }
    },
    progress: {
        color: theme.palette.secondary.main
    }
});

type Props = {
    classes: any,
    user: any,
    menuLinks: Array<MenuLink>,
    isOpen: boolean,
    selectedPath: string,
    closeDrawer: () => any,
    logout: () => any,
    login: () => any
}

export class MobileDrawer extends React.Component<Props> {
    render() {
        const { classes } = this.props
        return (
                <Drawer
                    open={this.props.isOpen}
                    onClose={() => this.props.closeDrawer()}
                >
                    <div className={classes ? classes.menuItems : null}>
                        <div className={classes ? classes.header : null}>
                            {this.getProfile()}
                        </div>
                        <Divider />
                        <List>
                            {this.getMenuLinks()}
                        </List>
                    </div>
                    {this.props.user ? 
                        <div>
                            <Divider />
                            <ListItem
                                id='logout-btn'
                                button
                                key='logout'
                                onClick={() => {
                                    this.props.closeDrawer()
                                    this.props.logout()
                                }}
                            >
                                <ListItemIcon>
                                    <ExitToApp/>
                                </ListItemIcon>
                                <ListItemText color='error' primary='Logout' />
                            </ListItem>
                        </div>
                    : null}
                </Drawer>
        );
    }

    getProfile() {
        const { classes, user } = this.props;

        switch(this.props.user) {
            case undefined:
                return <CircularProgress id='spinner' className={classes ? classes.progress : null} />
            case null:
                return null
            default:
                return (
                    <div className={classes ? classes.profileWrapper : null}>
                        <Avatar id='avatar' className={classes ? classes.avatar : null} src={user.photoURL} />
                        <div>
                            <Typography variant='h6' className={classes ? classes.headerName : null}>
                                {user.name}
                            </Typography>
                            <Typography variant='subtitle1' className={classes ? classes.headerEmail : null}>
                                {user.email}
                            </Typography>
                        </div>
                    </div>
                )
        }
    }

    getMenuLinks() {
        const { classes, user, menuLinks } = this.props;
        switch(user) {
            case undefined:
                return null;
            case null:
                return (
                    <ListItem
                        id='login-btn'
                        button
                        key='login'
                        onClick={() => {
                            this.props.closeDrawer()
                            this.props.login()
                        }}
                    >
                            <ListItemIcon>
                                <PowerSettingsNew/>
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                    </ListItem>
                );
            default:
                return menuLinks
                            .filter(link => !link.needsAuthorization || user.isAdmin)
                            .map(link => 
                                <NavLink
                                    exact
                                    key={link.text}
                                    to={link.href}
                                    className={classes ? classes.navLink : null}
                                    onClick={() => this.props.closeDrawer()}
                                >
                                    <ListItem
                                        button
                                        key={link.text}
                                        selected={this.props.selectedPath == link.href}
                                    >
                                            <ListItemIcon>
                                                <link.icon/>
                                            </ListItemIcon>
                                            <ListItemText primary={link.text} />
                                    </ListItem>
                                </NavLink>
                            )
        }
    }
}

export default withStyles(styles)(MobileDrawer);
