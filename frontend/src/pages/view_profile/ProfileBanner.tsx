import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    bannerImg: {
      maxHeight: "300px",
      width: "100%",
      objectFit: "cover",
    },
  })
);

export function ProfileBanner({ imgSrc, isUser }) {
  const classes = useStyles();
  return (
    <div style={{ height: "300px" }}>
      <img className={classes.bannerImg} src={imgSrc} alt="banner"></img>
    </div>
  );
}
