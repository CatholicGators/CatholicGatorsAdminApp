import React, { Component } from 'react'
import {
  Route,
  Redirect,
  NavLink
} from 'react-router-dom'
import {
  Theme,
  createStyles,
  withStyles,
  ListItem,
  ListItemText,
  List,
  ListItemIcon
} from '@material-ui/core'
import { VpnKey, Group } from '@material-ui/icons'

import UserTable from '../../components/UserTable/UserTable'
import Permissions from '../../components/Permissions/Permissions'

const styles = (theme: Theme) => createStyles({
  pageWrapper: {
    display: 'flex',
    margin: '50px 0px',
    padding: `0px ${theme.spacing.unit}px`,
    width: '100%'
  },
  pageNav: {
    width: 250,
    minWidth: 250,
    padding: 0,
    marginRight: `${theme.spacing.unit}px`
  },
  navLink: {
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit'
    }
  }
})

type Props = {
  classes: any,
  match: any,
  location: any
}

export type MenuLink = {
  text: string,
  href: string,
  icon: any
}
export const menuLinks: Array<MenuLink> = [
  {
    text: 'Users',
    href: '/users',
    icon: Group
  },
  {
    text: 'Permissions',
    href: '/permissions',
    icon: VpnKey
  }
]

export class Admin extends Component<Props> {
  render() {
    const { classes, match, location } = this.props

    return (
      <div className={classes ? classes.pageWrapper : null}>
        <List className={classes ? classes.pageNav : null}>
          {
            menuLinks
              .map(link => 
                <NavLink
                  exact
                  key={link.text}
                  to={`${match.url}${link.href}`}
                  className={classes ? classes.navLink : null}
                >
                  <ListItem
                    button
                    selected={location.pathname === `${match.url}${link.href}`}
                  >
                    <ListItemIcon>
                      <link.icon/>
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                </NavLink>
              )
          }
        </List>
        <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/users`} />} />
        <Route path={`${match.url}/users`} component={UserTable}/>
        <Route path={`${match.url}/permissions`} component={Permissions}/>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
