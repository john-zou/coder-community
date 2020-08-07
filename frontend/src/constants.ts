// These are used by `AuthService` on the back end, and during the Login process on the front end
// There are two copies of this file, one in `backend/src` and one in `frontend/src`

export const GitHubOAuthClientID = process.env.REACT_APP_GH_CLIENT_ID || '1172e5f10b0d169a374a'; // redirects to AWS
export const GoogleOAuthClientID =
  '378315098234-caculcp2l4rg87nb7tds0j37v420cth9.apps.googleusercontent.com';

export const JwtLocalStorageKey = "jwt";

export enum ImageType {
  ProfilePic = "ProfilePic",
  BannerPic = "BannerPic",
}

export const BackEndBaseUri = "http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com/";
export const BackEndBaseUriForWs = BackEndBaseUri;
