import React from "react";
import {useParams} from "react-router-dom";
import {CodeParams, ViewProfileParams} from "../../App";

export default function CodeTogether() {
  const { roomID } = useParams<CodeParams>();

  return <> </>
}