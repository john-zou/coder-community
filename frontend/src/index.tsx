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
// import initialData from "./initialData";

const Root = () => {
  const [initialState, setInitialState] = useState({});
  //load maximum of 50 posts from db
  useEffect(() => {
    fetch("http://localhost:3001/api/posts").then((res) => {
      res.json().then((dataFromBackend => {
        setInitialState(dataFromBackend);
      }))
    }).catch(err => {
      console.log(err);
    })
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
