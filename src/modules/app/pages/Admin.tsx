import React, { Component } from 'react';
import { listenForUser } from '../../../redux/actions/auth/authActions';
import { connect } from 'react-redux';

type Props = {
  listenForUser: () => any;
}

export class Admin extends Component<Props> {
  render() {
    return (
      <div>
        <h1>Admin!</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listenForUser: () => dispatch(listenForUser())
});

export default connect(null, mapDispatchToProps)(Admin);
