import React from 'react';

import Meta from "../components/Meta";
import Header from "../components/Header";

export default class Page extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Meta></Meta>
                <Header></Header>
                { this.props.children }
            </div>
        );
    }
}