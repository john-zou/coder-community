import { CREATE_POSTS_IMG, CREATE_POSTS_TITLE, CREATE_POSTS_CONTENT } from './constants';

export const createImgUrl = url => {
    return {
        type: CREATE_POSTS_IMG,
        payload: {
            url: url
        }
    }
}

export const createTitle = title => {
    console.log("*** CREATLE TITLE ***");
    return {
        type: CREATE_POSTS_TITLE,
        payload: {
            title: title
        }
    }
}

export const createContent = content => {
    console.log("*** CREATLE CONTENT ***");
    return {
        type: CREATE_POSTS_CONTENT,
        payload: {
            content: content
        }
    };
}

export function submitPost() {
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            })
        }).then((response) => {
            return response.json();
        }).then((res) => {

        }).catch(e => console.log(e))
    }
}