# CoderCommunity Auth

CoderCommunity uses a custom social login, for GitHub and Google, with the possibility of easily extending it to others

API documentation for this, and ever back end controller, can be seen by starting the back end and visiting localhost:3001/api

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
