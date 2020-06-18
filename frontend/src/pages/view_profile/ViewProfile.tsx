import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileCard } from "./ProfileCard";
import { ProfileBoard } from "./ProfileBoard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, User, CurrentViewedProfile } from "../../initialData";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateAreas: `
        "banner banner banner"
        "card board space"
      `,
      gridTemplateColumns: "1fr 1.5fr 1fr",
      gridTemplateRows: "min-content auto",
      backgroundColor: "#E5E5E5",
      height: "100%",
    },
    banner: {
      gridArea: "banner",
      marginBottom: "1rem",
    },
    card: {
      gridArea: "card",
    },
    board: {
      gridArea: "board",
    },
  })
);

export function ViewProfile() {
  const { username } = useParams();
  const currentUserID = useSelector<RootState, string>(
    (state) => state.user.userID
  );
  const profile = useSelector<RootState, CurrentViewedProfile>(
    (state) => state.currentViewedProfile
  );

  const classes = useStyles();
  const isUser = username === currentUserID;
  const bannerImgSrc = profile.backgroundImg;

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <ProfileBanner imgSrc={bannerImgSrc} isUser={isUser}></ProfileBanner>
      </div>
      <div className={classes.card}>
        <ProfileCard profile={profile} isUser={isUser}></ProfileCard>
      </div>
      <div className={classes.board}>
        <ProfileBoard username={username} isUser={isUser}></ProfileBoard>
      </div>
    </div>
  );
}
