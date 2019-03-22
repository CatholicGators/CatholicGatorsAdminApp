import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute({
  component: Component,
  isAuthorized,
  redirectPathname,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPathname} />
        )
      }
    />
  );
}