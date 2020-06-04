import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    profileCardContainer: {
      borderRadius: "15px",
      padding: "1.5em",
    },
    editProfileBtn: {
      fontWeight: "bold",
      borderRadius: "10px",
      borderColor: "black",
    },
  })
);

export function ProfileCard({ profile }) {
  const classes = useStyles();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    firstName,
    lastName,
    isUser,
    numFollowers,
    numPosts,
    title,
    avatarImgSrc,
  } = profile;

  return (
    <div className={classes.profileCardContainer}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={avatarImgSrc}
            className={classes.large}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{title}</Typography>
        </Grid>
        <Grid item container>
          <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
              <Typography variant="h5">{numFollowers}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">followers</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
              <Typography variant="h5">{numPosts}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">posts</Typography>
            </Grid>
          </Grid>
        </Grid>
        {isUser && (
          <Button
            variant="outlined"
            className={classes.editProfileBtn}
            onClick={() => setIsEditMode(true)}
          >
            Edit profile
          </Button>
        )}
      </Grid>
    </div>
  );
}
