import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography, Button } from "@material-ui/core";
import { User } from "../../store";

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
      margin: "0 auto",
      width: "250px",
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
      fontWeight: "lighter",
      fontSize: "0.8em",
    },
  })
);

type Props = {
  profile: User;
  isUser: boolean;
};
export function ProfileCard({ profile, isUser }: Props) {
  const classes = useStyles();

  const { name, followers, posts, status, profilePic } = profile;

  return (
    <div className={classes.container}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Avatar alt={name} src={profilePic} className={classes.large} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{name.toUpperCase()}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.title}>
            {status}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.num}>
                {followers}
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
                {posts}
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
