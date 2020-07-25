import React, { useEffect, useRef } from "react";
import styled from '@emotion/styled';

export const ChatBubble = styled.div<{ isUser: boolean }>`
  margin-left: 2.6em;
  margin-top: ${({ isUser }) => isUser ? "-1em" : "-0.5em"};
  `

export const ChatMessage = ({ content, isUser }) => {
  const chatMessage = useRef(null);
  useEffect(() => {
    chatMessage.current.innerHTML += content;
  }, [content])

  return (
    <div className="ql-snow" >
      <div className="ql-editor">
        <ChatBubble ref={chatMessage} isUser={isUser} />
      </div>
    </div>
  )
}