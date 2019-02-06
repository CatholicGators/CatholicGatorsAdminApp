import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  loadFirebase,
  googleSignIn,
  signOut
} from '../../redux/actions/authActions';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(public props: any) {
      super(props);
    }

    componentDidMount() {
      const { loadFirebase } = this.props;
      loadFirebase();
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  const mapStateToProps = state => ({
    user: state.sessionState.user
  });

  const mapDispatchToProps = dispatch => ({
    loadFirebase: () => dispatch(loadFirebase()),
    googleSignIn: () => dispatch(googleSignIn()),
    signOut: () => dispatch(signOut())
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;