import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Person from "./Person";

const useStyles = makeStyles({
  cppeople: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",
    width: "40vw",
    backgroundColor: "white",
    boxShadow: "3px 3px #F2F2F2",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
  },
  h4: {
    marginBottom: "0.5em"
  },
  display: {
    marginBottom: "1em",
    fontWeight: "bold"
  },
  input: {
    border: "none",
    outline: "none",
    background: "white",
    '&:hover': {
       backgroundColor: "#F2F2F2",
    },
    width: "100%",
    height: "2em",
  },
  people: {
    display: "flex",
    flexDirection: "row",
    margin: "0 0",
    padding: "0 0"
  },
});

const _onChange = (event) => {
      this.cur = event.target.value;
      // this.props.load(event.target.value);
}

const _onSubmit = (event) => {
        event.preventDefault();
        // this.props.store('MESS_ADD', this.props.input);
    this.props.setTag(this.cur);
}

const _onDel = (event) => {
      
}

export default function PeoplePanel() {
  const classes = useStyles();
  const alltags = [];
  return (
    <div className={classes.cppeople}>
    	 <form id="peopleform">
            <h4 className={classes.h4}>Add people</h4>
    	    <hr className={classes.display}></hr>
            <ul className={classes.people}>
	        <Person/>
	    </ul>
	    <input className={classes.input} onChange={_onChange} placeholder="Type here"></input>
	    <br></br>
	    <button onClick={_onSubmit}>Submit</button>
          </form>
    </div>
  );
}
