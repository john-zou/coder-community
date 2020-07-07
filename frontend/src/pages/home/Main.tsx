import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

// import { LoadableIDs, RootState } from '../../store';
import Card from './Card';
import { RootState } from '../../reducers/rootReducer';

// const useStyles = makeStyles({
//   main: {
//     marginTop: "3vh",
//     display: "flex",
//     flex: 1,
//     marginBottom: "0",
//     height: "120vh",
//     flexDirection: "column",
//     alignItems: "center",
//     overflowY: "scroll",
//   },
// });

//parent: Home
const Main = () => {
  // const classes = useStyles();
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => state.posts.trendingPosts
  );

  /*
  trendingPosts.items.forEach((item) => {
    console.log(item);
  })
   */
  // console.log(trendingPosts);
  return (
    <>
      {trendingPosts.map((_id) => (
        <Card postID={_id} key={_id} />
      ))}

    </>
  );
};
export default Main;
