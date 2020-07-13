import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {ImageType} from "../../constants";
import {UpdateImageModal} from "../common/UpdateImageModal";

const useStyles = makeStyles(() =>
  createStyles({
    bannerImg: {
      maxHeight: "284px",
      marginLeft: "10%",
      width: "80%",
      objectFit: "none",
    },
  })
);

export function ProfileBanner({ imgSrc }) {
  const classes = useStyles();

  return (
    <div style={{ height: "284px" }}>
      <img className={classes.bannerImg} src={imgSrc} alt="banner"></img>
    </div>
  );
}
