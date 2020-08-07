import * as React from "react";
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
import ImageUploader from "react-images-upload";
import { TextFields } from "../group/TextFields";
import AddMultiple from "../group/AddMuliple";
import RadioButtons from "../group/RadioButtons";
import PurpleButton from "../common/PurpleButton";

export interface IProps {
  closeOverlay: any;
  // setUrl:any;
}

export interface IState {
  name: string;
  path: string;
  preview: any;
  data: any;
}

class VideoUpload extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      path: "",
      preview: null,
      data: null,
    };
    this.changePath = this.changePath.bind(this);
    this.upload = this.upload.bind(this);
    this.cancel = this.cancel.bind(this);
  }


  //change the path and autoPlay
  changePath(e: any) {
    console.log(e.target.files.length);
    //for loop to implement multiple files uploading
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      console.log(file);
      if (!file) {
        return;
      }
      let { src, preview } = file;
      src = URL.createObjectURL(file);
      preview = <video src={src} height={450} width={800} autoPlay controls />;
      this.setState({
        path: file.name,
        data: file,
        preview: preview
      });
    }
  }


  //file upload
  upload(event) {
    event.preventDefault();  // let the website wont refresh after click upload
    const data = this.state.data;
    const url = "";
    uploadPublicAsset(data).then(res => { console.log(res) }); // res(url), after upload a file, click the link on console and will show the uploaded file

    //show file uploaded
    alert(this.state.path.toString() + " is successfully uploaded!");
  }

  //cancel file playing
  cancel() {
    this.props.closeOverlay();
  }

  render() {
    const { path, preview } = this.state;
    return (
      <div>
        <div className="row">
          <div className="row-input">
            <span
              style={{
                fontFamily: "Arial",
              }}
            >
              {path ? path : "Choose files"}</span>
            <br />
            <input
              type="file"
              accept="video"
              multiple
              onChange={this.changePath}
              style={{
                fontFamily: "Arial",
              }}
            />
          </div>
        </div>

        <button
          className="primary upload"
          onClick={this.upload}
          style={{
            fontFamily: "Arial",
          }}
        >
          upload
        </button>
        &nbsp;
        <button
          className="primary cancel"
          onClick={this.cancel}
          style={{
            fontFamily: "Arial",
          }}
        >
          cancel
        </button>
        <div
          className="media"
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {preview}</div> {/* video content */}
        <br />
      </div>
    );
  }
}

export default VideoUpload;