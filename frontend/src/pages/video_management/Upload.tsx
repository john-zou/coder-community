import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideoPanel from "./VideoPanel";
import TextP from "../create_post/TextPanel";
import TagP from "../create_post/TagPanel";
import PeopleP from "../create_post/PeoplePanel";

export default function Upload() {
    return (
    <div
     style={{
          alignItems: "center",
           display: "flex",
           flex: 1,
           paddingTop: "7vh",
           paddingBottom: "7vh",
           flexDirection: "column",
          }}
    >
      <VideoPanel />
     <div style={{height: "50vh"}}>
      <TextP />
       <TagP />
       <PeopleP />
       </div>
      </div>
    );
}

