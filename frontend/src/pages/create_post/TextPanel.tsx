import React from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import { setTitle, setText } from '../../actions';
// import { useSelector } from 'react-redux';
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

const _onTitle = (event) => {
  this.props.setTitle(event.target.value);
}

const _onText = (event) => {
  this.props.setText(event.target.value);
}

function TextPanel() {
  const classes = useStyles();
  // const posts = useSelector<RootState, Post[]>(
  //	(state) => state.posts);
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

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { setTitle, setText })(TextPanel);