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

//parent: Home
const Main = () => {
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => state.posts.trendingPosts
  );
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState(trendingPosts);//has 5 things initially

  const fetchMoreData = () => {
    dispatch(fetchTrendingPosts()).then(unwrapResult).then(res => {
      setItems(prev => prev.concat(res.posts.map(post => post._id)))
    })
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
          hasMore={true}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
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
