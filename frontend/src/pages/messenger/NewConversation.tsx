import { Dictionary } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User } from "../../store/types";
import { getFollowingFollowersOfUser } from "../../util/helperFunctions";
import AddMultiple from "../group/AddMuliple";
import { ChatHeader } from "./ChatArea";
import { H2 } from "./ChatInfo";


export const NewConversation = ({ setPeople }) => {
  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const user = useSelector<RootState, User>(state => state.user);
  let followingFollowers: User[] = getFollowingFollowersOfUser(usersMap, user);

  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <H2>New message</H2>
          <AddMultiple label="To: Select names to send message" options={followingFollowers} imgKey="profilePic" setItems={setPeople}></AddMultiple>
        </div>
      </div>
    </ChatHeader>
  )
}