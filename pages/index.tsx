import React from "react";

import Link from "next/link";

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page!</h1>
        <Link href='/login'><a>Login</a></Link>
      </div>
    );
  }
}
