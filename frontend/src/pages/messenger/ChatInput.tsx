import Quill from "quill";
import React, { useEffect } from "react";
import styled from '@emotion/styled';
import SendIcon from "../../icons/sendIcon.svg";
import "../../App.css";

const Editor = styled.div`
  max-height: 50%;
  height: fit-content;
  width: 63%;
  position: absolute;
  bottom: 50px;
  background-color: white;
  overflow: scroll;
  font-size: medium;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 63%;
  background-color: #D3D3D3;
  padding-left: 30px;
`;

export const ChatInput = () => {
  useEffect(() => {
    const quill = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',

      },
      placeholder: 'Send message',
      theme: 'snow'  // or 'bubble'
    });
  }, [])

  return (
    <>
      <Editor id="editor">

      </Editor>

      <Toolbar id="toolbar">

        {/* < Add a bold button  */}
        <button className="ql-bold"></button>
        {/* add subscript and superscript buttons */}
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-image"></button>
        <button className="ql-code-block"></button>
        <button className="ql-link"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>

        <div style={{ flex: 1 }}></div>
        <p style={{ fontSize: "small", fontStyle: "italic" }}>
          <strong>Enter</strong> to send&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Shift</strong> + <strong>Enter</strong> to add a new line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>

        <div style={{ marginRight: "15px", marginTop: "10px" }}>
          <img src={SendIcon} alt="send" />
        </div>
      </Toolbar>
    </>
  )
}