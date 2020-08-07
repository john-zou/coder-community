import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
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
  const currFetchCount: number = useSelector<RootState, number>(state => state.hnPosts.hnPostsFetchCount);
  const hasMoreHnPosts: boolean = useSelector<RootState, boolean>(state => state.hnPosts.hasMoreHnPosts);
  const [items, setItems] = useState(Object.values(hnPosts));

  //initially fetch 20 posts
  useEffect(() => {
    setLoading(true);
    dispatch(fetchHackerNewsPosts({ fetchCount: currFetchCount })).then(unwrapResult).then(() => {
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

  const fetchMoreData = () => {
    dispatch(fetchHackerNewsPosts({ fetchCount: currFetchCount })).then(unwrapResult).then(res => {
      setItems(prev => prev.concat(res))
    }).catch(err => console.log(err));
  }

  return (
    <>
      <Header>
        <h2>Hacker News Top Stories</h2>
      </Header>
      <hr style={{ color: "black" }}></hr>


      {Object.values(hnPosts).map(post => (
        <SmallCardContainer>
          <Avatar title={post.title} extraText={`${moment(post.createdAt * 1000).calendar()} by ${post.author}`} titleOutSrc={post.url} isPost={true}></Avatar>
        </SmallCardContainer>
      ))}

      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasMoreHnPosts}
        loader={<Loading />}
      >
        {items.map((post, idx) => (
          <SmallCardContainer>
            <Avatar title={post.title} extraText={`${moment(post.createdAt * 1000).calendar()} by ${post.author}`} titleOutSrc={post.url} isPost={true}></Avatar>
          </SmallCardContainer>
        ))}
      </InfiniteScroll>
    </>
  )
}