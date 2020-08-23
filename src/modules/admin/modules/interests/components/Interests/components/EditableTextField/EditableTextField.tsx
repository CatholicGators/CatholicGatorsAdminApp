import React, { Component } from "react";
import classnames from "classnames";
import {
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Input,
    Typography,
} from "@material-ui/core";
import { Delete, Edit, Save, Close } from "@material-ui/icons";

export const styles = (theme: Theme) =>
    createStyles({
        row: {
            display: "flex",
            alignItems: "center",
            width: "100%",
        },
        input: {
            margin: 0,
        },
        actions: {
            display: "none",
            marginLeft: `${theme.spacing(1)}px`,
        },
        editActions: {
            display: "flex",
            alignItems: "center",
        },
        show: {
            display: "block",
        },
    });

export type Props = {
    classes: any;
    isEditing: boolean;
    isHovered: boolean;
    id: string;
    text: string;
    beginEditing: (id: string) => void;
    cancelEditing: () => void;
    deleteText: (id: string) => void;
    save: (id: string, newText: string) => void;
};

type State = {
    editedText: string;
};

export class EditableTextField extends Component<Props, State> {
    state = {
        editedText: this.props.text,
    };

    onEditChange(newText: string) {
        this.setState({ editedText: newText });
    }

    render() {
        const {
            isEditing,
            isHovered,
            id,
            text,
            classes,
            beginEditing,
            deleteText,
            save,
            cancelEditing,
        } = this.props;

        const { editedText } = this.state;

        return isEditing ? (
            <div className={classes.row}>
                <Input
                    fullWidth
                    className={classes.input}
                    value={this.state.editedText}
                    onChange={(ev) => this.onEditChange(ev.target.value)}
                />
                <div className={classes.editActions}>
                    <IconButton id="save" onClick={() => save(id, editedText)}>
                        <Save />
                    </IconButton>
                    <IconButton id="cancel" onClick={() => cancelEditing()}>
                        <Close />
                    </IconButton>
                </div>
            </div>
        ) : (
            <div className={classes.row}>
                <Typography>{text}</Typography>
                <div
                    className={classnames({
                        [classes.actions]: true,
                        [classes.show]: isHovered,
                    })}
                >
                    <IconButton id="edit" onClick={() => beginEditing(id)}>
                        <Edit />
                    </IconButton>
                    <IconButton id="delete" onClick={() => deleteText(id)}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EditableTextField);
