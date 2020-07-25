import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussionsByQuestionId } from "../../reducers/discussionsSlice";
import { RootState } from "../../reducers/rootReducer";
import { userSlice } from "../../reducers/userSlice";
import { AppDispatch } from "../../store";
import { Discussion, User } from "../../store/types";
import Avatar from "../common/Avatar";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import { SearchBar } from "../messenger/SearchBar";
import { DiscussionCardContainer } from "./DiscussionCard";

export const DiscussionTab = () => {

  const dispatch = useDispatch<AppDispatch>();
  const currentQuestionID = useSelector<RootState, string>(state => state.questions.currentQuestionID)
  const discussions = useSelector<RootState, Dictionary<Discussion>>(state => state.discussions.entities)
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchDiscussionsByQuestionId(currentQuestionID)).then(unwrapResult).then(
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
    <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
      {/* <SearchBar /> */}
      {Object.values(discussions).map((discussion) => (
        <>
          < DiscussionCardContainer >
            <Avatar pic={users[discussion.author].profilePic} title={users[discussion.author].name} subtitle={discussion.title} boldSub={true}></Avatar>
          </DiscussionCardContainer>
        </>
      )
      )}
    </div >
  )
}