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
    boxShadow: "8px 8px 16px #d4d4d4, -8px -8px 16px #f5f5f5",
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
    height: "7vh",
    backgroundColor: "#F2F2F2",
    '&:hover': {
      backgroundColor: "#fafafa",
    },
    fontFamily: "Arial",
    fontSize: "1.5em"
  }
});

export default function ImgPanel({ setImg }) {
  const classes = useStyles();
  const handleImageUpload = img => {
    console.log("CREATEPOST::IMGPANEL");
    console.log(img);
    setImg(img)
  }
  return (
    <div className={classes.root}>
      <form>
        <ImageUploader
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
