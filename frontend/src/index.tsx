import './index.css';

import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import { JwtLocalStorageKey } from './constants';
import { rootReducer } from './reducers';
import RootState, { SelectedTab } from './store';
import theme from './theme';

const initialState: RootState = {
  isLoggedIn: !!localStorage.getItem(JwtLocalStorageKey),
  selectedTab: SelectedTab.DEFAULT,
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
  browsingGroups: { loading: false },
  userOwnPosts: { loading: false },
  trendingVideos: { loading: false },
  savedPosts: { loading: false },
}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

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
