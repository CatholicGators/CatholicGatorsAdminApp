import React from 'react';
import { Provider } from "react-redux";
import JssProvider from 'react-jss/lib/JssProvider';

import Router from 'next/router';
import App, { Container } from 'next/app';
import Head from 'next/head';
import withRedux from "next-redux-wrapper";
import NProgress from 'nprogress';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../src/components/Layout/Header";
import getPageContext from '../src/material/getPageContext';
import initStore from "../src/store";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class CatholicGatorsAdminApp extends App {
  public pageContext;

  constructor(public props: any) {
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
    const { Component, pageProps, store } = this.props;
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
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
                
            <Provider store={store}>
              <Header>
                <Component pageContext={this.pageContext} {...pageProps}/>
              </Header>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(initStore)(CatholicGatorsAdminApp);
