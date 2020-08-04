import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchHackerNewsPosts } from "../../reducers/hnPostsSlice";
import { RootState } from "../../reducers/rootReducer";
import { AppDispatch } from "../../store";
import { HNPost } from "../../store/types";
import Avatar from "../common/Avatar";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import { SmallCardContainer } from "../daily_challenge/DiscussionTab";
import { GroupContainer, GroupContent, Header } from "../group";

export const HackerNewsTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hnPosts = useSelector<RootState, Dictionary<HNPost>>(state => state.hnPosts.entities)

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHackerNewsPosts()).then(unwrapResult).then(() => {
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setError(err);
    })
  }, []);

  if (loading || !hnPosts) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      {/* <GroupContainer> */}
      <Header>
        <h2>Hacker News Top Stories</h2>
      </Header>
      {/* </GroupContainer> */}
      <hr style={{ color: "black" }}></hr>
      {/* <GroupContent> */}

      {Object.values(hnPosts).map(post => (
        <SmallCardContainer>
          <Avatar title={post.title} extraText={post.author} titleOutSrc={post.url}></Avatar>
        </SmallCardContainer>
      ))}

      {/* </GroupContent> */}
    </>
  )
}