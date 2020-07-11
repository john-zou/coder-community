import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {CurrentLoggedInUser} from "../../store/types";
import styled from '@emotion/styled';
import {ProfileBanner} from "./ProfileBanner";
import DefaultImg from "../../assets/defaultUserProfileBannerImg.jpg";
import {TradingCard} from "./TradingCard";


export function OwnProfile() {
    const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
    const src = user.profileBanner || DefaultImg;

    return (<>
        <ProfileBanner imgSrc={src}/>
        <TradingCard user={user} isCurrentUser/>
        <h1>You are viewing your own profile, {user.userID}</h1>
    </>);
}