import React from 'react';
import { connect } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { googleSignIn, signOut } from '../../../redux/actions/auth/authActions';

const styles = createStyles({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

type Props = {
    user: any,
    signOut: () => any,
    googleSignIn: () => any
}

export class Header extends React.Component<Props> {
    state = {
        anchorEl: null,
    };

    constructor(public props) {
        super(props);
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    handleLogin() {
        this.props.googleSignIn();
    }

    handleLogout() {
        this.props.signOut();
        this.handleClose();
    }

    profile(user) {
        const { anchorEl } = this.state;

        switch(user) {
            case undefined:
                return <div>Loading...</div>; // TODO: Replace this with CircularProgress

            case null:
                return <Button id="login-btn" color="inherit" onClick={this.handleLogin.bind(this)}>Login</Button>

            default:
                return <div>
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
        }
    }

    render() {
        const { user, classes } = this.props;
        // const { anchorEl } = this.state;

        return (
            <div className={classes ? classes.root : null}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes ? classes.menuButton : null} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes ? classes.grow : null}>
                            Catholic Gators Admin
                        </Typography>
                        {this.profile(user)}
                    </Toolbar>
                </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
