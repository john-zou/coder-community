import { initializeGitHubOAuth } from "../pages/login/login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { CurrentLoggedInUser } from "../store/types";
import { toggleLikePost } from "../reducers/userSlice";

type HandleToggleLike = () => void;

/**
 * returns whether the user likes the post, and a callback function that sends anonymous user to login
 * 
 * @param postID The ID of the post
 */
export function useLikePost(postID: string): { postIsLikedByUser: boolean, handleToggleLike: HandleToggleLike} {


  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const dispatch = useDispatch();

  if (!postID) {
    return {
      postIsLikedByUser: null,
      handleToggleLike: () => {}
    }
  }

  if (!user) {
    return {
      postIsLikedByUser: false,
      handleToggleLike: initializeGitHubOAuth,
    }
  } else {
    const postIsLikedByUser = !!user.likedPostsSet[postID];
    return {
      postIsLikedByUser,
      handleToggleLike: () => dispatch(toggleLikePost({postID, increment: !postIsLikedByUser})),
    }
  }
}