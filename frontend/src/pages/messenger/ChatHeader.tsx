import React from "react";
import styled from '@emotion/styled';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 2em;
  border - bottom: 0.3px solid #fafafa;
  height: 15 %;
`;
const HeaderPic = styled.span`
  width: 90px;
  border-radius: 50%;
  margin-right: 2em;
`;

export const ChatHeader = () => {
  return (<Header>
    <HeaderPic>
      <img src="{pic}" alt="" />
    </HeaderPic>
    <div>
      <h2>Rihanna</h2>
      <p>musician</p>
    </div>
  </Header>)
}