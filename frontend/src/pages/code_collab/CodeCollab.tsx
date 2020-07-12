import React, {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import Editor from "@monaco-editor/react";
import {editor} from "monaco-editor";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export function CodeCollab() {
    const socket = useRef(null);
    const editor = useRef<IStandaloneCodeEditor>(null);

    useEffect(() => {
        socket.current = socketIOClient("http://localhost:3001/ws/code-collab");
        socket.current.on("code", data => {
            console.log(data);
            const position = editor.current.getPosition();
            editor.current.setValue(data);
            editor.current.setPosition(position);
        });
    }, []);


    return (
        <>
            <div style={{height: "8vh"}} />
            <Editor
                height="70vh"
                editorDidMount={(_, theEditor) => {
                    editor.current = theEditor;
                    editor.current.onKeyUp(() => {
                       socket.current.emit('code', editor.current.getValue());
                    });
                }}
                language="javascript">
            </Editor>
        </>
    )
}
