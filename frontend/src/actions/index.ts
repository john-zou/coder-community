import { LOGIN_SUCCESS, LOGOUT } from "./constants";
import { JwtLocalStorageKey } from "../constants";

/**
 * Places JWT into local storage
 * @param jwt The JWT to place into local storage
 */
export function login(jwt: string) {
  localStorage.setItem(JwtLocalStorageKey, jwt);
  return {
    type: LOGIN_SUCCESS,
  }
}

/**
 * Removes JWT from local storage
 */
export function logout() {
  localStorage.removeItem(JwtLocalStorageKey);
  return {
    type: LOGOUT
  }
}



















// // ** Create-post page
// export const setImg = url => {
//     return {
// 	type: 'IMG_LOAD',
// 	url: url
//     };
// }

// export const setTitle = title => {
//     return {
// 	type: 'TITLE_LOAD',
// 	title: title
//     };
// }

// export const setText = txt => {
//     return {
// 	type: 'TXT_LOAD',
// 	txt: txt
//     };
// }

// export const setTag = tag => {
//     return {
// 	type: 'TAG_LOAD',
// 	tag: tag
//     };
// }

// export const delTag = () => {
//     return {
// 	type: 'TAG_DEL'
//     }
// }

// export const setPeople = person => {
//     return {
// 	type: 'PEOPLE_SET',
// 	person: person
//     };
// }

