import React from "react";
import { User } from "../../store/types";
import Avatar from "../common/Avatar";

export function MemberCard({ user, isAdmin, titleSrc }: { user: User, isAdmin?: boolean, titleSrc?: string }) {
  console.log("member card: ", user)
  return <Avatar pic={user.profilePic} subtitle={isAdmin ? "Admin" : "Member"} title={user.name} extraText={user.userID} titleSrc={titleSrc} />
}