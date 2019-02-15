import React from "react";
import ContactForm from "../src/components/ContactForm/contactForm"

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page!</h1>
        <ContactForm/>
      </div>
    );
  }
}
