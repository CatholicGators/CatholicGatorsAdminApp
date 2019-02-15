import React, { Component } from 'react';
import { listenForUser } from '../../../redux/actions/auth/authActions';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm/contactForm'

type Props = {
  listenForUser: () => any;
}

class App extends Component<Props> {
  componentDidMount() {
    this.props.listenForUser();
  }
  render() {
    return (
      <div>
        <Header></Header>
        <ContactForm />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listenForUser: () => dispatch(listenForUser())
});

export default connect(null, mapDispatchToProps)(App);
