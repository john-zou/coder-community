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
  width: 90%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const QuestionTab = () => {
  const questions = useSelector<RootState, Dictionary<Question>>(state => state.questions.entities);
  const currQuestionID = useSelector<RootState, string>(state => state.questions.currentQuestionID);
  const currentQuestion = questions[currQuestionID];
  return (
    <QuestionCard>
      <h2>{currentQuestion.title}</h2>
      <p>{currentQuestion.content}</p>
    </QuestionCard>
  )
}