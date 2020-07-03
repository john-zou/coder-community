import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CurrentViewedProfile,
  Post,
  RootState,
  SavedPost,
} from "../../store/index-old";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileBoard } from "./ProfileBoard";
import { ProfileCard } from "./ProfileCard";

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
  const posts = useSelector<RootState, Post[]>((state) => state.posts);
  const savedPosts = useSelector<RootState, SavedPost[]>(
    (state) => state.savedPosts
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
        {isUser ? (
          <ProfileBoard
            isUser={isUser}
            posts={posts}
            savedPosts={savedPosts}
          ></ProfileBoard>
        ) : (
            <ProfileBoard isUser={false} posts={posts}></ProfileBoard>
          )}
      </div>
    </div>
  );
}
