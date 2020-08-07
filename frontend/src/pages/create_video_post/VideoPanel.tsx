import * as React from "react";
import GroupList from "../create_post/GroupList";
import VideoUpload from "./VideoUpload";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { User } from "../../store/types";
import { convertArrToMap } from "../../util/helperFunctions";
import { AppDispatch } from "../../store";
import { useEffect } from "react";
import { fetchUsersByIDs } from "../../reducers/usersSlice";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import { uploadPublicAsset } from "../../api-upload";
import { createGroup } from "../../reducers/groupsSlice";

const _onVideoUpload = (event) => {
}

export interface IProps {
}

export interface IState {
  overlayActive: any;
}

class VideoPanel extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      overlayActive: true
    };
    this.closeOverlay = this.closeOverlay.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
  }

  closeOverlay() {
    this.setState({
      overlayActive: false
    });
  }

  showOverlay() {
    this.setState({
      overlayActive: true
    });
  }

  render() {
    return (
      <div
        className={"root"}
        style={{
          marginTop: "3em",
          display: "flex",
          flexDirection: "column",
          height: "30vh",
          width: "40vw",
          backgroundColor: "white",
          boxShadow: "3px 3px #F2F2F2",
          marginBottom: "1em",
          borderRadius: "5px",
          paddingLeft: "1.5em",
          paddingRight: "1.5em",
        }}
      >
        <form onSubmit={_onVideoUpload}>
          <button
            className={"button"}
            onClick={this.showOverlay}
            style={{
              border: "none",
              outline: "none",
              borderRadius: "5px",
              margin: "1em auto",
              width: "100%",
              height: "7vh",
              backgroundColor: "#F2F2F2",
              fontFamily: "Arial",
              fontSize: "1.5em"
            }}
          >
            Upload Video
            </button>
          {this.state.overlayActive && (
            <VideoUpload closeOverlay={this.closeOverlay} />
          )}
        </form>
      </div>
    );
  }
}

export default VideoPanel;

