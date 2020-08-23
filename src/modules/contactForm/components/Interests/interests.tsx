import React from "react"
import { styles } from "../../utils/ContactFormStyles"
import {
    withStyles,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
} from "@material-ui/core"

class Interests extends React.Component<any, any> {
    constructor(public props: any) {
        super(props)
    }

    isChecked(objectId: string): boolean {
        return this.props.data.interests.includes(objectId)
    }

    render() {
        const { classes, interests, handleChange } = this.props
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleNext}>
                    {interests ? (
                        <React.Fragment>
                            {interests.map((section) => (
                                <div id="section" key={section.id}>
                                    <Typography>{section.text}</Typography>
                                    {section.options.map((option) => (
                                        <div key={"div: " + option.id}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        key={option.id}
                                                        className={
                                                            classes.Checkbox
                                                        }
                                                        color="primary"
                                                        checked={this.isChecked(
                                                            option.id
                                                        )}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                option.id
                                                            )
                                                        }
                                                        value={option.text}
                                                    ></Checkbox>
                                                }
                                                label={option.text}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </React.Fragment>
                    ) : null}
                    <div className={classes.buttons}>
                        <Button
                            onClick={this.props.handleBack}
                            className={classes.button}
                        >
                            {" "}
                            Back{" "}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.button}
                        >
                            {" "}
                            Submit form{" "}
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Interests)
