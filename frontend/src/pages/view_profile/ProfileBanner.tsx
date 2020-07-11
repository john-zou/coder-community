import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {ImageType} from "../../constants";
import {UpdateImageModal} from "../common/UpdateImageModal";

const useStyles = makeStyles(() =>
  createStyles({
    bannerImg: {
      maxHeight: "300px",
      width: "100%",
      objectFit: "none",
    },
  })
);

export function ProfileBanner({ imgSrc, isUser }) {
  const classes = useStyles();


  function handleClick() {
      if (isUser) {

      }
  }

  return (
    <div style={{ height: "284px" }} onClick={handleClick}>
      <img className={classes.bannerImg} src={imgSrc} alt="banner"></img>
      <UpdateImageModal type={ImageType.BannerPic} />
    </div>
  );
}
