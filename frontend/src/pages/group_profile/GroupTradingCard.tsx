import React from "react";
import styled from '@emotion/styled';
import {CurrentLoggedInUser, Group} from "../../store/types";
import { AllCapsName, AvatarPic, BigBoldNumber, FollowersAndPostsCountContainer, FollowersCountContainer, PostsCountContainer, SpaceAround, SpaceBetweenFollowersAndPosts, TradingCardButton, TradingCardContainer } from "../view_profile/TradingCard";
import {RootState} from "../../reducers/rootReducer";
import {useSelector} from "react-redux";
import {initializeGitHubOAuth} from "../login/login";

const AdminsContainer = styled.div`
  text-align: center;
`

const Subtitle = styled.h4`
  margin-top: 4px;
  padding: 0;
  font-family: 'Fira Mono', monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  line-height: 23px;
  color: #606060;
  text-align: center;
`;

// https://www.figma.com/file/ehowTfq9OAMUdMf3Qbngi0/Programmers-Social-Network?node-id=50%3A0
export function GroupTradingCard({ group }: { group: Group }) {
  const membersCount = group.admins.length + group.users.length;
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);

  function bottom() {
    if (!user) {
      return <TradingCardButton onClick={initializeGitHubOAuth}>
        Login to Join
      </TradingCardButton>
    }

    if (user && group.admins.includes(user._id)) {
      return <div style={{textAlign: "center"}}>
        <h3>You are Admin <span role='img' aria-label='crown'>👑</span></h3>
        <TradingCardButton onClick={()=>{console.log('admin button clicked!')}}>
          Settings
        </TradingCardButton>
      </div>
    }

    if (user && group.users.includes(user._id)) {
      return <div style={{textAlign: "center"}}><h3>You're a Member <span role='img' aria-label='sunglasses'>😎</span></h3></div>
    }
  }

  return (<TradingCardContainer>
    <AvatarPic src={group.profilePic} />
    <AllCapsName>{group.name.toUpperCase()}</AllCapsName>
     <Subtitle>{group.description || `<Coder Community Group/>`}</Subtitle>
    <FollowersAndPostsCountContainer>
      <SpaceAround />
      <FollowersCountContainer>
        <BigBoldNumber>
           {membersCount}
        </BigBoldNumber>
        {membersCount === 1 ? "member" : "members"}
            </FollowersCountContainer>
      <SpaceBetweenFollowersAndPosts />
      <PostsCountContainer>
        <BigBoldNumber>
          {group.posts.length}
        </BigBoldNumber>
        {group.posts.length === 1 ? "post" : "posts"}
        </PostsCountContainer>
      <SpaceAround />
    </FollowersAndPostsCountContainer>
    <SpaceAround />
    <hr style={{marginTop: "20px",  width: "60%"}} />
    {bottom()}
  </TradingCardContainer>)
}