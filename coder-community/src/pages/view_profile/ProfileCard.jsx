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
    container: {
      borderRadius: "15px",
      padding: "1.5em",
      backgroundColor: "white",
      margin: "0 100px",
    },
    editProfileBtn: {
      marginTop: "1.4em",
      fontWeight: "bold",
      borderRadius: "10px",
      borderColor: "black",
    },
    title: {
      marginBottom: "15px",
      fontWeight: "bolder",
    },
    num: {
      fontWeight: "bold",
    },
    tiny: {
      fontWeight: "light",
      fontSize: "0.8em",
    },
  })
);

export function ProfileCard({ profile }) {
  const classes = useStyles();
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
    <div className={classes.container}>
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
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.num}>
                {numFollowers}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.tiny}>
                followers
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.num}>
                {numPosts}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.tiny}>
                posts
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {isUser && (
          <Button
            variant="outlined"
            className={classes.editProfileBtn}
            onClick={() => console.log("Edit Profile clicked")}
          >
            Edit profile
          </Button>
        )}
      </Grid>
    </div>
  );
}
