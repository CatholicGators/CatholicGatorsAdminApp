import React from 'react';
import Router from 'next/router';

let globalUser = null;

export interface User {
  id: String,
  isAdmin: Boolean
}

interface AuthProps {
  user: User,
  isFromServer: Boolean
}

export default (
  Page,
  { loginRequired = true, logoutRequired = false, adminRequired = false } = {},
) => class BaseComponent extends React.Component {
    constructor(public props: AuthProps) {
      super(props);
    }

    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) {
        globalUser = user;
      }

      if (loginRequired && !logoutRequired && !user) {
        Router.push('/public/login', '/login');
        return;
      }

      if (logoutRequired && user) {
        Router.push('/');
      }

      if (adminRequired && (!user || !user.isAdmin)) {
        Router.push('/');
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      if (adminRequired && (!user || !user.isAdmin)) {
        return null;
      }

      return <Page {...this.props} />;
    }
  };