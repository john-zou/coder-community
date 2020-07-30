import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Card from './Card';
import {RootState} from '../../reducers/rootReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Loading} from '../common/Loading';
import {fetchPostsByTag, fetchTrendingPosts} from '../../reducers/postsSlice';
import {AppDispatch} from '../../store';
import {Dictionary, unwrapResult} from '@reduxjs/toolkit';
import {TagsCarousel} from './TagsCarousel';
import {Tag} from '../../store/types';

//parent: Home
const Main = () => {
  // console.log("HOME::MAIN");
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => {
      // console.log(state.posts);
      // console.log(state.posts.trendingPosts);
      return state.posts.trendingPosts;
    }
  );
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState(trendingPosts);//has 5 things initially
  const currFetchCount: number = useSelector<RootState, number>(state => state.posts.trendingPostFetchCount);
  const hasMoreTrendingPosts: boolean = useSelector<RootState, boolean>(state => state.posts.hasMorePosts);
  // console.log(items);
  const [tabIndex, setTabIndex] = React.useState(0);
  const tags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const hasMorePostsInTags = useSelector<RootState, Record<string, boolean>>(state => state.tags.hasMorePostsInTags);
  const tagsArr = Object.values(tags);
  // console.log(tags);
  // console.log(tagsArr);
  // console.log(tabIndex);
  const currentTag = tagsArr[tabIndex - 1];
  // const currentTag = tagsArr[tabIndex];
  const currentTagID = currentTag?._id;
  // console.log(currentTag);
  // console.log(currentTagID);

  let hasMore: boolean;
  if (tabIndex === 0) {
    hasMore = hasMoreTrendingPosts;
  } else {
    hasMore = hasMorePostsInTags[currentTagID];
  }

  const handleTabChange = (newIdx: number) => {
    console.log("HANDLE::TABCHANGE");
    setTabIndex(newIdx);
    // if new index is 0 (All - trending posts)
    if (newIdx === 0) {
      setItems(trendingPosts);
      return;
    }
    const currentTag = tagsArr[newIdx - 1];
    console.log(tagsArr);
    console.log(currentTag);

    // switch to a tag
    setItems(Object.keys(currentTag.postsSet));
    console.log(currentTag.postsSet);
    const startIdx = items.length; // communicate to back end which ones to skip
    const tagID = currentTagID;
    console.log(startIdx, tagID);
    dispatch(fetchPostsByTag({tagID, startIdx})).then(unwrapResult).then(res => {
      setItems(prev => prev.concat(res.posts.map(post => post._id)))
    }).catch(err => console.log(err));
  }

  const fetchMoreData = () => {
    if (tabIndex === 0) {
      if (hasMoreTrendingPosts) {
        dispatch(fetchTrendingPosts({fetchCount: currFetchCount})).then(unwrapResult).then(res => {
          setItems(prev => prev.concat(res.posts.map(post => post._id)))
        }).catch(err => console.log(err));
      } else {
        return;
      }
    }

    const startIdx = items.length; // communicate to back end which ones to skip
    const tagID = currentTagID;
    if (hasMorePostsInTags[tagID]) {
      dispatch(fetchPostsByTag({tagID, startIdx})).then(unwrapResult).then(res => {
        setItems(prev => prev.concat(res.posts.map(post => post._id)))
      }).catch(err => console.log(err));
    }
  }

  return (
    <>
      <div style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        width: "50%",
        zIndex: 10,
        marginTop: "-40px"
      }}>
        <TagsCarousel value={tabIndex} setValue={handleTabChange}/>
      </div>
      <div style={{marginTop: "50px"}}>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          key={tabIndex.toString()}
          loader={<Loading/>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>You've seen it all!</b>
            </p>
          }>
          {items.map((_id, idx) => (
            <Card postID={_id} key={idx}/>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Main;
