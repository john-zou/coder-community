import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux';
// import { createTitle, createContent } from '../../actions/postsCreation';
// import { createTitle, createContent } from '../../reducers/postsCreationSlice';
// import { RootState, Post } from '../../initialData';

const useStyles = makeStyles({
  cptext: {
    display: "flex",
    outline: "none",
    flexDirection: "column",
    height: "60vh",
    width: "40vw",
    backgroundColor: "white",
    boxShadow: "3px 3px #F2F2F2",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
  },
  cptitle: {
    border: "none",
    outline: "none",
    '&:hover': {
      backgroundColor: "#F2F2F2",
    },
    margin: "0.5em auto",
    width: "100%",
    height: "10vh",
    fontFamily: "Arial",
    fontSize: "2em"
  },
  cpcontent: {
    border: "none",
    outline: "none",
    '&:hover': {
      backgroundColor: "#F2F2F2",
    },
    margin: "0.5em auto",
    width: "100%",
    height: "15vh",
    fontFamily: "Arial",
    fontSize: "1em",
    fontWeight: "bold",
    display: "flex",
    overflow: "auto"
  },
});

/*
const updateContent = (event, dispatch) => {
  dispatch(createContent(event.target.value));
}

const updateTitle = (event, dispatch) => {
  // alert(event.target.value);
  dispatch(createTitle(event.target.value));
}
 */

export default function TextPanel(param) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.cptext}>
      <form>
        <input className={classes.cptitle} type="text" placeholder="Title" onChange={(event) => {
          param.setTitle(event.target.value);
        }}>
        </input>
        <br></br>
        <textarea className={classes.cpcontent} id="text" onChange={(event) => {
          param.setContent(event.target.value);
        }} placeholder="Type content"></textarea>
      </form>
    </div>
  );
}