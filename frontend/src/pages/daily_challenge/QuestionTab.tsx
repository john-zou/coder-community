import styled from "@emotion/styled";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Question } from "../../store/types";

const QuestionCard = styled.div`
  margin-top: 20px;
  background-color: white;
  height: 100%;
  width: 40vw;
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 20px;
  // padding-top: 1em;
  padding-left: 2em;
  padding-right: 2em;
  box-shadow: 8px 8px 16px #d4d4d4,
            -8px -8px 16px #f5f5f5;
`;

export const QuestionTab = () => {
  const questions = useSelector<RootState, Dictionary<Question>>(state => state.questions.entities);
  const currQuestionID = useSelector<RootState, string>(state => state.questions.currentQuestionID);
  const currentQuestion = questions[currQuestionID];
  return (
    <QuestionCard>
      <h3>{currentQuestion.title}</h3>
      <p>{currentQuestion.content}</p>
    </QuestionCard>
  )
}