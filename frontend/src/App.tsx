import "./App.css";

import React, { useEffect, useRef, useState } from "react";
import * as monacoEditor from "monaco-editor";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./containers/header/Header";
import CreatePost from "./pages/create_post/CreatePost";
import UpdatePost from "./pages/update_post";
import Home from "./pages/home";
import { DevLogin } from "./pages/login/DevLogin";
import { Messenger } from "./pages/messenger";
import PostDetail from "./pages/post_detail";
import SearchResult from "./pages/search_result/SearchResult";
import Upload from "./pages/create_video_post";
import { ViewProfile } from "./pages/view_profile/ViewProfile";
import { LogOut } from "./pages/login/Logout";
import { Experimental } from "./pages/experimental/Experimental";
import { LoginGitHub } from "./pages/login/LoginGitHub";
import { AppDispatch } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPosts, fetchTrendingPosts } from "./reducers/postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Loading } from "./pages/common/Loading";
import ErrorPage from "./pages/common/ErrorPage";
import { RootState } from "./reducers/rootReducer";
import { SearchPage } from "./pages/search/SearchPage";
import { ViewGroupProfile } from "./pages/group_profile/ViewGroupProfile";
import io from "socket.io-client";
import { BackEndBaseUriForWs, JwtLocalStorageKey } from "./constants";
import { createMessageSuccess, fetchMessagesInConversation, receiveNewMessage } from "./reducers/messagesSlice";
import { NewConversationServerToClientDto } from "./ws-dto/messages/messenger.ws.dto";
import { addConversation, createConversationSuccess } from "./reducers/conversationsSlice";
import { CreateCommentEvent } from "./ws-dto/comments/dto/createComment.ws.dto";
import { createCommentSuccess, getCommentsByPostIDSuccess } from "./reducers/commentsSlice";
import { GetCommentsByPostIDEvent, GetCommentsServerToClientDto } from "./ws-dto/comments/dto/getCommentsByPostID.ws.dto";
import { DailyChallenge } from "./pages/daily_challenge";
import { CodeTogether } from "./pages/code_together";
import {
  CCEditorDeleteDto,
  CCEditorDeleteEvent,
  CCEditorInsertDto,
  CCEditorInsertEvent,
  CCMousePositionChangeDto,
  CCMousePositionChangeEvent,
  JoinCCEvent,
  JoinCCServerToClientDto
} from "./ws-dto/messages/code-collab.ws.dto";
import { EditorContentManager, RemoteCursorManager } from "@convergencelabs/monaco-collab-ext";

export type ViewProfileParams = {
  username: string;
};

export type ViewGroupParams = {
  groupID: string;
}

export type CodeParams = {
  roomID: string;
}

export type PostDetailParams = {
  slug: string;
};

