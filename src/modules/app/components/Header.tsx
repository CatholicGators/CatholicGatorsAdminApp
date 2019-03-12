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
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    mobileMenuItems: {
        width: 250,
        marginBottom: 'auto'
    },
    toolbar: {
        minHeight: '64px'
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        minHeight: '64px'
    },
    mobileAvatar: {
        margin: theme.spacing.unit
    },
    desktopMenuItems: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    navLinkMobile: {
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
        },
        '&:hover': {
            color: theme.palette.secondary.main,
            transition: 'color',
            transitionDuration: '200ms',
        }
    },
    navLinkTextDesktop: {
        color: 'inherit'
    },
    desktopSelected: {
        color: theme.palette.secondary.main
    },
    progress: {
        margin: 12,
        color: theme.palette.secondary.main
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
        drawerOpen: true
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

    render() {
        const { classes, user } = this.props;

        return (
            <div className={classes ? classes.root : null}>
                <AppBar position="static">
                    <Toolbar className={classes ? classes.toolbar : null}>
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
                        <div className={classes ? classes.desktopMenuItems : null}>
                            {this.getDesktopMenuItems()}
                            {this.getDesktopProfile()}
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                >
                    <div className={classes ? classes.mobileMenuItems : null}>
                        <div className={classes ? classes.drawerHeader : null}>
                            {this.getMobileProfile()}
                        </div>
                        <Divider />
                        <List>
                            {this.getMobileMenuItems()}
                        </List>
                    </div>
                    {user ? 
                        <div>
                            <Divider />
                            <ListItem
                                button
                                key='logout'
                                onClick={() => {
                                    this.toggleDrawer(false);
                                    this.handleLogout();
                                }}
                            >
                                <ListItemIcon>
                                    <ExitToApp/>
                                </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItem>
                        </div>
                    : null}
                </Drawer>
            </div>
        );
    }

    getDesktopProfile() {
        const { anchorEl } = this.state;
        const { classes, user } = this.props;

        switch(this.props.user) {
            case undefined:
                return <CircularProgress className={classes ? classes.progress : null} />

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
                );

            default:
                return (
                    <div>
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

    getDesktopMenuItems() {
        const { classes, user } = this.props;

        if(!!user) {
            return this.menuLinks.map(link =>
                <NavLink
                    exact
                    key={link.text}
                    to={link.href}
                    className={classes ? classes.navLinkDesktop : null}
                    activeClassName={classes ? classes.desktopSelected : null}
                >
                    <Typography
                        className={classes ? classes.navLinkTextDesktop : null}
                    >
                        {link.text}
                    </Typography>
                </NavLink>
            );
        } else {
            return null;
        }
    }

    getMobileProfile() {
        const { classes, user } = this.props;

        switch(this.props.user) {
            case undefined:
                return <CircularProgress className={classes ? classes.progress : null} />
            case null:
                return null
            default:
                return <Avatar className={classes ? classes.mobileAvatar : null} src={user.photoURL} />
        }
    }

    getMobileMenuItems() {
        const { classes, user } = this.props;
        switch(user) {
            case undefined:
                return null;
            case null:
                return (
                    <ListItem
                        button
                        key='login'
                        onClick={() => {
                            this.toggleDrawer(false);
                            this.handleLogin();
                        }}
                    >
                            <ListItemIcon>
                                <PowerSettingsNew/>
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                    </ListItem>
                );
            default:
                return (
                    this.menuLinks.map(link =>
                        <NavLink
                            exact
                            key={link.text}
                            to={link.href}
                            className={classes ? classes.navLinkMobile : null}
                            onClick={() => this.toggleDrawer(false)}
                        >
                            <ListItem
                                button
                                key={link.text}
                                selected={this.props.location.pathname == link.href}
                            >
                                    <ListItemIcon>
                                        <link.icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={link.text} />
                            </ListItem>
                        </NavLink>
                    )
                );
        }
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
