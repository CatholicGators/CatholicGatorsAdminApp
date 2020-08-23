import React from "react";
import {
    createStyles,
    withStyles,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    Theme,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import VpnKey from "@material-ui/icons/VpnKey";

export const styles = (theme: Theme) =>
    createStyles({
        toolbarTitle: {
            marginRight: "auto",
        },
    });

type Props = {
    classes: any;
    numSelected: number;
    handleBatchApprove: () => any;
    handleBatchAuthorize: () => any;
    handleBatchDelete: () => any;
};

export const UserTableToolbar = (props: Props) => {
    const {
        classes,
        numSelected,
        handleBatchApprove,
        handleBatchAuthorize,
        handleBatchDelete,
    } = props;

    return (
        <Toolbar>
            <div className={classes ? classes.toolbarTitle : null}>
                {numSelected > 0 ? (
                    <Typography
                        id="num-selected"
                        color="inherit"
                        variant="subtitle1"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography id="title" variant="h6">
                        Users
                    </Typography>
                )}
            </div>
            {numSelected > 0 ? (
                <div>
                    <Tooltip title="Approve">
                        <IconButton
                            id="approve-icon-btn"
                            onClick={() => handleBatchApprove()}
                            aria-label="Approve"
                        >
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Make admin">
                        <IconButton
                            id="authorize-icon-btn"
                            onClick={() => handleBatchAuthorize()}
                            aria-label="Make admin"
                        >
                            <VpnKey />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            id="delete-icon-btn"
                            aria-label="Delete"
                            onClick={() => handleBatchDelete()}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : null}
        </Toolbar>
    );
};

export default withStyles(styles)(UserTableToolbar);
