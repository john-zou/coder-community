
type FetchContainer = {
  fetch: typeof fetch;
}

// By default, uses the normal fetch
const fetchContainer: FetchContainer = {
  fetch: fetch
}

/**
 * Adds Authorization bearer token from local storage to the requests afterwards
 */
export function addTokenToApi() {
  fetchContainer.fetch = function(path, options = {}) {
    if (!options.headers) {
      options.headers = new Headers();
    }
    (options.headers as any).set('Authorization', 'Bearer ' + localStorage.getItem())
    return fetch(path, options);
  }
}

/**
 * Resets the fetch back to default
 */
export function removeTokenFromApi () {
  fetchContainer.fetch = fetch;
}

export default fetchContainer;