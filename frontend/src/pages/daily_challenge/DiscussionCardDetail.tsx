import React from "react";
import Avatar from "../common/Avatar";
import { DiscussionCardContainer } from "./DiscussionCard";

export const DiscussionCardDetail = () => {
  return (
    <>
      <DiscussionCardContainer>
        <Avatar pic="https://picsum.photos/200" title="John Zou" />

        <h1>JAVA SOLUTION</h1>
        <p>Here's my solution</p>
      </DiscussionCardContainer>
    </>
  )
}