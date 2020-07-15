import { Dictionary } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User } from "../../store/types";
import AddMultiple from "../group/AddMuliple";
import { ChatHeader } from "./ChatArea";
import { H2 } from "./ChatInfo";


export const NewConversation = ({ setPeople }) => {
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <H2>New message</H2>
          {/* <p>ViewProfile</p> */}
          <AddMultiple label="To: Select names to send message" options={Object.values(users)} imgKey="profilePic" setItems={setPeople}></AddMultiple>
        </div>
      </div>
    </ChatHeader>
  )
}