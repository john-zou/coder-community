import './index.css';

import {ThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import theme from './theme';
import store from './store';
import {RecoilRoot} from "recoil/dist";

const Root = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecoilRoot>
            <App/>
          </RecoilRoot>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>)
}

ReactDOM.render(
  <Root/>,
  document.querySelector("#root")
);
