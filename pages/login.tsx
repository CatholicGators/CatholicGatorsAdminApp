import React from 'react';

import Link from "next/link";
import withAuthentication from '../src/components/Auth/withAuthentication';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login Page!</h1>
                <Link href='/'><a>Home</a></Link>
            </div>
        )
    }
}

export default withAuthentication(Login);