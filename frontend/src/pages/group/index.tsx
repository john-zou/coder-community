import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import Avatar from "../common/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User, Group } from "../../store/types";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import { fetchGroups, leaveGroup, joinGroup, selectGroup } from "../../reducers/groupsSlice";
import PurpleButton from "../common/PurpleButton";
import { CreateGroupModal } from "./CreateGroupModal";
import { Link } from "react-router-dom";

const GroupContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 5px;
  box-shadow: 8px 8px 16px #d4d4d4,
              -8px -8px 16px #f5f5f5;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  border-bottom: solid 1px lightgray;
`;

const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
  overflow-y: scroll;
  margin-bottom: 5vh;
`;

const GroupCard = ({ currentGroup, isUserAMember }: { currentGroup: Group, isUserAMember: boolean }) => {
  const dispatch = useDispatch();

  const handleJoinGroup = () => {
    dispatch(joinGroup(currentGroup._id));
  }
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(currentGroup._id));
  }

  if (!currentGroup)
    return <div><h1>NULL GROUP</h1></div>

  return <div>
    <div style={{ display: "flex", flexDirection: "row" }}>

      <Link to={`/group/${currentGroup._id}`} style={{ textDecoration: "none" }}>
        <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText="" />
      </Link>

      <div style={{ flex: 1 }}></div>
      <div style={{ marginTop: "30px" }}>
        {!isUserAMember && <div onClick={handleJoinGroup}>
          <PurpleButton content="Join Group" /> </div>}
        {isUserAMember && <div onClick={handleLeaveGroup}> <PurpleButton content="Leave Group" /> </div>}
      </div>
    </div>
  </div>
}

export default function GroupTab() {
  const user = useSelector<RootState, User>(state => state.user);
  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities);

  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchGroups()).then(unwrapResult).then(() => {
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setError(err);
    })
  }, []);

  if (loading || !groups) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
  }

  const joinedGroupIDs = user.groups;
  const otherGroupsIDs = Object.keys(groups).filter((_id) => {
    return !joinedGroupIDs.includes(_id);
  })

  return (
    <GroupContainer>
      <Header>
        <span><h2>Groups</h2></span>
        <div style={{ flex: 1 }}></div>
        <span>
          <CreateGroupModal />
        </span>
      </Header>

      <hr style={{ color: "black" }}></hr>
      <GroupContent>
        {joinedGroupIDs.length > 0 && <>
          <h3>Your groups</h3>
          {joinedGroupIDs.map((_id) => {
            return <GroupCard currentGroup={groups[_id]} key={_id} isUserAMember={true} />
          })}
        </>}

        {joinedGroupIDs.length === 0 && <h3>Groups you may be interested in</h3>}
        {joinedGroupIDs.length > 0 && <h3>Other groups</h3>}
        {otherGroupsIDs.map((_id) => {
          return <GroupCard currentGroup={groups[_id]} key={_id} isUserAMember={false} />
        })}
      </GroupContent>
    </GroupContainer >
  );
}