import React from "react";
import Avatar from "../common/Avatar";

const Comment = ({ post }) => {
  return (
    <>
      <Avatar post={post} extraText="reply"></Avatar>
    </>
  );
};
export default Comment;
