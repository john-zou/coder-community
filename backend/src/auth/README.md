# CoderCommunity Auth

CoderCommunity uses a custom social login, for GitHub (implemented) and Google (todo), and is extensible to other providers (such as Facebook)

The implementation is a custom JWT strategy (with no expiry); the main benefit of this is that session management is not needed.

- The JWT contains the MongoDB `ObjectID` of the user, so it is unaffected by things such as GitHub username changes. It is permanently linked to their CoderCommunity data.

# `yarn gen`

- The API helpers created by `yarn gen` will automatically include the JWT in the request header (`"Authorization": "Bearer <token>"`). This is what the back end looks for. If it's missing or invalid, a 401 results, if the `UserAuthGuard` (`@Personal()`) is applied to the endpoint.
  - `frontend/src/auth/fetch-container.ts` exports two methods for controlling this behavior, and they should be used only when logging in or logging out

# Convenience REST endpoints for logging in as anyone

- `DevModule` contains convenience endpoints for obtaining tokens easily. See `backend/src/dev/README.md`.
- To attach the token to the front end account, set the jwt in `localhost:3000`'s localStorage in your browser:

```javascript
localStorage.set("jwt", <the jwt token, looks something like nefklan32nfknfklnaln.adna23nfafa.23fkn1kf13f>);
```

(Both of the above will be removed prior to actual deployment -- if we ever deploy it as a real app)

# Flow

Front End

- (1) Unverified or new user authorizes CoderCommunity to access their "Social" login information (GitHub, Google) through OAuth
  - User is redirected to OAuth endpoint from CoderCommunity React app
  - User is redirected to CoderCommunity React app with code, e.g. `/login/github?code=abc123`
  - React App sends the code to the back end
    - The React Router creates e.g. `<LoginGithub />` Component, which processes the code (`abc123`) and sends it to the back end

Back End

- (2) Receives user's code from Social provider at `/api/login/github` or `api/login/google`
- (3) Exchange user's code for JWT with Social provider
  - This is handled by `AuthController` from `auth/auth.controller.ts`
- (4) Create CoderCommunity JWT (different from GitHub/Google JWT) and send to Front End
  - This is handled by `AuthService` from `auth/auth.service.ts`
- (4a) Creates new CoderCommunity account in MongoDB for user if user is new
  - This will be handled by `UserService`

Front End (e.g. `<LoginGithub />` Component)

- (5) Saves CoderCommunity JWT in local storage
- (6) Includes CoderCommunity JWT in header for requests to personal API endpoints

Back End

- (7) Checks CoderCommunity JWT before granting access to personal API endpoints
  - This is handled by `UserAuthGuard` in `auth/guards/user.guard.ts`
