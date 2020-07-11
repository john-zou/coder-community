import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import ImageUploader from "react-images-upload";
import "../../App.css"

const useStyles = makeStyles({
  root: {
    marginTop: "3em",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "40vw",
    backgroundColor: "white",
    boxShadow: "3px 3px #F2F2F2",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
  },
  button: {
    border: "none",
    outline: "none",
    borderRadius: "5px",
    margin: "2em auto",
    // width: "100%",
    height: "7vh",
    backgroundColor: "#F2F2F2",
    '&:hover': {
      backgroundColor: "#fafafa",
    },
    fontFamily: "Arial",
    fontSize: "1.5em"
  }
});

const _onImgUpload = (event) => {
	/*
	event.preventDefault();
	alert(this.url);
	this.props.setImg(this.url);
	*/
}

const _onChange = (event) => {
	/*
	this.url = event.target.value;
	*/
}

const _omImgRm = (event) => {
	/*
	event.preventDefault();
	this.url = '';
	this.props.setImg('');
	*/
}

export default function ImgPanel({ setImg }) {
  const classes = useStyles();
  // const [image, setImage] = useState<File>(null);

  const handleImageUpload = img => {
    // console.log(image);
    setImg(img)
  }
  return (
    <div className={classes.root}>
      <form onSubmit={_onImgUpload}>
        <ImageUploader
          // {...props}
          buttonText='Upload Image'
          withPreview={true}
          withIcon={true}
          onChange={handleImageUpload}
          imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
          buttonStyles={{ backgroundColor: "#6a6a6a", boxShadow: "3px 3px #FFFFFF", }}
        />
      </form>
    </div>
  );
}
