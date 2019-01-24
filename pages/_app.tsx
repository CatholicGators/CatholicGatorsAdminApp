import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import JssProvider from 'react-jss/lib/JssProvider';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../components/Header";
import getPageContext from '../lib/getPageContext';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default class CatholicGatorsAdminApp extends App {
  public pageContext;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>CG Admin</title>
          <style>{`
            * {
              box-sizing: border-box;
            }

            html, body {
              height: 100%;
              width: 100%;
            }

            /* Make clicks pass-through */
            #nprogress {
              pointer-events: none;
            }

            /* color and other parameter */
            #nprogress .bar {
              background: #1976D2;

              position: fixed;
              z-index: 1000;
              top: 0;
              left: 0;

              width: 100%;
              height: 2px;
            }
          `}</style>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header></Header>
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
