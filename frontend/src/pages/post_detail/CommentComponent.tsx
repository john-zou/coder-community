import React from "react";
import styled from "@emotion/styled";
import {RootState} from "../../reducers/rootReducer";
import {useSelector} from "react-redux";
import {Comment, User} from "../../store/types";
import Avatar from "../common/Avatar";
import moment from "moment";




const CommentContent = styled.p`
  margin-left: 3.5em;
  margin-top: -0.35em;
`

type Props = {
  commentID: string;
}

export function CommentComponent({commentID}: Props) {
  const comment = useSelector<RootState, Comment>(state => state.comments.entities[commentID]);
  const author = useSelector<RootState, User>(state => state.users.entities[comment?.author]);

  if (!comment) {
    console.log('CommentComponent.tsx.. Comment does not exist in Redux store for ID: ', commentID);
    return <></>;
  }

  return (
    <>
      <Avatar pic={author.profilePic}
              title={author.userID} titleSrc={`/user/${author.userID}`}
              subtitle={moment(comment.createdAt).calendar()}
              subtitleIsDate
              extraText="Reply"
      ></Avatar>
      <CommentContent>{comment.content}</CommentContent>
    </>
  );
}