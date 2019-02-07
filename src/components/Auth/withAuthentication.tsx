import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActionCreators from '../../redux/actions/auth/authActionCreators';

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
    user: state.authState.user
  });

  const mapDispatchToProps = dispatch => bindActionCreators(authActionCreators, dispatch)

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;