import React from "react";
import styled from '@emotion/styled';
import { User } from "../../store/types";
import { useFollow, UseFollowHook } from "../../hooks/useFollow";
import { Loading } from "../common/Loading";

export const TradingCardContainer = styled.div`
  height: 350px;
  width: 288px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

export const AvatarPic = styled.img`
  margin-top: 19px;
  margin-left: 98px;
  margin-right: 98px;
  width: 92px;
  height: 92px;
  border-radius: 100px;
`

export const AllCapsName = styled.h3`
  padding: 0;
  margin-top: 16px;
  margin-bottom: 0;
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
  text-align: center;
`

export const Subtitle = styled.h4`
  margin-top: 4px;
  padding: 0;
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  text-align: center;
`;

export const FollowersAndPostsCountContainer = styled.div`
  display: flex;

`

export const FollowersCountContainer = styled.div`
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  padding: 0;
  margin: 0;

  color: #000000;
`

export const PostsCountContainer = FollowersCountContainer;

export const BigBoldNumber = styled.p`
  padding: 0;
  margin: 0;
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`

export const SpaceBetweenFollowersAndPosts = styled.div`
  width: 87px;
`

export const SpaceAround = styled.div`
  flex: 1;
`

export const TradingCardButton = styled.button`
  margin-bottom: 23px;
  margin-left: 73px;
  margin-right: 73px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  width: 141px;
  height: 38px;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
`

// https://www.figma.com/file/ehowTfq9OAMUdMf3Qbngi0/Programmers-Social-Network?node-id=50%3A0
// Can be adapted to work for groups as well, need to change props
export function TradingCard({ user, isCurrentUser, followHook }: { user: User, isCurrentUser?: boolean, followHook?: UseFollowHook }) {

  // TODO: Change follow button depending on follow relationship
  function button() {
    if (isCurrentUser) {
      return (<TradingCardButton onClick={() => console.log("edit profile button clicked!")}>Edit
                profile</TradingCardButton>)
    }

    if (followHook.followsOtherUser && followHook.isFollowedByOtherUser) {
      return (<TradingCardButton onClick={(e) => followHook.handleToggleFollow(e)}>Unfollow</TradingCardButton>)
    }

    if (followHook.followsOtherUser) {
      return (<TradingCardButton onClick={(e) => followHook.handleToggleFollow(e)}>Unfollow</TradingCardButton>)
    }

    if (!followHook.followsOtherUser && followHook.isFollowedByOtherUser) {
      return (<TradingCardButton onClick={(e) => followHook.handleToggleFollow(e)}>Follow</TradingCardButton>)
    }

    // Neither is following each other
    return (<TradingCardButton onClick={(e) => followHook.handleToggleFollow(e)}>Follow</TradingCardButton>);
  }


  return (<TradingCardContainer>
    <AvatarPic src={user.profilePic} />
    <AllCapsName>{user.name.toUpperCase()}</AllCapsName>
    <Subtitle>{user.status}</Subtitle>
    <FollowersAndPostsCountContainer>
      <SpaceAround />
      <FollowersCountContainer>
        <BigBoldNumber>
          {user.followers.length}
        </BigBoldNumber>
        {user.followers.length !== 1 ? "followers" : "follower"}
            </FollowersCountContainer>
      <SpaceBetweenFollowersAndPosts />
      <PostsCountContainer>
        <BigBoldNumber>
          {user.posts.length}
        </BigBoldNumber>
                posts
            </PostsCountContainer>
      <SpaceAround />
    </FollowersAndPostsCountContainer>
    <SpaceAround />
    {button()}
  </TradingCardContainer>)
}