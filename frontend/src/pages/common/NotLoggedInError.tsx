import React from "react";
import NotFoundSvg from "../../assets/404.svg";

export function NotLoggedInError() {
    return <div style={{display: "flex", width: "100vw", height: "100vh", position: "absolute", justifyContent: "center"}}>
        <img src={NotFoundSvg} alt="Please log in first to see this page!"/>
    </div>
}