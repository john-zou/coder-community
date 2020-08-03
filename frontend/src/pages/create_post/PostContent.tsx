import styled from "@emotion/styled";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import "./PostContent.css"

const PostEditor = styled.div`
  max-height: 50%;
  height: 30vh;
  width: 42vw;
  background-color: white;
  padding: 0;
`
const PostTitle = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  height: 8vh;
  width: 42vw;
  background-color: white;
`

export const PostToolbar = styled.div`
  display: flex;
  width: 42vw;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-left: 30px;
`;
export const PostContent = ({ editorRef, setTitle }: { editorRef: React.MutableRefObject<Quill>, setTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  useEffect(() => {
    editorRef.current = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar'
      },
      placeholder: 'Type post content...',
      theme: 'snow'  // or 'bubble'
    });

  }, [])


  return (
    <div style={{ boxShadow: "8px 8px 16px #d4d4d4, -8px -8px 16px #f5f5f5", backgroundColor: "white" }}>
      <PostToolbar id="toolbar">
        <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option selected></option>
        </select>

        <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>

        </select>

        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-image"></button>
        <button className="ql-video"></button>
        <button className="ql-code-block"></button>
        <button className="ql-link"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
      </PostToolbar>

      <PostTitle>
        <input placeholder="Title" style={{ outline: "none", border: "none", fontSize: "2em", paddingLeft: "15px" }} onChange={(e) => {
          setTitle(e.target.value)
        }} />
      </PostTitle>
      <div className="postcontent">
        <PostEditor id="editor" style={{ height: "40vh !important" }} />
      </div>
    </div>)
}