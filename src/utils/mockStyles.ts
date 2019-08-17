import { createMuiTheme } from '@material-ui/core'

export default (styles) => Object.keys(styles(createMuiTheme())).reduce((acc, curr) => ({...acc, [curr]: "test"}), {})