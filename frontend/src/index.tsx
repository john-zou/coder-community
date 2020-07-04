import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { Loading } from "./pages/common/Loading";
import { TrendingApi } from "./api";
import { convertArrToMap } from "./util/helperFunctions";
import { setInitialTrendingPosts } from "./actions/posts";
import { Post, User } from "./store";

const Root = () => {
  const [initialState, setInitialState] = useState({});
  // const isLoggedIn = useSelector<RootState, IsLoggedIn>(state => state.isLoggedIn)
  const dispatch = useDispatch();
  useEffect(() => {
    async function getInitialData() {
      const api = new TrendingApi({ basePath: "http://localhost:3001" });
      const initialData = await api.trendingControllerGetTrending();//{posts: [], users: []}
      const posts: Record<string, Post> = convertArrToMap(initialData.posts);
      const users: Record<string, User> = convertArrToMap(initialData.users);
      setInitialState({ posts, users });
      dispatch(setInitialTrendingPosts(posts, users));
      // console.log(initialState);
    }
    getInitialData();
  }, []);

  if (Object.keys(initialState).length === 0) {
    return <Loading />
  }
  const store = createStore(rootReducer, initialState);
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
