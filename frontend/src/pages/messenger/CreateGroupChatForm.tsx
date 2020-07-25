import React, { useState, useEffect, useContext } from 'react';
import { RootState } from '../../reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../store/types';
import { Dictionary, unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { Loading } from '../common/Loading';
import ErrorPage from '../common/ErrorPage';
import { fetchUsersByIDs } from '../../reducers/usersSlice';
import { convertArrToMap } from '../../util/helperFunctions';
import styled from '@emotion/styled';
import { withStyles, Theme } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import PurpleButton from '../common/PurpleButton';
import { TextFields } from '../group/TextFields';
import AddMultiple from '../group/AddMuliple';
import { NewConversationClientToServerDto } from "../../ws-dto/messages/messenger.ws.dto";
import { createDirectConversationPending, createGroupConversationPending } from "../../reducers/conversationsSlice";
import { SocketContext } from "./index";


const TextWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const CreateGroupChatForm = ({ handleClose }) => {
  const [people, setPeople] = useState<string[]>([]);
  const [name, setName] = useState("");

  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  const user = useSelector<RootState, User>(state => state.user);
  let followingFollowers: User[] = [];
  user.followers.concat(user.following).forEach((_id) => {
    if (usersMap[_id]) {
      followingFollowers.push(usersMap[_id])
    }
  });
  followingFollowers = Object.values(convertArrToMap(followingFollowers));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creatingGroupLoading, setCreatingGroupLoading] = useState(false);

  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user.followers.length > 0 || user.following.length > 0) {
      setLoading(true);
      dispatch(fetchUsersByIDs(user.following.concat(user.followers)))
        .then(unwrapResult).then( //must set dispatch to any to use .then
          () => {
            setLoading(false)
          }
        ).catch(error => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  if (!followingFollowers || loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if the conversationID is "", then the user is starting a new group chat with anonymous name
    const dto: NewConversationClientToServerDto = { otherUsers: people, name }
    socket.current.emit('newConversation', dto);
    dispatch(createGroupConversationPending());
    // when the back end responds, dispatch is called (in socket.on in messenger/index)
    handleClose();
  }


  return (
    <>
      {creatingGroupLoading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <TextFields name="Add Name" setName={setName} />

          <TextWrapper>
            <AddMultiple label="Add People" options={followingFollowers} imgKey="profilePic" setItems={setPeople} />
          </TextWrapper>

          <div style={{ height: "25px" }}></div>

          <DialogActions>
            <PurpleButton content="Done" />
          </DialogActions>

        </form>}
    </>
  )
}