import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import "./index.css";
import { Provider } from "react-redux";
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
      const api = new TrendingApi({ basePath: "http://localhost:3001" });
      const initialData = await api.trendingControllerGetTrending();
      // console.log(initialState);
      setInitialState(initialData); //contains posts and authors
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
