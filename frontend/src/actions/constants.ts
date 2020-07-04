export const INITIAL_TRENDING_POSTS_PENDING = "INITIAL_TRENDING_POSTS_PENDING";
export const INITIAL_TRENDING_POSTS_SUCCESS = "INITIAL_TRENDING_POSTS_SUCCESS";
export const INITIAL_TRENDING_POSTS_FAILURE = "INITIAL_TRENDING_POSTS_FAILURE";

export const MORE_TRENDING_POSTS_PENDING = "MORE_TRENDING_POSTS_PENDING";
export const MORE_TRENDING_POSTS_SUCCESS = "MORE_TRENDING_POSTS_SUCCESS";
export const MORE_TRENDING_POSTS_FAILURE = "MORE_TRENDING_POSTS_FAILURE";

export const USER_PENDING = "USER_PENDING";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

export const USER_PROFILE_PENDING = "USER_PROFILE_PENDING";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILURE = "USER_PROFILE_FAILURE";

export type ReduxAction = {
  type: ActionType,
  payload?: any,
};

export type ActionType =
  typeof INITIAL_TRENDING_POSTS_PENDING
  | typeof INITIAL_TRENDING_POSTS_SUCCESS
  | typeof INITIAL_TRENDING_POSTS_FAILURE
  | typeof MORE_TRENDING_POSTS_PENDING
  | typeof MORE_TRENDING_POSTS_SUCCESS
  | typeof MORE_TRENDING_POSTS_FAILURE
  | typeof USER_PENDING
  | typeof USER_SUCCESS
  | typeof USER_FAILURE
  | typeof USER_PROFILE_PENDING
  | typeof USER_PROFILE_SUCCESS
  | typeof USER_PROFILE_FAILURE