import React from 'react';
import NotFoundSvg from "../../assets/404.svg";

export function NotFoundError() {
  // TODO
  return <div style={{display: "flex", width: "100vw", height: "100vh", position: "absolute", justifyContent: "center"}}>
    <img src={NotFoundSvg} alt="Not Found!"/>
  </div>;
}
