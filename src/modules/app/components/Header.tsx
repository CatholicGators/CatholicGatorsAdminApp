import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { googleSignIn, signOut } from '../../../redux/actions/auth/authActions';
import './Header.css';

type Props = {
    user: any,
    signOut: () => any,
    googleSignIn: () => any
}

class Header extends React.Component<Props> {
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

    render() {
        const { user, classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Catholic Gators Admin
                        </Typography>
                        {user ? (
                            <div>
                                <IconButton
                                    aria-owns={anchorEl ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu.bind(this)}
                                    color="inherit"
                                >
                                    <Avatar src={user.photoURL} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                    <MenuItem onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button color="inherit" onClick={this.handleLogin.bind(this)}>Login</Button>
                        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);