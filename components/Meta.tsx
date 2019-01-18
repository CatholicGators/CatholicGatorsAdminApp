import React from 'react';
import Head from 'next/head'


export default class Meta extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>
                <style jsx global>{`
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                html, body {
                    height: 100%;
                    width: 100%;
                }
                `}</style>
            </div>
        );
    }
}
