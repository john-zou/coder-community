import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { ViewProfileParams } from '../../App';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import { getLoggedInUser, getUserForViewProfile } from '../../reducers/userSlice';
import { RootState } from '../../reducers/rootReducer';
import {CurrentLoggedInUser, User} from '../../store/types';
import {OwnProfile} from "./OwnProfile";
import { OtherProfile } from './OtherProfile';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-top: 10vh;
`

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
  const {username} = useParams<ViewProfileParams>();
  const loggedInUsername = useSelector<RootState, string>(state => state.user?.userID);

  function child() {
      if (!username) {
          return <Redirect to="/"/>
      }

      if (username === loggedInUsername) {
          return <OwnProfile/>
      }

      if (!loggedInUsername || loggedInUsername !== username) {
          return <OtherProfile username={username}/>
      }
  }

  return (<Container>{child()}</Container>);
}
//
//   let viewedUser = useSelector<RootState, User>(
//     (state) => {
//       const userObjectID = state.user._id;
//       return state.users[userObjectID];
//     }
//   );
//
//   // Load the viewed user if user hasn't loaded yet
//   useEffect(() => {
//     // check redux cache for user(s)
//     if (isLoggedIn) {
//       // check current user
//       if (!currentUser && !loading && !error) {
//         dispatch(getLoggedInUser());
//       }
//     }
//     if (currentUser && currentUser.userID === username) {
//       // Current user is looking at own profile, so there is no other user info to get
//       return;
//     }
//     if (!viewedUser) {
//       dispatch(getUserForViewProfile(username));
//       return;
//     }
//     if (viewedUser && !loading && !error && !viewedUser.posts) {
//       dispatch(getUserForViewProfile(username));
//     }
//   }, []);
//
//   if (!currentUser || loading || !viewedUser) {
//     return <Loading />
//   }
//
//   if (error) {
//     return <NotFoundError />
//   }
//
//   const userIsLookingAtOwnProfile = isLoggedIn && currentUser?.userID === username;
//   if (userIsLookingAtOwnProfile) {
//     viewedUser = currentUser;
//   }
//
//   return (
//     <div className={classes.container}>
//       {/* <div className={classes.banner}>
//         <ProfileBanner imgSrc={viewedUser.item.profileBanner} isUser={userIsLookingAtOwnProfile}></ProfileBanner>
//       </div>
//       <div className={classes.card}>
//         <ProfileCard profile={profile} isUser={userIsLookingAtOwnProfile}></ProfileCard>
//       </div>
//       <div className={classes.board}>
//         {userIsLookingAtOwnProfile ? (
//           <ProfileBoard
//             isUser={userIsLookingAtOwnProfile}
//             user={viewedUser}
//             savedPosts={savedPosts}
//           ></ProfileBoard>
//         ) : (
//             <ProfileBoard isUser={false} posts={posts}></ProfileBoard>
//           )}
//       </div> */}
//     </div>
//   );
// }
