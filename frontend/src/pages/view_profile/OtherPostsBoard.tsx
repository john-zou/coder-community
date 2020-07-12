import React, { useEffect } from "react";
import {User} from "../../store/types";
import styled from "@emotion/styled";
import Card from "../home/Card";
import { Loading } from "../common/Loading";
import {fetchUserByUsername} from "../../reducers/usersSlice";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";

const Container = styled.div`
  width: 816px; // to match the Card.tsx width
  align-content: center;
`

const PostsContainer = styled.div`
  margin-top: 34px;
  
`

export function OtherPostsBoard ({user}: {user: User}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!user?.posts) {
            dispatch(fetchUserByUsername(user.userID));
        }
    }, []);

    if (!user?.posts) {
        return <Loading />
    }

    return <Container>
        <PostsContainer>
            {user.posts.map(postID => <Card postID={postID} />)}
        </PostsContainer>
    </Container>
}