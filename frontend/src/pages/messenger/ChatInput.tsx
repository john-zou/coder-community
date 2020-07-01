import React from "react";
import styled from '@emotion/styled';

const Input = styled.input`
  width: 70%;
  height: 15%;
  padding: 1.5em;
  background: #fafafa;
  border: 0;
  border-radius: 10px;
  font-size: 1em;
  outline: 0;
`;
const Button = styled.button`
  background-color: #7754f7;
  height: 3.4em;
  width: 6em;
  border: 0;
  border-radius: 1em;
  color: white;
  font-size: medium;
`;
const ChatForm = styled.form`
  bottom: 2rem;
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const ChatInput = () => {
  const handleSubmit = () => {
    console.log("not implemented");
  }
  return (
    <ChatForm onSubmit={handleSubmit} >
      <Input />
      <Button onSubmit={handleSubmit}>
        Send
      </Button>
    </ChatForm>)
}