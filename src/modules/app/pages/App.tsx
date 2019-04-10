import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { listenForUser } from '../../../redux/actions/auth/authActions';
import Header from '../components/Header/Header';
import Admin from '../../admin/pages/Admin';
import AuthorizedRoute from '../components/AuthorizedRoute/AuthorizedRoute';
import ContactForm from '../../contactForm/pages/ContactForm/ContactForm'
import MyContacts from '../../contactForm/pages/MyContacts/MyContacts';

type Props = {
  user: any;
  listenForUser: () => any;
}

export class App extends Component<Props> {
  componentDidMount() {
    this.props.listenForUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path='/' component={ContactForm}/>
            <AuthorizedRoute
              path="/admin/"
              component={Admin}
              isAuthorized={this.props.user ? this.props.user.isAdmin && this.props.user.isApproved : false}
              redirectPathname="/"
            />
            <Route path="/my-contacts/" component={MyContacts}/>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  listenForUser: () => dispatch(listenForUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
