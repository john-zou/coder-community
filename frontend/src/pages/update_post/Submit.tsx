import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from 'react-redux';
import {updatePost} from "../../reducers/postsCreationSlice";
import {useHistory} from "react-router-dom";
import {UpdatePostBodyDto} from "../../api";

const useStyles = makeStyles({
    operation: {
        display: "flex",
        flex: 0
    }
});

const onSubmit = (params, slug: string, dispatch, history) => {
    const update: UpdatePostBodyDto = {};
    if (params.title?.length > 0) {
        update.title = params.title;
    }
    if (params.content?.length > 0) {
        update.content = params.content;
    }
    update.tags = params.tags;

    // TODO: handle newly uploaded image

    dispatch(updatePost({update, slug}));
}

const onCancel = (params, dispatch) => {

}

export default function Submit(params) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className={classes.operation}>
            <button color="primary" onClick={(event) => {
                onCancel(params, dispatch);
            }}>Cancel</button>
            <button color="primary" onClick={(event) =>{
                onSubmit(params, params.slug, dispatch, history);
            }}>Submit</button>
        </div>
    );
}
