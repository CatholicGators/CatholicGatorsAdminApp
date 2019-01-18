import React from 'react';

import Link from "next/link";

import Page from '../layouts/Page';

export default class Login extends React.Component {
    render() {
        return (
            <Page>
                <h1>Login Page!</h1>
                <Link href='/'><a>Home</a></Link>
            </Page>
        )
    }
}
