import React from "react";

import Link from "next/link";

import Page from "../layouts/Page";

export default class Index extends React.Component {
  render() {
    return (
      <Page>
        <h1>Home Page!</h1>
        <Link href='/login'><a>Login</a></Link>
      </Page>
    );
  }
}
