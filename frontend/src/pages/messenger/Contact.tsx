import React from "react";
import styled from "@emotion/styled";

const ContactContainer = styled.div<{ userId: string, activeId: string }>`
  display: flex;
  align-items: flex-start;
  padding-top: 1em;
  padding-left: 1em;
  background: ${({ userId, activeId }) => userId === activeId ? "#edeafd" : ""};
`;
const ContactDetail = styled.div`
display: none;
@media(min - width: 580px) {
  display: block;
  padding: 0 0 0 1em;
}
`;
const ContactName = styled.p`
font - weight: 700;
color: #421c52;
@media(min - width: 580px) {
  margin: 0;
}
`;

export const Contact = () => {
  const contact = null;
  const activeId = null;
  const handleClick = () => { }
  return (
    <ContactContainer userId={contact.user_id} activeId={activeId} onClick={handleClick}>
      <img src="" alt="" />
      <ContactDetail>
        <ContactName>Corgi</ContactName>
        <p>Best dog</p>
      </ContactDetail>
    </ContactContainer>)
}