import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux';

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

export default function TextPanel(param) {
  const { title, content } = param;
  const classes = useStyles();
  return (
    <div className={classes.cptext}>
      <form>
        <input className={classes.cptitle} type="text" placeholder={title || "Title"} onChange={(event) => {
          param.setTitle(event.target.value);
        }}>
        </input>
        <br></br>
        <textarea className={classes.cpcontent} id="text" onChange={(event) => {
          param.setContent(event.target.value);

        }} placeholder={content || "Type content"}></textarea>
      </form>
    </div>
  );
}
