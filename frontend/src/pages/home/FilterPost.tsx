import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
  },
  label: { fontFamily: "Overpass Mono, monospace" },
  row: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#FAFAFA",
    },
  },
  checkBox: { marginLeft: "auto", alignSelf: "center" },
});

const FilterPost = () => {
  const classes = useStyles();
  // const tags = useSelector<RootState, Tag[]>((state) => state.tags);
  const tags = ["c", "c++", "css", "backend", "frontend", "java", "javascript", "mongodb", "nodejs", "react", "redux"];

  return (
    <form className={classes.root}>
      {tags.map((tag) => (
        <div className={classes.row}>
          <label className={classes.label}>#{tag}</label>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className={classes.checkBox}
          />
        </div>
      ))}
    </form>
  );
};

export default FilterPost;
