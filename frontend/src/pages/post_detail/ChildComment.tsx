import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Comment, User} from "../../store/types";
import Avatar from "../common/Avatar";
import moment from "moment";
import styled from "@emotion/styled";

const Container = styled.div`

`

const CommentContent = styled.p`
  margin-left: 3.5em;
  margin-top: -0.35em;
`

export function ChildComment({commentID}: {commentID: string}) {
  const comment = useSelector<RootState, Comment>(state => state.comments.entities[commentID]);
  const author = useSelector<RootState, User>(state => state.users.entities[comment?.author]);

  return (<Container>
    <Avatar pic={author.profilePic}
            title={author.userID} titleSrc={`/user/${author.userID}`}
            subtitle={moment(comment.createdAt).calendar()}
            subtitleIsDate
    ></Avatar>
    <CommentContent>{comment.content}</CommentContent>
  </Container>);
}