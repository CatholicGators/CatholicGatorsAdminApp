import React from 'react';

import Link from "next/link";

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login Page!</h1>
                <Link href='/'><a>Home</a></Link>
            </div>
        )
    }
}
