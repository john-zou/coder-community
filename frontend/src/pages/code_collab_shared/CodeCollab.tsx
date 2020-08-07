import React, { useCallback, useContext, useRef, useState } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { EditorContentManagerContext, Editor, EditorContext, RemoteCursorManagerContext, SocketContext } from "../../App";
import * as monacoEditor from "monaco-editor";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { CurrentLoggedInUser } from "../../store/types";
import {
  CCEditorDeleteEvent, CCEditorInsertEvent,
  CCMousePositionChangeDto,
  CCMousePositionChangeEvent,
  JoinCCEvent
} from "../../ws-dto/messages/code-collab.ws.dto";
import { EditorContentManager, RemoteCursorManager } from "@convergencelabs/monaco-collab-ext";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.css";
import { throttle } from "lodash";

export function CodeCollab({ roomID, collab }: { roomID: string, collab?: boolean }) {
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user)
  const username = user?.userID || "Anonymouse"
  const socketRef = useContext(SocketContext);
  const editorRef = useContext(EditorContext)
  const editorContentManagerRef = useContext(EditorContentManagerContext);
  const remoteCursorManagerRef = useContext(RemoteCursorManagerContext)
  // @ts-ignore
  const throttledEdit = useRef(throttle((dto) => socketRef.current.emit(CCCodeUpdateEvent, dto), 500))
  // @ts-ignore
  const throttledCursorPositionChange = useRef(throttle((dto) => socketRef.current.emit(CCMousePositionChangeEvent, dto)
    , 300))

  const handleChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }

  const handleEditorDidMount = (_, editor: Editor) => {
    editorRef.current = editor;

    socketRef.current.emit(JoinCCEvent, { roomID })

    socketRef.current.on('connection', () => {
      socketRef.current.emit(JoinCCEvent, { roomID })
    })

    remoteCursorManagerRef.current = new RemoteCursorManager({
      editor: editor,
      tooltips: true,
      tooltipDuration: 2
    })

    editorContentManagerRef.current = new EditorContentManager({
      editor,
      onInsert: (index, text) => {
        socketRef.current.emit(CCEditorInsertEvent, { roomID, index, text })
      },
      onReplace: (index, length, text) => {
        socketRef.current.emit(CCEditorDeleteEvent, { roomID, index, length })
        socketRef.current.emit(CCEditorInsertEvent, { roomID, index, text })
      },
      onDelete: (index, length) => {
        socketRef.current.emit(CCEditorDeleteEvent, { roomID, index, length })
      }
    })

    editor.onDidChangeCursorPosition(e => {
      const { column, lineNumber } = e.position
      const dto: CCMousePositionChangeDto = {
        column, lineNumber, roomID, username
      }
      // @ts-ignore
      throttledCursorPositionChange.current(dto);
    })
  }


  return (
    <>
      <MonacoEditor
        width={collab ? "100vw" : "50vw"}
        height="90vh"
        theme="vs-dark"
        language={"javascript"}
        value={"// Connecting to collaboration server. . ."}
        options={
          {
            fontFamily: "Roboto"
          }
        }
        editorDidMount={handleEditorDidMount}
      />
    </>
  )
}