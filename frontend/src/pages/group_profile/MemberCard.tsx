import React from "react";
import {User} from "../../store/types";
import Avatar from "../common/Avatar";

export function MemberCard({user, isAdmin}: {user: User, isAdmin?: boolean}) {
  return <Avatar pic={user.profilePic} subtitle={isAdmin && "Admin"} title={user.name} extraText={user.userID}/>
}