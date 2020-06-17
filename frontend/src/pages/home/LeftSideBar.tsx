import React from "react";
import GroupList from "./GroupList";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "14vw",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
    height: "94vh",
    cursor: "pointer",
    paddingLeft: "7em",
  },
  diplayAccount: {
    display: "flex",
    flexDirection: "row",
  },
  displayImg: {
    width: "5em",
    height: "5em",
    borderRadius: "50%",
    marginTop: "2em",
    marginRight: "1em",
  },
  displayName: {
    marginTop: "3em",
    color: "#5DCBAF",
  },
  groupLinks: {
    marginTop: "2em",
  },
});

const LeftSideBar = ({ user }) => {
  const classes = useStyles();
  console.log(user);
  return (
    <div className={classes.root}>
      <div className={classes.diplayAccount}>
        <img className={classes.displayImg} src={user.profilePic} alt="" />
        <h3 className={classes.displayName}>{user.name}</h3>
      </div>
      <div className={classes.groupLinks}>
        <h3>Daily Challenge</h3>
        <h3>Messages</h3>
        <h3>Saved posts</h3>
        <GroupList />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(LeftSideBar);
