import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileCard } from "./ProfileCard";
import { ProfileBoard } from "./ProfileBoard";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Loading } from "../common/Loading";
import { NotFoundError } from "../common/NotFoundError";
import { ServerError } from "../common/ServerError";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateAreas: `
        "banner banner banner"
        "card board space"
      `,
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    banner: {
      gridArea: "banner",
    },
    card: {
      gridArea: "card",
    },
    board: {
      gridArea: "board",
      backgroundColor: "red",
    },
  })
);

export function ViewProfile() {
  const { username } = useParams();
  const [profile, loading, error] = useUserInfo(username);
  const classes = useStyles();

  if (loading) {
    console.log("Loading!");
    return <Loading></Loading>;
  }
  if (error) {
    if (error.status === 404) {
      return <NotFoundError></NotFoundError>;
    } else {
      return <ServerError></ServerError>;
    }
  }

  const { isUser, bannerImgSrc } = profile;

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <ProfileBanner imgSrc={bannerImgSrc} isUser={isUser}></ProfileBanner>
      </div>
      <div className={classes.card}>
        <ProfileCard profile={profile}></ProfileCard>
      </div>
      <div className={classes.board}>
        <ProfileBoard username={username} isUser={isUser}></ProfileBoard>
      </div>
    </div>
  );
}
