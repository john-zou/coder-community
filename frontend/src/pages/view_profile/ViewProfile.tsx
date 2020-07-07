import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ViewProfileParams } from '../../App';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import { getLoggedInUser, getUserForViewProfile } from '../../reducers/userSlice';
import { RootState } from '../../reducers/rootReducer';
import { User } from '../../store/types';

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The one doing the viewing
  const currentUser = useSelector<RootState, User>(
    (state) => state.user
  );

  let viewedUser = useSelector<RootState, User>(
    (state) => {
      const userObjectID = state.user._id;
      return state.users[userObjectID];
    }
  )

  // Get user if user hasn't loaded yet
  useEffect(() => {
    // check redux cache for user(s)
    if (isLoggedIn) {
      // check current user
      if (!currentUser && !loading && !error) {
        dispatch(getLoggedInUser());
      }
    }
    if (currentUser && currentUser.userID === username) {
      // Current user is looking at own profile, so there is no other user info to get
      return;
    }
    if (!viewedUser) {
      dispatch(getUserForViewProfile(username));
      return;
    }
    if (viewedUser && !loading && !error && !viewedUser.posts) {
      dispatch(getUserForViewProfile(username));
    }
  }, []);

  if (!currentUser || loading || !viewedUser) {
    return <Loading />
  }

  if (error) {
    return <NotFoundError />
  }

  const userIsLookingAtOwnProfile = isLoggedIn && currentUser?.userID === username;
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
