import styled from "@emotion/styled";
import React from "react";
import Avatar from "../common/Avatar";

export const DiscussionCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px #F2F2F2;
  margin-top: 10px;
`;

export const DiscussionCard = () => {
  return (
    <DiscussionCardContainer>
      <Avatar pic="https://picsum.photos/200" title="John Zou" subtitle="Java Solution"></Avatar>

    </DiscussionCardContainer>
  )
}