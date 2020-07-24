import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Dictionary, unwrapResult} from "@reduxjs/toolkit";
import {User} from "../../store/types";
import {convertArrToMap} from "../../util/helperFunctions";
import {AppDispatch} from "../../store";
import {useEffect} from "react";
import {fetchUsersByIDs} from "../../reducers/usersSlice";
import {Loading} from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import {uploadPublicAsset} from "../../api-upload";
import {createGroup} from "../../reducers/groupsSlice";
import ImageUploader from "react-images-upload";
import {TextFields} from "../group/TextFields";
import AddMultiple from "../group/AddMuliple";
import RadioButtons from "../group/RadioButtons";
import PurpleButton from "../common/PurpleButton";

// export const VideoUpload = ({ handleClose }) => {
//     const [people, setPeople] = useState<string[]>([]);
//     const [video, setVideo] = useState<File>(null);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     // const [creatingGroupLoading, setCreatingGroupLoading] = useState(false);
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     if (error) {
//         return <ErrorPage error={error} />
//     }
//
//     const handleVideoChange = video => {
//             // picture is an array containing 1 file
//             setVideo(video[0]);
//         }
//     ;
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         // Upload images if they exist
//         let video: string;
//         // upload profile pic
//         if (video) {
//             // TODO: show loading while uploading
//             video = await uploadPublicAsset(video);
//         }
//
//         const group = {
//             name,
//             description,
//             users: people,
//             video,
//             path: "",
//             preview: null,
//             data: null
//         };
//         this.changePath = this.changePath.bind(this);
//
//     }
//
//     return (
//         <>
//             {
//                 <form onSubmit={handleSubmit}>
//                     {/* https://github.com/jakehartnell/react-images-upload#readme */}
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                         <ImageUploader
//                             // {...props}
//                             buttonText='Upload video'
//                             withPreview={true}
//                             withIcon={true}
//                             onChange={handleBannerImageChange}
//                             imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
//                             maxFileSize={5242880}
//                             singleImage={true}
//                             buttonStyles={{ backgroundColor: "#6a6a6a" }}
//                         />
//                         {/* <div style={{ width: "20px" }}></div> */}
//                         <ImageUploader
//                             // {...props}
//                             buttonText='Upload profile pic'
//                             withPreview={true}
//                             withIcon={false}
//                             onChange={handleProfilePicChange}
//                             imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
//                             maxFileSize={5242880}
//                             style={{ width: "50%" }}
//                             singleImage={true}
//                             buttonStyles={{ backgroundColor: "#6a6a6a" }}
//                         />
//                     </div>
//
//                     <TextFields name="Add Group Name" description="Add Group Description" setName={setName} setDescription={setDescription} />
//
//                     {/* https://material-ui.com/components/autocomplete/#Tags.tsx */}
//                     <TextWrapper>
//                         <AddMultiple label="Add People" options={followingFollowers} imgKey="profilePic" setItems={setPeople} />
//                     </TextWrapper>
//
//                     <div style={{ height: "25px" }}></div>
//
//                     <TextWrapper>
//                         <RadioButtons setItem={setPrivate} />
//                     </TextWrapper>
//
//                     <DialogActions>
//                         <div>
//                             <PurpleButton content="Create group" />
//                         </div>
//                     </DialogActions>
//                 </form>}
//         </>
//     )
// }



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
      // uploadPublicAsset(data).then(res => {this.props.setUrl(res)});  //uploadPublicAsset return promise
      uploadPublicAsset(data).then(res => {console.log(res)}); // res(url), after upload a file, click the link on console and will show the uploaded file

      // const form = new FormData();
    // form.append("file", data);
    // fetch(url, {
    //   method: "POST",
    //   body: form
    // }).then(res => {
    //   console.log(res);
    // });
    // console.log(this.state.name);

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
            //         fontSize: "1.5em"
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
      //         fontSize: "1.5em"
              }}
            />
          </div>
        </div>

        <button
        className="primary upload"
        onClick={this.upload}
        style={{
        fontFamily: "Arial",
//         fontSize: "0.5em"
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
//         fontSize: "1.5em"
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