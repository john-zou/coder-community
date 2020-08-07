import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { RootState } from '../../reducers/rootReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from '../common/Loading';
import { fetchPostsByTag, fetchTrendingPosts } from '../../reducers/postsSlice';
import { AppDispatch } from '../../store';
import { Dictionary, unwrapResult } from '@reduxjs/toolkit';
import { TagsCarousel } from './TagsCarousel';
import { Tag } from '../../store/types';

//parent: Home
const Main = () => {
  console.log("HOME::MAIN");
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => {
      return state.posts.trendingPosts;
    }
  );
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState(trendingPosts);
  // let items = trendingPosts;
  const currFetchCount: number = useSelector<RootState, number>(state => state.posts.trendingPostFetchCount);
  const hasMoreTrendingPosts: boolean = useSelector<RootState, boolean>(state => state.posts.hasMorePosts);

  const [tabIndex, setTabIndex] = React.useState(0);
  const tags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const tagsArr = Object.values(tags);
  const currentTag = tagsArr[tabIndex - 1];
  const currentTagID = currentTag?._id;

  let hasMore: boolean;
  if (tabIndex === 0) {
    hasMore = hasMoreTrendingPosts;
  } else {
    hasMore = !tags[currentTagID].gotAllPostsFromBackend;
  }

  const handleTabChange = (newIdx: number) => {
    console.log("Handle tab change to tab #", newIdx);
    setTabIndex(newIdx);
    // if new index is 0 (All - trending posts)
    if (newIdx === 0) {
      setItems(trendingPosts);
      return;
    }
    const currentTag = tagsArr[newIdx - 1];

    /*
    // switch to a tag
    console.log(items);
    setItems(Object.keys(currentTag.postsSet));
    // items = Object.keys(currentTag.postsSet);
    console.log(tagsArr);
    console.log(currentTag.postsSet);
    console.log(items);

    // const startIdx = items.length; // communicate to back end which ones to skip
    const startIdx = Object.keys(currentTag.postsSet).length;
    console.log(startIdx);
    const tagID = currentTag._id;
    // console.log(tagID, currentTag);
    dispatch(fetchPostsByTag({tagID, startIdx})).then(unwrapResult).then(res => {
      console.log(res);
      console.log(items);
      setItems(prev => prev.concat(res.posts.map(post => post._id)))
      // items.concat(res.posts.map(post => post._id));
      console.log(items);
     */
    console.log("Switching to tag:", currentTag.name);
    console.log("posts: ", currentTag.posts);
    setItems(currentTag.posts);
    const tagID = currentTag._id;
    console.log(tags);
    if (tags[tagID].gotAllPostsFromBackend) {
      return;
    }
    console.log(tagID);

    dispatch(fetchPostsByTag({ tagID }))
      .then(unwrapResult).then(res => {
        console.log(res);
        setItems(tags[tagID].posts.concat(res.posts.map(post => post._id)));
      }).catch(err => console.log(err));
  }

  const fetchMoreData = () => {
    console.log("FETCH MORE DATA");
    console.log(tabIndex);
    console.log(items);
    if (tabIndex === 0) {
      if (hasMoreTrendingPosts) {
        dispatch(fetchTrendingPosts({ fetchCount: currFetchCount })).then(unwrapResult).then(res => {
          setItems(prev => prev.concat(res.posts.map(post => post._id)))
        }).catch(err => console.log(err));
      } else {
        return;
      }
    }

    const tagID = currentTagID;
    if (hasMore) {
      dispatch(fetchPostsByTag({ tagID }))
        .then(unwrapResult).then(res => {
          setItems(prev => prev.concat(res.posts.map(post => post._id)))
        }).catch(err => console.log(err));
    }
  }

  return (
    <>
      <div style={{ display: "flex", position: "fixed", justifyContent: "center", width: "50%", zIndex: 10, marginTop: "-40px" }}>
        <TagsCarousel value={tabIndex} setValue={handleTabChange} />
      </div>
      <div style={{ marginTop: "50px" }}>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          key={tabIndex.toString()}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You've seen it all!</b>
            </p>
          }>
          {items.map((_id) => {
            return <Card postID={_id} key={_id} />
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Main;