export type Editor = monacoEditor.editor.IStandaloneCodeEditor
export const SocketContext = React.createContext<React.MutableRefObject<SocketIOClient.Socket>>(null);
export const EditorContext = React.createContext<React.MutableRefObject<Editor>>(null)
export const RemoteCursorManagerContext = React.createContext<React.MutableRefObject<RemoteCursorManager>>(null);
export const EditorContentManagerContext = React.createContext<React.MutableRefObject<EditorContentManager>>(null);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cursors = useRef<Record<string, any>>({})
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const socket = useRef<SocketIOClient.Socket>(null);
  const editorRef = useRef<Editor>(null);
  const remoteCursorManagerRef = useRef<RemoteCursorManager>(null);
  const editorContentManagerRef = useRef<EditorContentManager>(null);

  useEffect(() => {
    console.log("App.tsx useEffect (creating new socket)");
    socket.current = io(BackEndBaseUriForWs);
    socket.current.on('connection', () => {
      socket.current.emit('authenticate', { jwt: localStorage.getItem(JwtLocalStorageKey) });
    });

    // The server responds with the same event
    socket.current.on('authenticate', () => {
      console.log("Auth passed! emitting getcConversationsAndUsers...");
      // Upon receiving this event, can now ask for everything else
      socket.current.emit('getConversationsAndUsers', {});
    });

    socket.current.on('getConversationsAndUsers', (data: any) => {
      dispatch({
        type: 'getConversationsAndUsers',
        payload: data,
      });
    });

    socket.current.on('newMessage', (response: any) => {//listen for the incoming response(s) from 'newMessage' event
      // if message is sent by user
      if (socket.current.id === response.id) {
        dispatch(createMessageSuccess(response));
      } else {
        dispatch(receiveNewMessage(response));
      }
    });

    socket.current.on('newConversation', (data: NewConversationServerToClientDto) => {
      // Client (user) created the new conversation
      if (data.isCreator) {
        dispatch(createConversationSuccess(data.conversation));
        dispatch(fetchMessagesInConversation({ conversationID: data.conversation._id }));
      } else {
        // Conversation was created elsewhere
        dispatch(addConversation(data.conversation))
      }
    });

    socket.current.on(GetCommentsByPostIDEvent, (response: GetCommentsServerToClientDto) => {
      dispatch(getCommentsByPostIDSuccess(response));
    });

    socket.current.on(CreateCommentEvent, (response: any) => {//listen for the incoming response(s) from 'newMessage' event
      // if message is sent by user
      dispatch(createCommentSuccess(response));
    });

    socket.current.on(JoinCCEvent, (response: JoinCCServerToClientDto) => {
      console.log("JoinCCEvent Server to Client: ", response)
      editorContentManagerRef.current.delete(0, editorRef.current.getValue().length)
      editorContentManagerRef.current.insert(0, response.code)
    });

    socket.current.on(CCMousePositionChangeEvent, (response: CCMousePositionChangeDto) => {
      if (cursors.current[response.username]) {
        remoteCursorManagerRef.current.setCursorPosition(response.username, {
          column: response.column,
          lineNumber: response.lineNumber
        })
      } else {
        const cursor = remoteCursorManagerRef.current.addCursor(response.username, 'purple', response.username);
        cursors.current[response.username] = cursor
        cursor.setPosition({ column: response.column, lineNumber: response.lineNumber });
      }
    });

    socket.current.on(CCEditorInsertEvent, (response: CCEditorInsertDto) => {
      console.log("CCEditorInsertEvent, ", response);
      editorContentManagerRef.current.insert(response.index, response.text)
    });

    socket.current.on(CCEditorDeleteEvent, (response: CCEditorDeleteDto) => {
      console.log("CCEditorDeleteEvent, ", response);
      editorContentManagerRef.current.delete(response.index, response.length)
    });

  }, [])

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendingPosts({ fetchCount: 0 }))
      .then(unwrapResult).then(
        () => {
          setLoading(false)
        }
      ).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPopularPosts())
      .then(unwrapResult).then(
        () => {
          setLoading(false)
        }
      ).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [isLoggedIn]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <SocketContext.Provider value={socket}>
      <EditorContext.Provider value={editorRef}>
        <RemoteCursorManagerContext.Provider value={remoteCursorManagerRef}>
          <EditorContentManagerContext.Provider value={editorContentManagerRef}>
            <Router>
              <Header></Header>
              <Switch>
                <Route path={"/code-together/:roomID"}>
                  <CodeTogether />
                </Route>
                <Route path="/user/:username">
                  <ViewProfile />
                </Route>
                <Route path="/group/:groupID">
                  <ViewGroupProfile />
                </Route>
                <Route path="/create-post">
                  <CreatePost />
                </Route>
                <Route path="/update-post/:slug">
                  <UpdatePost />
                </Route>
                <Route exact path="/post">
                  <Home />
                </Route>
                <Route path="/post/:slug">
                  <PostDetail />
                </Route>
                <Route path="/messages">
                  <Messenger />
                </Route>
                <Route path={"/search"}>
                  <SearchPage />
                </Route>
                <Route path="/result">
                  <SearchResult />
                </Route>
                <Route path="/video_management">
                  <Upload />
                </Route>
                <Route path="/login/github">
                  <LoginGitHub />
                </Route>
                <Route path="/login">
                  <DevLogin />
                </Route>
                <Route path="/logout">
                  <LogOut></LogOut>
                </Route>
                <Route path="/test">
                  <Experimental />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route exact path="/">
                  <Redirect to="/home"></Redirect>
                </Route>
              </Switch>
            </Router>
          </EditorContentManagerContext.Provider>
        </RemoteCursorManagerContext.Provider>
      </EditorContext.Provider>
    </SocketContext.Provider>
  );
}
