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
import {
    blue,
    orange
} from '@material-ui/core/colors';

const theme: Theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: orange,
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
