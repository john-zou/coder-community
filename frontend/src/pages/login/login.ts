import { GitHubOAuthClientID } from "../../constants";
import { v4 as uuid } from "uuid";

export const stateContainer = {
  state: "abc",
};

/**
 * Should be invoked on Login button click.
 *
 * https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
 */
export function initializeGitHubOAuth() {
  // Generate random state
  stateContainer.state = uuid();

  // Smell ya later!
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${GitHubOAuthClientID}&state=${stateContainer.state}`;
}
