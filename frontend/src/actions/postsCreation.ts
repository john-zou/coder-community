import { CREATE_POSTS_IMG, CREATE_POSTS_TITLE, CREATE_POSTS_CONTENT } from './constants';
import { CreatePostBodyDto } from '../../../backend/src/posts/dto/posts.dto';

export const createImgUrl = url => {
    return {
        type: CREATE_POSTS_IMG,
        payload: {
            url: url
        }
    }
}

export const createTitle = title => {
    // console.log("*** CREATLE TITLE ***");
    return {
        type: CREATE_POSTS_TITLE,
        payload: {
            title: title
        }
    }
}

export const createContent = content => {
    // console.log("*** CREATLE CONTENT ***");
    return {
        type: CREATE_POSTS_CONTENT,
        payload: {
            content: content
        }
    };
}

export const submitPost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost
            })
        }).then((response) => {
            //return response.json();
        // }).then((res) => {
            //console.log(res);
        }).catch(e => console.log(e))
    }
}