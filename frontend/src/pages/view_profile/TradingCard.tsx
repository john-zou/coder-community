import React from "react";
import styled from '@emotion/styled';
import {User} from "../../store/types";

const Container = styled.div`
  height: 350px;
  width: 288px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

const AvatarPic = styled.img`
  margin-top: 19px;
  margin-left: 98px;
  margin-right: 98px;
  width: 92px;
  height: 92px;
  border-radius: 100px;
`

const AllCapsName = styled.h3`
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

const Subtitle = styled.h4`
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

const FollowersAndPostsCountContainer = styled.div`
  display: flex;
  
`

const FollowersCountContainer = styled.div`
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  padding: 0;
  margin: 0;
  
  color: #000000;
`

const PostsCountContainer = FollowersCountContainer;

const BigBoldNumber = styled.p`
  padding: 0;
  margin: 0;
  font-family: Roboto, sans-serif;;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`

const SpaceBetweenFollowersAndPosts = styled.div`
  width: 87px;
`

const SpaceAround = styled.div`
  flex: 1;
`

const EditProfileButton = styled.button`
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
export function TradingCard({user, isCurrentUser}: {user: User, isCurrentUser?: boolean}) {
    return (<Container>
        <AvatarPic src={user.profilePic} />
        <AllCapsName>{user.name.toUpperCase()}</AllCapsName>
        <Subtitle>{user.status}</Subtitle>
        <FollowersAndPostsCountContainer>
            <SpaceAround />
            <FollowersCountContainer>
                <BigBoldNumber>
                    {user.followers?.length || 'x'}
                </BigBoldNumber>
                followers
            </FollowersCountContainer>
            <SpaceBetweenFollowersAndPosts />
            <PostsCountContainer>
                <BigBoldNumber>
                    {user.posts?.length || 'x'}
                </BigBoldNumber>
                posts
            </PostsCountContainer>
            <SpaceAround />
        </FollowersAndPostsCountContainer>
        <SpaceAround/>
        {isCurrentUser &&
        <EditProfileButton onClick={() => console.log("edit profile button clicked!")}>Edit profile</EditProfileButton>}
    </Container>)
}