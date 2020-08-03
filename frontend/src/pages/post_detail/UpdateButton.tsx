import { Link, useHistory } from "react-router-dom";
import PurpleButton from "../common/PurpleButton";
import React from "react";

function UpdateButton(params) {
  const history = useHistory();

  const handleClick = () => {
    console.log("POSTDETAIL::UPDATE");
    console.log(params);
    // console.log(params.slug);
    history.push(`/update-post/${params.slug}`);
  }
  return (<PurpleButton handleClick={handleClick} content={"Update Post"}></PurpleButton>);
}

export default UpdateButton;