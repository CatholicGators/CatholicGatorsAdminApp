import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";

import { createStyles, withStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import CircularProgress from '@material-ui/core/CircularProgress';

import { googleSignIn, signOut } from '../../../../redux/actions/auth/authActions';
import MobileDrawer from '../MobileDrawer/MobileDrawer';

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
    toolbar: {
        minHeight: '64px'
    },
    desktopMenuItems: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
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

export type MenuLink = {
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

    render() {
        const { classes, user } = this.props;

        return (
            <div className={classes ? classes.root : null}>
                <AppBar position="static">
                    <Toolbar className={classes ? classes.toolbar : null}>
                        <IconButton
                            id='menu-btn'
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
                            { user ?
                                this.menuLinks.map(link =>
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
                                )
                                : null
                            }
                            {this.getDesktopProfile()}
                        </div>
                    </Toolbar>
                </AppBar>
                <MobileDrawer
                    isOpen={this.state.drawerOpen}
                    user={user}
                    closeDrawer={() => this.toggleDrawer(false)}
                    menuLinks={this.menuLinks}
                    logout={() => this.props.signOut() }
                    login={() => this.props.googleSignIn() }
                    selectedPath={this.props.location.pathname}
                />
            </div>
        );
    }

    getDesktopProfile() {
        const { anchorEl } = this.state;
        const { classes, user } = this.props;

        switch(this.props.user) {
            case undefined:
                return <CircularProgress id='desktop-spinner' className={classes ? classes.progress : null} />

            case null:
                return (
                    <Button
                        id="desktop-login-btn"
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
                            <MenuItem id="desktop-logout" onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                        </Menu>
                    </div>
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
