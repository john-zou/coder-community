import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussionsByQuestionId, showDiscussion } from "../../reducers/discussionsSlice";
import { RootState } from "../../reducers/rootReducer";
import { userSlice } from "../../reducers/userSlice";
import { AppDispatch } from "../../store";
import { Discussion, User } from "../../store/types";
import Avatar from "../common/Avatar";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import { SearchBar } from "../messenger/SearchBar";
import styled from "@emotion/styled";
// import "../../App.css";

export const DiscussionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  box-shadow: 8px 8px 16px #d4d4d4,
            -8px -8px 16px #f5f5f5;
  margin-top: 1.5em;
  padding-left: 20px;
  padding-right: 20px;
  &:hover {
    box-shadow: 8px 8px 16px #dcdcdc,
                -8px -8px 16px #dcdcdc;
  }
`;
export const DiscussionTab = () => {

  const dispatch = useDispatch<AppDispatch>();
  const currentQuestionID = useSelector<RootState, string>(state => state.questions.currentQuestionID)
  const discussions = useSelector<RootState, Dictionary<Discussion>>(state => state.discussions.entities)
  const selectedDiscussion = useSelector<RootState, string>(state => state.discussions.currentDiscussionID);
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities)

  const [expand, setExpand] = useState(false);
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

  const handleExpand = (discussionID) => {
    if (!selectedDiscussion) {
      setExpand(true);
      dispatch(showDiscussion({ discussionID }));
    }
    else {
      if (selectedDiscussion === discussionID) {
        setExpand(false);
        dispatch(showDiscussion({ discussionID: '' }));
      }
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <SearchBar /> */}
      {Object.values(discussions).map((discussion) => (
        <>
          <DiscussionCardContainer onClick={() => handleExpand(discussion._id)}>

            <Avatar pic={users[discussion.author].profilePic} title={users[discussion.author].name} subtitle={discussion.title} boldSub={true} />
            {(!selectedDiscussion || selectedDiscussion !== discussion._id) ? <></> : <p style={{ marginTop: "-1px" }}>{discussion.content}</p>}

          </DiscussionCardContainer>
        </>
      )
      )}
    </div >
  )
}