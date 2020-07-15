import React, { useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import PurpleButton from '../common/PurpleButton';
import { CreateGroupChatForm } from './CreateGroupChatForm';
import { HeadingText } from './SideBar';
import PlusIcon from "../../icons/plusIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { selectConversation } from "../../reducers/conversationsSlice";
import { RootState } from '../../reducers/rootReducer';
import { Dictionary } from '@reduxjs/toolkit';
import { Group } from '../../store/types';

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export const Groups = ({ groups, setOpen }: { groups: Group[], setOpen: any }) => {
  const dispatch = useDispatch();
  return (<>
    <div style={{ paddingTop: "20px" }}>
      <span><img src={PlusIcon} alt="" style={{ float: "right" }} onClick={setOpen} /></span>

      <span><HeadingText>GROUP CONVERSATIONS</HeadingText></span>

      {groups.map((group) => {
        return <p style={{ fontWeight: "bold", color: "#333333" }} onClick={() => dispatch(selectConversation({ conversationID: group._id }))}>#{group}</p>
      })}

    </div>
  </>)
}

export const CreateGroupChatModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities);

  return (
    <div>
      {/* list of all group chats */}
      <Groups groups={Object.values(groups)} setOpen={handleClickOpen}></Groups>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create a Group Chat
        </DialogTitle>

        <DialogContent dividers>
          <CreateGroupChatForm handleClose={handleClose} />
        </DialogContent>

      </Dialog>
    </div>
  );
}