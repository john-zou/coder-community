import React from "react";

const ErrorPage = ({ error }) => {
  return (<h3 style={{ position: "absolute", height: "500px", top: "200px" }}>Error: {JSON.stringify(error)}</h3>)
}

export default ErrorPage;