import {
    CREATE_POSTS_CONTENT,
    CREATE_POSTS_DONE,
    CREATE_POSTS_TAGS,
    CREATE_POSTS_TITLE,
    ReduxAction
} from "../actions/constants";

let initialState = {
    title: '',
    content: '',
    tags: []
}

export function postsCreation(state = initialState, action: ReduxAction): any {
    let updated = Object.assign({}, state);
    console.log("*** POST CREATION REDUCER ***");
    switch (action.type) {
        case CREATE_POSTS_TITLE:
            updated.title = action.payload.title;
            console.log(updated);
            return updated;
        case CREATE_POSTS_CONTENT:
            updated.content = action.payload.content;
            console.log(updated);
            return updated;
        case CREATE_POSTS_TAGS:
            updated.tags = action.payload.tags;
            return updated;
        case CREATE_POSTS_DONE:
            return state;
        default:
            return state;
    }
}