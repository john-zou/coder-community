import * as React from "react";
import {uploadPublicAsset} from "../../api-upload";
import VideoRecorder from 'react-video-recorder'

export interface IProps {
}

export interface IState {
    name: string;
    path: string;
    // preview: any;
    data: any;
}

class RecordUpload extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            path: "",
            // preview: null,
            data: null,
        };
        this.changePath = this.changePath.bind(this);
        this.upload = this.upload.bind(this);
        // this.cancel = this.cancel.bind(this);
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
            // let { src, preview } = file;
            // src = URL.createObjectURL(file);
            // preview = <video src={src} height={450} width={800} autoPlay controls />;
            this.setState({
                path: file.name,
                data: file,
                // preview: preview
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

        //show file uploaded
        alert(this.state.path.toString() + " is successfully uploaded!");
    }

    render() {
        const { path } = this.state;
        return (
            <div>
            <button
                className={"button"}
                // onClick={this.showOverlay}
                onClick={this.upload}
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
                Record Video
            </button>
            <VideoRecorder
        onRecordingComplete={(videoBlob) => {
            // Do something with the video.
            console.log('videoBlob', videoBlob)
        }}
        />
            </div>
        );
    }
}

export default RecordUpload;