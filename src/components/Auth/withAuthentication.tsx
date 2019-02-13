import React from 'react';
import { connect } from 'react-redux';

import {
  listenForUser,
  googleSignIn,
  signOut
} from '../../redux/actions/auth/authActions';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(public props: any) {
      super(props);
    }

    componentDidMount() {
      const { listenForUser } = this.props;
      listenForUser();
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  const mapStateToProps = state => ({
    user: state.auth.user
  });

  const mapDispatchToProps = dispatch => ({
    listenForUser: () => dispatch(listenForUser()),
    googleSignIn: () => dispatch(googleSignIn()),
    signOut: () => dispatch(signOut())
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;