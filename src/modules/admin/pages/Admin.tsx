import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../redux/actions/auth/authActions';

type Props = {
  users: any
  getUsers: () => any;
}

export class Admin extends Component<Props> {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h1>Admin!</h1>
        {JSON.stringify(this.props.users)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.auth.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
