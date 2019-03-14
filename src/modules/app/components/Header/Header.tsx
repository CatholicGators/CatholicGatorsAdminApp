import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";

import { createStyles, withStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VpnKey from '@material-ui/icons/VpnKey';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';

import { googleSignIn, signOut } from '../../../../redux/actions/auth/authActions';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import ToolbarAvatar from '../ToolbarAvatar/ToolbarAvatar';

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
    }
});

type Props = {
    user: any,
    signOut: () => any,
    googleSignIn: () => any
}

type State = {
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
        drawerOpen: false
    };

    constructor(public props) {
        super(props);
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
                            <ToolbarAvatar
                                user={user}
                                login={() => this.props.googleSignIn()}
                                logout={() => this.props.signOut()}
                            />
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
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    googleSignIn: () => dispatch(googleSignIn()),
    signOut: () => dispatch(signOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));
