import React, {useEffect, useState} from "react";
import {User} from "../../store/types";
import {RootState} from "../../reducers/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {fetchUserByUsername} from "../../reducers/usersSlice";
import {NotFoundError} from "../common/NotFoundError";
import {unwrapResult} from "@reduxjs/toolkit";
import {ProfileBanner} from "./ProfileBanner";
import {TradingCard} from "./TradingCard";
import styled from "@emotion/styled";
import {OtherPostsBoard} from "./OtherPostsBoard";
import { Loading } from "../common/Loading";
import DefaultImg from "../../assets/defaultUserProfileBannerImg.jpg";

const Container = styled.div`
  display: flex;
`

const FlexSpace = styled.div<{flex: number}>`
  flex: ${props => props.flex};
`

const WidthSpace = styled.div<{width: string}>`
  width: ${props => props.width};
`

const HeightSpace = styled.div<{height: string}>`
  height: ${props => props.height};
`

export function OtherProfile({username}: {username: string}) {
    const userObjectID = useSelector<RootState, string>(state => state.users.usernameToID[username]);
    const user = useSelector<RootState, User>(state => state.users.entities[userObjectID]);
    const [notFound, setNotFound] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const src = user.profileBanner || DefaultImg;

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserByUsername(username))
                .then(unwrapResult)
                .catch(err => setNotFound(true));
        }
    }, []);

    if (notFound) {
        return <NotFoundError />
    }

    if (!user) {
        return <Loading />
    }

    return <>
        <ProfileBanner imgSrc={src}/>
        <HeightSpace height="26px" />
        <Container>
            <FlexSpace flex={1} />
            <TradingCard user={user} isCurrentUser={false}/>
            <WidthSpace width="47px"/>
            <OtherPostsBoard user={user}/>
            <FlexSpace flex={3} />
        </Container>
    </>
}