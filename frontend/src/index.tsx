import './index.css';

import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import { JwtLocalStorageKey } from './constants';
import { rootReducer } from './reducers';
import RootState from './store';
import theme from './theme';

const initialState: RootState = {
  isLoggedIn: !!localStorage.getItem(JwtLocalStorageKey),
  attachments: {},
  comments: {},
  conversations: {},
  groups: {},
  messages: {},
  posts: {},
  tags: {},
  users: {},
  videos: {},

  slugs: {},
  userIDs: {},

  user: { loading: false },
  trendingPosts: { loading: false },
  userOwnPosts: { loading: false },
  trendingVideos: { loading: false },
  savedPosts: { loading: false },
}

const store = createStore(rootReducer, initialState);

const Root = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>)
}

ReactDOM.render(
  <Root />,
  document.querySelector("#root")
);
