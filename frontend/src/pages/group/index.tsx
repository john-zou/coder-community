import React from "react";
import styled from '@emotion/styled';
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import RootState, { GroupsState, Loadable, User } from "../../store";

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Group({ groupIDs }) {
  const user = useSelector<RootState, Loadable<User>>(state => state.user);
  const groups = useSelector<RootState, GroupsState>(state => state.groups);

  console.log("Expecting IDs: ", groupIDs);

  console.log("User's groups array: ", user.item.groups);

  const joinedGroupIDs = user.item.groups;
  const otherGroups = groupIDs.filter((_id) => {
    return !joinedGroupIDs.items.includes(_id);
  })

  return (
    <div>
      <Header>
        <span><h2>Groups</h2></span>
        <span></span>
      </Header>

      <Container>
        <h2>Your groups</h2>
        {joinedGroupIDs.items.map((_id) => {
          const currentGroup = groups[_id].item;
          return <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText=""></Avatar>
        })}

        <h2>Other groups</h2>
        {otherGroups.map((_id) => {
          const currentGroup = groups[_id].item;
          return <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText=""></Avatar>
        })}
      </Container>
    </div >
  );
}
