import React from "react";

const ErrorPage = ({ error }) => {
  return (<h3 style={{ height: "500px", top: "200px" }}>{JSON.stringify(error)}</h3>)
}

export default ErrorPage;