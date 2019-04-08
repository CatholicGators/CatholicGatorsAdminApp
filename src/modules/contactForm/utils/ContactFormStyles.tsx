import {
Theme, 
createStyles
} from '@material-ui/core'

export var styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      feild: {
        marginLeft: 10,
        marginRight: 10,
        width: 250
      },
      feildSmaller: {
        marginLeft: 10,
        marginRight: 10,
        width: 100
      },
      feildLarger: {
        marginLeft: 10,
        marginRight: 10,
        width: 300
      },
      margins: {
        marginLeft: 10,
        marginRight: 10
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
      },
      stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
      },
  });
