import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getLoggedInUser, getUserForViewProfile } from '../../actions/user';
import { ViewProfileParams } from '../../App';
import { Loadable, RootState, User } from '../../store';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "g rid",
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
  const classes = useStyles();

  const { username } = useParams<ViewProfileParams>();
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const dispatch = useDispatch();

  // The one doing the viewing
  const currentUser = useSelector<RootState, Loadable<User>>(
    (state) => state.user
  );

  let viewedUser = useSelector<RootState, Loadable<User>>(
    (state) => {
      const userObjectID = state.userIDs[username];
      return state.users[userObjectID];
    }
  )

  // Get user if user hasn't loaded yet
  useEffect(() => {
    // check redux cache for user(s)
    if (isLoggedIn) {
      // check current user
      if (!currentUser.item && !currentUser.loading && !currentUser.error) {
        dispatch(getLoggedInUser());
      }
    }
    if (currentUser.item && currentUser.item.userID === username) {
      // Current user is looking at own profile, so there is no other user info to get
      return;
    }
    if (!viewedUser) {
      dispatch(getUserForViewProfile(username));
      return;
    }
    if (viewedUser && !viewedUser.loading && !viewedUser.error && !viewedUser.item.posts) {
      dispatch(getUserForViewProfile(username));
    }
  }, []);

  if (!currentUser || currentUser.loading) {
    return <Loading />
  }

  if (!viewedUser || viewedUser.loading) {
    return <Loading />
  }

  if (currentUser.error || viewedUser.error) {
    return <NotFoundError />
  }

  const userIsLookingAtOwnProfile = isLoggedIn && currentUser?.item?.userID === username;
  if (userIsLookingAtOwnProfile) {
    viewedUser = currentUser;
  }

  return (
    <div className={classes.container}>
      {/* <div className={classes.banner}>
        <ProfileBanner imgSrc={viewedUser.item.profileBanner} isUser={userIsLookingAtOwnProfile}></ProfileBanner>
      </div>
      <div className={classes.card}>
        <ProfileCard profile={profile} isUser={userIsLookingAtOwnProfile}></ProfileCard>
      </div>
      <div className={classes.board}>
        {userIsLookingAtOwnProfile ? (
          <ProfileBoard
            isUser={userIsLookingAtOwnProfile}
            user={viewedUser}
            savedPosts={savedPosts}
          ></ProfileBoard>
        ) : (
            <ProfileBoard isUser={false} posts={posts}></ProfileBoard>
          )}
      </div> */}
    </div>
  );
}
