import React from "react";
import Tag from "./Tag";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cptag: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "3px 3px #F2F2F2",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
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
  const tags = params.tags;
  return (
    <div className={classes.cptag}>
      <ul className={classes.tags}>{
        tags.map(tag => (
          <Tag tag={tag} />
        ))
      }
      </ul>
    </div>
  );
}
