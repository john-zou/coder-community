import styled from "@emotion/styled";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../reducers/questionsSlice";
import { AppDispatch } from "../../store";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import CenteredTabs from "./CenteredTabs";
import moment from "moment";

export const LeftSideContainer = styled.div`
  padding-top: 9vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;

export const RightSideContainer = styled(LeftSideContainer)`
  align-items: center;
`;

export const DailyChallenge = () => {
  const [code, setCode] = useState('//type your code...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    // editor.focus();
  }

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
          <MonacoEditor
            width="50vw"
            height="90vh"
            language="typescript"
            theme="vs-dark"
            value={code}
            options={
              {
                fontFamily: "Roboto"
              }
            }
            editorDidMount={editorDidMount}
          />
        </LeftSideContainer>

        <RightSideContainer>
          <h2>Daily Coding Challenge {moment().format("MMM Do")}</h2>
          <CenteredTabs />
        </RightSideContainer>

      </div>
    </>
  )
}