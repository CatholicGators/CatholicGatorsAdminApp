import React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { User } from 'lib/withAuth';

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

interface HeaderProps {
    user: User;
    classes: any;
}

class Header extends React.Component {
    state = {
        anchorEl: null,
    };

    constructor(public props: HeaderProps) {
        super(props);
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

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
                                    <AccountCircle />
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
                                    open={anchorEl}
                                    onClose={this.handleClose.bind(this)}
                                >
                                    <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button color="inherit">Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
