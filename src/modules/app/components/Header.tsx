import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";

import { createStyles, withStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKey from '@material-ui/icons/VpnKey';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';

import { googleSignIn, signOut } from '../../../redux/actions/auth/authActions';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    list: {
        width: 250,
    },
    toolbar: theme.mixins.toolbar,
    menuItems: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    navLinkMobile: {
        color: 'inherit',
        textDecoration: 'none',
        '&:visited': {
            color: 'inherit'
        }
    },
    navLinkDesktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        color: 'inherit',
        textDecoration: 'none',
        '&:visited': {
            color: 'inherit'
        }
    },
    navLinkTextDesktop: {
        color: 'inherit'
    },
    selected: {
        color: 'red'
    },
    mobileSelected: {
        color: 'green'
    }
});

type Props = {
    user: any,
    signOut: () => any,
    googleSignIn: () => any
}

type State = {
    anchorEl: string | null,
    drawerOpen: boolean
}

type MenuLink = {
    text: string,
    href: string,
    icon: any
}

export class Header extends React.Component<Props, State> {
    readonly menuLinks: Array<MenuLink> = [
        {
            text: 'Contact Form',
            href: '/',
            icon: FormatAlignLeft
        },
        {
            text: 'Admin',
            href: '/admin',
            icon: VpnKey
        }
    ];
    state = {
        anchorEl: null,
        drawerOpen: false
    };

    constructor(public props) {
        super(props);
    }

    handleMenu(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    handleLogin() {
        this.props.googleSignIn();
    }

    handleLogout() {
        this.props.signOut();
        this.handleClose();
    }

    toggleDrawer(isOpen: boolean){
      this.setState({
        drawerOpen: isOpen,
      });
    };

    desktopItems() {
        const { anchorEl } = this.state;
        const { classes, user } = this.props;

        switch(this.props.user) {
            case undefined:
                return <div>Loading...</div>; // TODO: Replace this with CircularProgress

            case null:
                return (
                    <Button
                        id="login-btn"
                        color="inherit"
                        onClick={this.handleLogin.bind(this)}
                    >
                        Login
                    </Button>
                );

            default:
                return (
                    <div className={classes ? classes.menuItems : null}>
                        {this.menuLinks.map(link =>
                            <NavLink
                                exact
                                key={link.text}
                                to={link.href}
                                className={classes ? classes.navLinkDesktop : null}
                                activeClassName={classes ? classes.selected : null}
                            >
                                <Typography
                                    className={classes ? classes.navLinkTextDesktop : null}
                                >
                                    {link.text}
                                </Typography>
                            </NavLink>
                        )}
                        <IconButton
                            id="avatar-btn"
                            aria-owns={anchorEl ? 'menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu.bind(this)}
                            color="inherit"
                        >
                            <Avatar src={user.photoURL} />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={!!anchorEl}
                            onClose={this.handleClose.bind(this)}
                        >
                            <MenuItem id="logout" onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                        </Menu>
                    </div>
                );
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes ? classes.root : null}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes ? classes.menuButton : null}
                            color="inherit"
                            aria-label="Menu"
                            onClick={() => this.toggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes ? classes.grow : null}>
                            Catholic Gators Admin
                        </Typography>
                        {this.desktopItems()}
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    >
                        <div className={classes ? classes.list : null}>
                            <div className={classes.toolbar}/>
                            <Divider />
                            <List>
                                {this.menuLinks.map(link =>
                                    <NavLink
                                        exact
                                        key={link.text}
                                        to={link.href}
                                        className={classes ? classes.navLinkMobile : null}
                                        activeClassName={classes ? classes.mobileSelected : null}>
                                        <ListItem
                                            button
                                            key={link.text}>
                                                <ListItemIcon>
                                                    <link.icon/>
                                                </ListItemIcon>
                                                <ListItemText primary={link.text} />
                                        </ListItem>
                                    </NavLink>
                                )}
                            </List>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    googleSignIn: () => dispatch(googleSignIn()),
    signOut: () => dispatch(signOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));
