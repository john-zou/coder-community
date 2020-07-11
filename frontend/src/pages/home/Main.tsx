import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { RootState } from '../../reducers/rootReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from '../common/Loading';
import { fetchTrendingPosts } from '../../reducers/postsSlice';
import { AppDispatch } from '../../store';
import { unwrapResult } from '@reduxjs/toolkit';
import { TagsCarousel } from './TagsCarousel';
import { Post } from '../../store/types';

//parent: Home
const Main = () => {
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => state.posts.trendingPosts
  );
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState(trendingPosts);//has 5 things initially
  const currFetchCount: number = useSelector<RootState, number>(state => state.posts.trendingPostFetchCount);
  const hasMorePosts: boolean = useSelector<RootState, boolean>(state => state.posts.hasMorePosts);

  const fetchMoreData = () => {
    if (hasMorePosts) {
      dispatch(fetchTrendingPosts({ fetchCount: currFetchCount })).then(unwrapResult).then(res => {
        setItems(prev => prev.concat(res.posts.map(post => post._id)))
      }).catch(err => console.log(err))
    } else {
      console.log('no more post');
    }
  }

  return (
    <>
      <div style={{ display: "flex", position: "fixed", justifyContent: "center", width: "50%", zIndex: 10, marginTop: "-40px" }}>
        <TagsCarousel />
      </div>
      <div style={{ marginTop: "50px" }}>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMorePosts}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b></b>
            </p>
          }>
          {items.map((_id, idx) => (
            <Card postID={_id} key={idx} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Main;
