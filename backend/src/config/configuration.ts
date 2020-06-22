import {
  CoderCommunityJwtSecret,
  GitHubOAuthClientSecret,
  GoogleOAuthClientSecret,
} from '../../secrets';

export default process.env.GITHUB_CI
  ? () => ({
      CoderCommunityJwtSecret: process.env.CC_JWT_SECRET,
      GitHubOAuthClientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      GoogleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    })
  : () => ({
      CoderCommunityJwtSecret,
      GitHubOAuthClientSecret,
      GoogleOAuthClientSecret,
    });
