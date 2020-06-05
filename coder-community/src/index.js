import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";

const store = createStore(rootReducer);

// Mina
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </Provider>

    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector('#root'),
);

