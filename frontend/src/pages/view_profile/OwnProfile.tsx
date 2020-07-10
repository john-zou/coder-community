import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {CurrentLoggedInUser} from "../../store/types";

export function OwnProfile() {
    const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);

    return <><h1>You are viewing your own profile, {user.userID}</h1></>;
}