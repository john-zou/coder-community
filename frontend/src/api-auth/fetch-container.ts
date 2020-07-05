import { JwtLocalStorageKey } from "../constants";

// By default, uses the normal fetch
export default function portableFetchReplacement(path, options: any = {}) {
    if (!options.headers) {
      options.headers = new Headers();
    }
    try {
      options.headers["Authorization"] =  "Bearer " + localStorage.getItem(JwtLocalStorageKey);
    } catch (err) {
      console.log(err);
    }
    
    return fetch(path, options);
  };

