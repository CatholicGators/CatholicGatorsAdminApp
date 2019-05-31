import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    MuiThemeProvider,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles';

import './index.css';
import App from './modules/app/pages/App';
import * as serviceWorker from './utils/serviceWorker';

const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0019E6',
          },
        secondary: {
            main: '#F0400D',
          },
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <div>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
