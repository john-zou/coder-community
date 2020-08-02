import React, { useEffect, useState } from "react";
import { Post, User } from "../../store/types";
import styled from "@emotion/styled";
import Card from "../home/Card";
import { Loading } from "../common/Loading";
import { fetchUserByUsername } from "../../reducers/usersSlice";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUserID } from "../../reducers/postsSlice";
import ErrorPage from "../common/ErrorPage";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "../../reducers/rootReducer";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

const Container = styled.div`
  width: 816px; // to match the Card.tsx width
  align-content: center;
`

const PostsContainer = styled.div`
  margin-top: 34px;

`

export function OtherPostsBoard({ user }: { user: User }) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const posts = useSelector<RootState, Dictionary<Post>>(state => state.posts.entities)
  const postsByUser = Object.values(posts).filter(post => (post.author === user._id))

  console.log(user.posts)
  useEffect(() => {
    setLoading(true)
    dispatch(fetchPostsByUserID({ userID: user._id })).then(unwrapResult).then(() => {
      setError(false)
      setLoading(false)
    }).catch(err => {
      setError(err)
    })
    if (!user?.posts) {
      dispatch(fetchUserByUsername(user.userID));
    }
  }, []);

  if (!user?.posts || loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error}></ErrorPage>
  }

  return (
    <Container>
      <PostsContainer>
        {postsByUser.map(post => <Card postID={post._id} />)}
      </PostsContainer>

      <ScrollUpButton />
    </Container>
  )

}