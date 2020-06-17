import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector('#root'),
);
