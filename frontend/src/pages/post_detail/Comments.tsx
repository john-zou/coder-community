import React, {useContext, useEffect, useState} from "react";
import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Dictionary} from "@reduxjs/toolkit";
import {Comment, Post} from "../../store/types";
import {Loading} from "../common/Loading";
import WriteThefirstComment from "../../assets/write_the_first_comment.svg";
import Avatar from "../common/Avatar";
import {SocketContext} from "../../App";
import {
  GetCommentsByPostIDEvent,
  GetCommentsClientToServerDto
} from "../../ws-dto/comments/dto/getCommentsByPostID.ws.dto";
import {TopLevelComment} from "./TopLevelComment";

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
  const fetchedComments = useSelector<RootState, boolean>(state => state.posts.fetchedComments[postID]);
  const socket = useContext(SocketContext);

  // Emit fetch comments WS event if needed
  useEffect(() => {
    console.log('post_detail/Comments.tsx useEffect, postID:', postID)
    if (postID && !fetchedComments) {
      const dto: GetCommentsClientToServerDto = {postID};
      socket.current.emit(GetCommentsByPostIDEvent, dto);
      console.log('post_detail/Comments.tsx useEffect -- emitting ', GetCommentsByPostIDEvent);
    }
  }, [postID]);

  const topLevelComments = useSelector<RootState, string[]>(state => {
    const ret = [];
    post?.comments?.forEach(commentID => {
      const comment = state.comments.entities[commentID];
      if (comment && !comment.parentComment) {
        // top level comment if it has no parentComment
        ret.push(commentID);
      }
    });
    return ret;
  });

  if (!post?.content) {
    console.log('post_detail/Comments.tsx render .. post is not loaded');
    return <Loading />
  }

  if (post.comments.length === 0) {
    return postHasNoComments();
  }

  return (
    <Container>
      {topLevelComments.map(commentID => <TopLevelComment commentID={commentID}/>)}
    </Container>
  )
}