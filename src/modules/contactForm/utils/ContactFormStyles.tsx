import {
Theme,
createStyles
} from '@material-ui/core'

export var styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      field: {
        marginLeft: '2%',
        marginRight: '2%',
        width: '46%',
        minWidth: 250
      },
      fieldSmaller: {
        marginLeft: '2%',
        marginRight: '2%',
        width: '21%',
        minWidth: 100
      },
      fieldLarger: {
        marginLeft: '2%',
        marginRight: '2%',
        width: '96%'
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
      stepLabel: {
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
      },
      spinner: {
          marginLeft: '48%',
          marginRight: '48%',
          size: 100
      }
  });
