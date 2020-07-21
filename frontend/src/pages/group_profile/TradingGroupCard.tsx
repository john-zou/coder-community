import React from "react";
import styled from '@emotion/styled';
import { Group, User } from "../../store/types";
import { useFollow, UseFollowHook } from "../../hooks/useFollow";
import { Loading } from "../common/Loading";
import { AllCapsName, AvatarPic, BigBoldNumber, FollowersAndPostsCountContainer, FollowersCountContainer, PostsCountContainer, SpaceAround, SpaceBetweenFollowersAndPosts, Subtitle, TradingCardButton, TradingCardContainer } from "../view_profile/TradingCard";


// https://www.figma.com/file/ehowTfq9OAMUdMf3Qbngi0/Programmers-Social-Network?node-id=50%3A0
// Can be adapted to work for groups as well, need to change props
export function TradingGroupCard({ group, isCurrentUser, followHook }: { group: Group, isCurrentUser?: boolean, followHook?: UseFollowHook }) {

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
    <AvatarPic src={group.profilePic} />
    <AllCapsName>{group.name.toUpperCase()}</AllCapsName>
    {/* <Subtitle>{user.status}</Subtitle> */}
    <FollowersAndPostsCountContainer>
      <SpaceAround />
      <FollowersCountContainer>
        <BigBoldNumber>
          {/* {group.followers.length} */}
        </BigBoldNumber>
                followers
            </FollowersCountContainer>
      <SpaceBetweenFollowersAndPosts />
      <PostsCountContainer>
        <BigBoldNumber>
          {group.posts.length}
        </BigBoldNumber>
                posts
        </PostsCountContainer>
      <SpaceAround />
    </FollowersAndPostsCountContainer>
    <SpaceAround />
    {button()}
  </TradingCardContainer>)
}