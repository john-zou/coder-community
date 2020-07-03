import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: ${({ isUser }) => isUser ? "row-reverse" : "row"}; 
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;
const ChatPic = styled.img`
  width: 50px;
  border-radius: 50%;
`
const ChatContent = styled.div<{ isUser: boolean }>`
  margin-top: 1em;
  padding: 1em;
  border-radius: 10px;
  background-color: ${({ isUser }) => isUser ? "#4daeea" : "#a9b0bd"};
  margin-left: ${({ isUser }) => isUser ? "0em" : "1em"};
  margin-right: ${({ isUser }) => isUser ? "1em" : "0em"};
`;
const DeleteButton = styled.button`
  position: relative;
  background-color: white;
  text-decoration: none;
  border: none;
  border-radius: 100%;
  padding: 0.3em 0.6em;
  margin-right: 1em;
`;

export const ChatMessage = ({ message }) => {
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const is_user = true;
  const handleOnclick = () => {
    console.log("not implemented");
  }
  const handleHover = () => { }
  const handleUnhover = () => { }
  const handleDelete = () => { }
  const del = useRef(null);

  return (<ChatMessageContainer isUser={is_user}>
    <span>
      <ChatPic
        src={is_user ? "user_pic.jpg" : "img.jpg"}
        alt=""
      />
    </span>
    <span>
      <ChatContent isUser={is_user}
        onClick={handleOnclick}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
      >
        {isDeleteVisible ? (
          <DeleteButton onClick={handleDelete} ref={del}>
            x
          </DeleteButton>
        ) : null}
        {/* {text} */}
      </ChatContent>
    </span>
    <div style={{ flex: 1 }}></div>
  </ChatMessageContainer>)
}