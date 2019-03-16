import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { listenForUser } from '../../../redux/actions/auth/authActions';
import Header from '../components/Header/Header';
import Admin from '../../admin/pages/Admin';
import ContactForm from '../components/ContactForm/contactForm'

type Props = {
  listenForUser: () => any;
}

export class App extends Component<Props> {
  componentDidMount() {
    this.props.listenForUser();
  }

  render() {
    return (

      <div>
        <Header></Header>
        <Route path="/admin/" component={Admin}></Route>
        <ContactForm />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listenForUser: () => dispatch(listenForUser())
});

export default connect(null, mapDispatchToProps)(App);
