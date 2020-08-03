import { CREATE_POSTS_IMG, CREATE_POSTS_TITLE, CREATE_POSTS_CONTENT } from './constants';
import { CreatePostBodyDto } from '../../../backend/src/posts/dto/posts.dto';
import { BackEndBaseUri } from '../constants';

export const createImgUrl = url => {
  return {
    type: CREATE_POSTS_IMG,
    payload: {
      url: url
    }
  }
}

export const createTitle = title => {
  return {
    type: CREATE_POSTS_TITLE,
    payload: {
      title: title
    }
  }
}

export const createContent = content => {
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
    return fetch(`${BackEndBaseUri}/api/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPost
      })
    }).then((response) => {
      return response.json();
    }).then((res) => {
      console.log(res);
    }).catch(e => console.log(e))
  }
}