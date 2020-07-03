import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import "./index.css";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { Loading } from "./pages/common/Loading";
import { TrendingApi } from "./api";
// import initialData from "./initialData";

const Root = () => {
  const [initialState, setInitialState] = useState({});
  // const isLoggedIn = useSelector<RootState, IsLoggedIn>(state => state.isLoggedIn)

  useEffect(() => {
    async function getInitialData() {
      const api = new TrendingApi();
      const trendingPosts = await api.trendingControllerGetTrending();
      const initialData = { trendingPosts };
      setInitialState(initialData);
    }
    getInitialData();
  }, []);

  console.log(initialState);
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
