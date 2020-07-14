import { initializeGitHubOAuth } from "../pages/login/login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import {CurrentLoggedInUser} from "../store/types";
import { unfollow, follow } from "../reducers/userSlice";


type HandleToggleFollow = (event?) => void;

export type UseFollowHook = {
    followsOtherUser: boolean,
    isFollowedByOtherUser: boolean,
    handleToggleFollow: HandleToggleFollow
}

/**
 * Helper hook for displaying and interacting with follows
 *
 * @param otherUserID The ID of the user to follow or unfollow
 */
export function useFollow(otherUserID?: string): UseFollowHook {
    const currentUser = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
    const dispatch = useDispatch();

    // Not logged in
    if (!currentUser) {
        return {
            followsOtherUser: false,
            isFollowedByOtherUser: false,
            // Redirect user to log in
            handleToggleFollow: initializeGitHubOAuth
        }
    }

    // Edge case, not done loading yet
    if (!currentUser.followersSet) {
        return null;
    }

    // Same person!
    if (currentUser._id === otherUserID) {
        return null;
    }

    const followsOtherUser = !!currentUser.followingSet[otherUserID];
    let handleToggleFollow: HandleToggleFollow;
    if (followsOtherUser) {
        handleToggleFollow = (event?) => {
            if (event) {
                event.preventDefault();
            }
            dispatch(unfollow({userID: otherUserID}));
        }
    } else {
        handleToggleFollow = (event?) => {
            if (event) {
                event.preventDefault();
            }
            dispatch(follow({userID: otherUserID}));
        }
    }

    const isFollowedByOtherUser = !!currentUser.followersSet[otherUserID];
    return {
        followsOtherUser,
        isFollowedByOtherUser,
        handleToggleFollow,
    }
}