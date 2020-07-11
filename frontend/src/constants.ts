// These are used by `AuthService` on the back end, and during the Login process on the front end
// There are two copies of this file, one in `backend/src` and one in `frontend/src`

export const GitHubOAuthClientID = 'f397e7312eb6205b3256';
export const GoogleOAuthClientID =
  '378315098234-caculcp2l4rg87nb7tds0j37v420cth9.apps.googleusercontent.com';

export const JwtLocalStorageKey = "jwt";

export enum ImageType {
    ProfilePic = "ProfilePic",
    BannerPic = "BannerPic",
}