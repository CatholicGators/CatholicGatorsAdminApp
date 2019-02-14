import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { listenForUser, googleSignIn, signOut } from './redux/actions/auth/authActions';
import { connect } from 'react-redux';

type Props = {
  user: any;
  listenForUser: () => any;
}

class App extends Component<Props> {
  componentDidMount() {
    this.props.listenForUser();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
