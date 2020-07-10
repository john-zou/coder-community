import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import theme from './theme';
import store from './store';
import { enableMapSet } from 'immer';

enableMapSet();

/*
import { JwtLocalStorageKey } from './constants';
import { rootReducer } from './reducers';
import RootState, {Loadable, Tag} from './store';
import theme from './theme';
import {postsCreation} from "./reducers/postsCreation";

const initialState: RootState = {
  isLoggedIn: !!localStorage.getItem(JwtLocalStorageKey),
  postsCreation: {
    title: '',
    content: '',
    tags: []
  },

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

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
 */

const Root = () => {
    console.log("INDEX::ROOT");
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
