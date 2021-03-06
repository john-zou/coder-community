import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { CurrentLoggedInUser } from "../../store/types";
import styled from '@emotion/styled';
import { ProfileBanner } from "./ProfileBanner";
import DefaultImg from "../../assets/defaultUserProfileBannerImg.jpg";
import { TradingCard } from "./TradingCard";
import { OwnPostsBoard } from "./OwnPostsBoard";

export const Container = styled.div`
  display: flex;
`

export const FlexSpace = styled.div<{ flex?: number }>`
  flex: ${props => props.flex || 1};
`

export const WidthSpace = styled.div<{ width: string }>`
  width: ${props => props.width};
`

export const HeightSpace = styled.div<{ height: string }>`
  height: ${props => props.height};
`

export function OwnProfile() {
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const src = user.profileBanner || DefaultImg;
  const [followingFollowerView, setFollowingFollowerView] = useState(false);

  return (
    <>
      <ProfileBanner imgSrc={src} />
      <HeightSpace height="26px" />
      <Container>
        <FlexSpace flex={1} />
        <TradingCard user={user} isCurrentUser setFollowingFollowerView={setFollowingFollowerView} />
        <WidthSpace width="47px" />
        <OwnPostsBoard user={user} followingFollowerView={followingFollowerView} />
        <FlexSpace flex={3} />
      </Container>
    </>
  );
}