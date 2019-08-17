import {
Theme,
createStyles
} from '@material-ui/core'

export const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      field: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: '2%',
            marginRight: '2%',
            width: '96%'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '2%',
            marginRight: '2%',
            width: '46%',
        }
      },
      fieldSmaller: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: '2%',
            marginRight: '2%',
            width: '46%',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '2%',
            marginRight: '2%',
            width: '21%',
        }
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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(4))]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(6))]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      stepper: {
        padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
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
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
      },
      spinner: {
          marginLeft: '48%',
          marginRight: '48%',
          size: 100
      },
      Checkbox: {
        marginLeft: 10,
        marginRight: 10
      }
  });
