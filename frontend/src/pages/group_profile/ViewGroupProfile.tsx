import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ViewProfileParams } from '../../App';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import {
  getLoggedInUser
} from '../../reducers/userSlice';
import { RootState } from '../../reducers/rootReducer';
import { Group, User } from '../../store/types';
import { Dictionary } from '@reduxjs/toolkit';
import { ProfileBanner } from '../view_profile/ProfileBanner';
import { Container, FlexSpace, HeightSpace, WidthSpace } from '../view_profile/OwnProfile';
import DefaultImg from "../../assets/defaultUserProfileBannerImg.jpg";
import { TradingGroupCard } from './TradingGroupCard';
import { GroupPostsBoard } from './GroupPostsBoard';


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

export function ViewGroupProfile() {
  const classes = useStyles();

  const { username } = useParams<ViewProfileParams>();
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities);
  const currentGroupID = useSelector<RootState, string>(
    (state) => state.groups.currentGroupID)
  const currentGroup = groups[currentGroupID];

  // let viewedGroup = useSelector<RootState, Group>(
  //   (state) => {
  //     const groupObjectID = state.group._id;
  //     return state.groups[groupObjectID];
  //   }
  // )

  // Get user if user hasn't loaded yet
  useEffect(() => {
    // check redux cache for user(s)
    if (isLoggedIn) {
      // check current user
      if (!currentGroup && !loading && !error) {
        dispatch(getLoggedInUser());
      }
    }
    if (currentGroup && currentGroup._id === username) {
      // Current user is looking at own profile, so there is no other user info to get
      return;
    }
    // if (!viewedGroup) {
    //   dispatch(getUserForViewProfile(username));
    //   return;
    // }
    // if (viewedGroup && !loading && !error && !viewedGroup.posts) {
    //   dispatch(getUserForViewProfile(username));
    // }
  }, []);

  if (!currentGroup || loading) {
    return <Loading />
  }

  if (error) {
    return <NotFoundError />
  }

  const userIsLookingAtOwnProfile = isLoggedIn && currentGroup?._id === username;
  if (userIsLookingAtOwnProfile) {
    // viewedGroup = currentGroup;
  }
  const src = currentGroup.profileBanner || DefaultImg;
  return (
    <div className={classes.container}>
      <ProfileBanner imgSrc={src} />
      <HeightSpace height="26px" />
      <Container>
        <FlexSpace flex={1} />
        <TradingGroupCard group={currentGroup} isCurrentUser />
        <WidthSpace width="47px" />
        <GroupPostsBoard group={currentGroup} />
        <FlexSpace flex={3} />
      </Container>

    </div>
  );
}
