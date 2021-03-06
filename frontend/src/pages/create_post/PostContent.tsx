import styled from "@emotion/styled";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../store/types";
import "./PostContent.css"

const PostEditor = styled.div`
  max-height: 50%;
  height: 30vh;
  width: 43vw;
  background-color: white;
  padding: 0;
  border-radius: 5px;
`
const PostTitle = styled.div`
  display: flex;
  align-items: center;
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
  border: none;
`;
export const PostContent = ({ editorRef, setTitle, currentPost }: { editorRef: React.MutableRefObject<Quill>, setTitle: React.Dispatch<React.SetStateAction<string>>, currentPost?: Post }) => {
  useEffect(() => {
    if (currentPost) {
      editorRef.current = new Quill('#editor', {
        modules: {
          toolbar: '#toolbar'
        },
        theme: 'snow'  // or 'bubble'
      });
      editorRef.current.clipboard.dangerouslyPasteHTML(currentPost.content)
    }

    else {
      editorRef.current = new Quill('#editor', {
        modules: {
          toolbar: '#toolbar'
        },
        placeholder: 'Type post content...',
        theme: 'snow'  // or 'bubble'
      });
    }
  }, [])


  return (
    <div className="createPostContent"
      style={{ boxShadow: "8px 8px 16px #d4d4d4, -8px -8px 16px #f5f5f5", backgroundColor: "white", borderRadius: "5px" }}>
      <PostToolbar id="toolbar" >
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
        <input
          placeholder={currentPost ? currentPost.title : "Title"}
          style={{ outline: "none", border: "none", fontSize: "2em", paddingLeft: "15px", paddingRight: "15px", width: "100%" }}
          onChange={(e) => {
            setTitle(e.target.value)
          }} />
      </PostTitle>
      <div className="postcontent">
        <PostEditor id="editor"
          style={{ height: "40vh !important" }} />
      </div>
    </div>)
}