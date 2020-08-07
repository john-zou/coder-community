import styled from "@emotion/styled";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../reducers/questionsSlice";
import { AppDispatch } from "../../store";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import moment from "moment";
import { useParams } from "react-router-dom";
import { CodeParams } from "../../App";
import { CodeCollab } from "../code_collab_shared/CodeCollab";

const LeftSideContainer = styled.div`
  padding-top: 11vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const CodeTogether = () => {
  const { roomID } = useParams<CodeParams>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    setLoading(true);
    dispatch(fetchQuestions()).then(unwrapResult).then(
      () => setLoading(false)).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }} >
        <LeftSideContainer style={{ fontFamily: 'Courier New' }}>
          <CodeCollab roomID={roomID} collab={true} />
        </LeftSideContainer>

      </div>
    </>
  )
}