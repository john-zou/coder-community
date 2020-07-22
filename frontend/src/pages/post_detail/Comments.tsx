import React, {useState} from "react";
import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Dictionary} from "@reduxjs/toolkit";
import {Comment, Post} from "../../store/types";
import {Loading} from "../common/Loading";
import WriteThefirstComment from "../../assets/write_the_first_comment.svg";
import Avatar from "../common/Avatar";

const Container = styled.div`

`

const NoCommentsContainer = styled.div`
  text-align: center;
`

const SubtleEncouragement = styled.p`
  color: gray;
  font-style: italic;
`

function postHasNoComments() {
  return (<NoCommentsContainer>
    <SubtleEncouragement>No comments yet...</SubtleEncouragement>
    <img height={150} src={WriteThefirstComment} alt='Write the first comment'/>
    <SubtleEncouragement>Write the first comment below!</SubtleEncouragement>
  </NoCommentsContainer>)
}

export function Comments({postID}:{postID?:string}) {
  const post = useSelector<RootState, Post>(state => state.posts.entities[postID]);

  if (!post?.content) {
    console.log('post_detail/Comments.tsx render .. post is not loaded');
    return <Loading />
  }

  if (post.comments.length === 0) {
    return postHasNoComments();
  }

  // TODO: web socket interaction

  return (
    <Container>

    </Container>
  )
}