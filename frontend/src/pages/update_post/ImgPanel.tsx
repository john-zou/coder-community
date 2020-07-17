import React from "react";
import GroupList from "./GroupList";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
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
  },
  button: {
    border: "none",
    outline: "none",
    borderRadius: "5px",
    margin: "2em auto",
    width: "100%",
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
    
export default function ImgPanel(params) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form onSubmit={_onImgUpload}>
      	<button className={classes.button} onClick={_onImgUpload}>Upload Photos</button>
      </form>
    </div>
  );
}
