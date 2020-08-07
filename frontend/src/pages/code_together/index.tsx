import styled from "@emotion/styled";
import {unwrapResult} from "@reduxjs/toolkit";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchQuestions} from "../../reducers/questionsSlice";
import {AppDispatch} from "../../store";
import ErrorPage from "../common/ErrorPage";
import {Loading} from "../common/Loading";
import {useParams} from "react-router-dom";
import {CodeParams} from "../../App";
import {CodeCollab} from "../code_collab_shared/CodeCollab";
import CodeTogetherSvg from "../../assets/code_together.svg";

const LeftSideContainer = styled.div`
  padding-top: 11vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const CodeTogether = () => {
  const {roomID} = useParams<CodeParams>();
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
    return <Loading/>
  }

  if (error) {
    return <ErrorPage error={error}/>
  }

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <h2 style={{paddingTop: "9vh"}}>Code Together</h2>
          <img src={CodeTogetherSvg} alt="code together" width="8%" style={{marginLeft: "10px", paddingTop: "7vh"}}/>
        </div>

        <LeftSideContainer style={{fontFamily: 'Courier New'}}>
          <CodeCollab roomID={roomID} collab={true}/>
        </LeftSideContainer>

      </div>
    </>
  )
}