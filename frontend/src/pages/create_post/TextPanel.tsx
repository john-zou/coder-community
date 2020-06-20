import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

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

const _onTitle = (event) => {
      
}

const _onText = (event) => {
    // this.props.load(event.target.value);
}

const _onSubmit = (event) => {
    // event.preventDefault();
    // this.props.store('MESS_ADD', this.props.input);
}

export default function TextPanel() {
  const classes = useStyles();
  return (
    <div className={classes.cptext}>
       <form>
       	    <input className={classes.cptitle} type="text" placeholder="Title" onChange={_onTitle}></input>
	    <br></br>
       	    <textarea className={classes.cpcontent} id="text" onChange={_onText} placeholder="Type content"></textarea>
       </form>
    </div>
  );
}
