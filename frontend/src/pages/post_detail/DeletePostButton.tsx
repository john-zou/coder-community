import {useHistory} from "react-router-dom";
import RedButton from "../common/RedButton";
import React, {useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Loading} from "../common/Loading";
import { deletePost } from "../../reducers/postsSlice";
import {PostsApi} from "../../api";
import {BackEndBaseUri} from "../../constants";

function DeletePostButton({postID}: { postID: string }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleClose();
    new PostsApi().postsControllerDeletePostByPostID(postID).then(() => {console.log('Confirmed optimistic post deletion from backend!')})
      .catch(console.log);
    dispatch(deletePost({postID}));
    setTimeout(() => {window.location.href = "/"}, 1000)
  }

  if (!postID) {
    return <Loading/>
  }

  return (<>
    <RedButton handleClick={handleClickOpen} content={"Delete Post"}></RedButton>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this post?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Note: this action is irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="secondary" autoFocus>
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>);
}

export default DeletePostButton;
