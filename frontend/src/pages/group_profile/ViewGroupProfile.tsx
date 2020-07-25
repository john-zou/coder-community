import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {ViewGroupParams} from '../../App';
import {Loading} from '../common/Loading';
import {NotFoundError} from '../common/NotFoundError';
import {RootState} from '../../reducers/rootReducer';
import {CurrentLoggedInUser, Group} from '../../store/types';
import {ProfileBanner} from '../view_profile/ProfileBanner';
import {Container, FlexSpace, HeightSpace, WidthSpace} from '../view_profile/OwnProfile';
import DefaultImg from "../../assets/defaultUserProfileBannerImg.jpg";
import {GroupTradingCard} from './GroupTradingCard';
import {GroupProfileTabs} from './GroupProfileTabs';
import {fetchGroupById} from "../../reducers/groupsSlice";
import {AppDispatch} from "../../store";
import {unwrapResult} from "@reduxjs/toolkit";

export function ViewGroupProfile() {
  const {groupID} = useParams<ViewGroupParams>();
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const group = useSelector<RootState, Group>(state => state.groups.entities[groupID]);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!group) {
      dispatch(fetchGroupById(groupID))
        .then(unwrapResult)
        .catch(() => {
          setError(true);
        })
    }
  }, [groupID]);

  if (error) {
    return <NotFoundError/>
  }

  if (!group) {
    return <Loading />
  }

  const src = group.profileBanner || DefaultImg;

  return (
    <>
      <ProfileBanner imgSrc={src}/>
      <HeightSpace height="26px"/>
      <Container>
        <FlexSpace flex={1}/>
        <div>
          <GroupTradingCard group={group}/>
        </div>
        <WidthSpace width="47px"/>
        <GroupProfileTabs group={group}/>
        <FlexSpace flex={3}/>
      </Container>
    </>
  );
}