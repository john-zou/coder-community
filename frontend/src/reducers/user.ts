/**
 * Handles login
 */
type User = {
  userID: string,
  gitHubID: number,
  name: string,
  profilePic?: string,
  backgroundImg?: string,
  status?: string,
  followers: string[],
  following: string[],
  groups: string[],
  savedPosts: string[],
  tags: string[],
  conversations: string[],
  lastLogginIn: Date;
}

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  error: null,
}

export function user(state = initialState, action) {
  return state;
}
