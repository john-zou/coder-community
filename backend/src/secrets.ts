export const Secrets = {
  CoderCommunityJwtSecret: process.env.CC_SECRET,
  GitHubOAuthClientSecret: process.env.GH_SECRET,
  GoogleOAuthClientSecret: process.env.GG_SECRET,
  MongoConnectionString: (process.env.CI || (process.env.USE_LOCAL_MONGODB && process.env.USE_LOCAL_MONGODB !== "false")) ? process.env.LOCAL_MONGODB : process.env.REMOTE_MONGODB
};

console.log(process.env);