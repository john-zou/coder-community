import * as React from "react";

export interface IProps {
  closeOverlay: any;
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
      data: null
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
  upload() {
    const data = this.state.data;
    const url = "";
    const form = new FormData();
    form.append("file", data);
    fetch(url, {
      method: "POST",
      body: form
    }).then(res => {
      console.log(res);
    });
    console.log(this.state.name);

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