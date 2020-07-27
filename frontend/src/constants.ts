// These are used by `AuthService` on the back end, and during the Login process on the front end
// There are two copies of this file, one in `backend/src` and one in `frontend/src`

export const GitHubOAuthClientID = 'f397e7312eb6205b3256';
// export const GitHubOAuthClientID = 'ce865d5fed800ce68727';
// export const GitHubOAuthClientID = 'ecc704dcc84fdeb62b9a';
export const GoogleOAuthClientID =
  '378315098234-caculcp2l4rg87nb7tds0j37v420cth9.apps.googleusercontent.com';

export const JwtLocalStorageKey = "jwt";

export enum ImageType {
    ProfilePic = "ProfilePic",
    BannerPic = "BannerPic",
}

export const BackEndBaseUri = "http://localhost:3001";
// export const BackEndBaseUri = "/"; // || process.env.PORT || "http://localhost:3001";
// export const BackEndBaseUri = "http://glacial-river-02818.herokuapp.com/";
export const BackEndBaseUriForWs = BackEndBaseUri;
