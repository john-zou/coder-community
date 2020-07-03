import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setImg, setTitle, setText, setTag, delTag, setPeople } from '../../actions';


const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

const _onSubmit = (event) => {
}

const _onCancel = (event) => {}

function Submit() {
  const classes = useStyles();
  return (
     <div className={classes.operation}>
        <button color="primary" onClick={_onCancel}>Cancel</button>
        <button color="primary" onClick={_onSubmit}>Submit</button>
     </div>
  );
}

const mapStateToProps = (state) => {
    return { img: state.imgurl, tit: state.title, txt: state.text, tags: state.tags, people: state.people };
}

export default connect(mapStateToProps, { setImg, setTitle, setText, setTag, delTag, setPeople })(Submit);