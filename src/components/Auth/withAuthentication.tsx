import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../../firebase';
import actions from '../../reducers/actions';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(public props: any) {
      super(props);
    }

    componentDidMount() {
      const { onSetUser } = this.props;

      firebase.auth.onAuthStateChanged(user => {
        user
          ? onSetUser(user)
          : onSetUser(null);
      });
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

  const mapDispatchToProps = (dispatch) => ({
    onSetUser: (user) => dispatch({ type: actions.AUTH_USER_SET, user }),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;