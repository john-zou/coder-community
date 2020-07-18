import React from "react";
import Tag from "./Tag";
import { makeStyles } from "@material-ui/core/styles";
import AddMultiple from "../group/AddMuliple";

const useStyles = makeStyles({
  cptag: {
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
    marginBottom: "0.5em",
  },
  display: {
    fontWeight: "bold",
    marginBottom: "1em",
  },
  input: {
    width: "100%",
    height: "2em",
    border: "none",
    outline: "none",
    background: "white",
    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    margin: "0 0",
    padding: "0 0",
  },
});

export default function TagPanel(params) {
  const classes = useStyles();
  const alltags = []; // useState<RootState, >()

  console.log("CREATEPOST::TAGPANEL");
  console.log(params.allTagsArr);
  return (
    <div className={classes.cptag}>
      <form id="tagform">
        {/*<h4 className={classes.h4}>Add tags</h4>
        <hr className={classes.display}></hr>
        <ul className={classes.tags}>
          <Tag />
        </ul>*/}
        <AddMultiple label="Add Tags" options={params.allTagsArr} setItems={params.setPostTags} panelWidth={"40vw"} />
        {/*<input
          className={classes.input}
          onChange={_onChange}
          placeholder="Type here"
        ></input> */}
        {/*<br></br>*/}
      </form>
      {/*<ul id="tags" onClick={_onDel}>
        {alltags}
      </ul>*/}
    </div>
  );
}
