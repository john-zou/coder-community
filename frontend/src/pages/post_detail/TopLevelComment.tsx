import React, {useContext, useRef, useState} from "react";
import styled from "@emotion/styled";
import {RootState} from "../../reducers/rootReducer";
import {useSelector} from "react-redux";
import {Comment, CurrentLoggedInUser, User} from "../../store/types";
import Avatar from "../common/Avatar";
import moment from "moment";
import {ChildComment} from "./ChildComment";
import {Modal} from "@material-ui/core";
import {initializeGitHubOAuth} from "../login/login";
import {SocketContext} from "../../App";
import {CreateCommentClientToServerDto, CreateCommentEvent} from "../../ws-dto/comments/dto/createComment.ws.dto";
import ReplySvg from "../../assets/reply.svg";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const CommentContent = styled.p`
  margin-left: 3.5em;
  margin-top: -0.35em;
`

const TopLevelCommentContainer = styled.div`

`

const ChildCommentsContainer = styled.div`
  margin-left: 5em;
`

const CreateCommentReplyContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;
  text-align: center;
`

const CreateCommentInfo = styled.p`
  font-style: italic;
  color: gray;
`

const CreateCommentReplyInput = styled.input`
  width: 300px;
  font-size: medium;
  padding: 1em;
`

type Props = {
  commentID: string;
}

export function TopLevelComment({commentID}: Props) {
  const comment = useSelector<RootState, Comment>(state => state.comments.entities[commentID]);
  const author = useSelector<RootState, User>(state => state.users.entities[comment?.author]);
  const [expanded, setExpanded] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const replyInputRef = useRef(null); // Form input for creating a reply in the modal
  const currentUser = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const socket = useContext(SocketContext);

  if (!comment) {
    console.log('TopLevelComment.tsx.. Comment does not exist in Redux store for ID: ', commentID);
    return <></>;
  }

  function createCommentReply(event) {
    event.preventDefault();

    if (replyInputRef.current.value.trim() === '') {
      return;
    }

    const content = replyInputRef.current.value.trim();
    const dto: CreateCommentClientToServerDto = {
      commentRoot: 'post',
      parentPost: comment.parentPost,
      parentComment: commentID,
      content
    };
    socket.current.emit(CreateCommentEvent, dto);
    setOpenReplyModal(false);
  }

  function handleClickReply(event) {
    if (!currentUser) {
      // Send user to login
      initializeGitHubOAuth();
      return; // unreacheable
    }
    setOpenReplyModal(true);
  }

  return (
    <div style={{backgroundColor: expanded ? "white" : "inherit", borderRadius: "20px", paddingLeft: "1em", paddingBottom: "1.5em", cursor: "pointer"}}>
      <TopLevelCommentContainer onClick={() => setExpanded(expanded => !expanded)}>
        <Avatar pic={author.profilePic}
                title={author.userID} titleSrc={`/user/${author.userID}`}
                subtitle={moment(comment.createdAt).calendar()}
                subtitleIsDate
                extraText="Reply"
                extraTextOnClick={handleClickReply}
        ></Avatar>

      </TopLevelCommentContainer>
      <CommentContent>{comment.content}</CommentContent>
      {expanded && (<ChildCommentsContainer>
        {comment.replies.map(reply => <ChildComment commentID={reply}></ChildComment>)}
      </ChildCommentsContainer>)}

      <Modal open={openReplyModal} onClose={() => setOpenReplyModal(false)} closeAfterTransition
             BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
        <Fade in={openReplyModal}>
          <CreateCommentReplyContainer>
            <img height={80} src={ReplySvg} alt="Reply"/>
            <CreateCommentInfo>Reply to {author.userID}</CreateCommentInfo>
            <form onSubmit={createCommentReply}>
              <CreateCommentReplyInput ref={replyInputRef} placeholder="Type comment"/>
            </form>
          </CreateCommentReplyContainer>
        </Fade>
      </Modal>
    </div>
  );
}