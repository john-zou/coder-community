import styled from "@emotion/styled";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../reducers/questionsSlice";
import { AppDispatch } from "../../store";
import ErrorPage from "../common/ErrorPage";
import { Loading } from "../common/Loading";
import CenteredTabs from "./CenteredTabs";

export const LeftSideContainer = styled.div`
  padding-top: 9vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;

export const RightSideContainer = styled(LeftSideContainer)`
  align-items: center;
`;

export const DailyChallenge = () => {
  const [code, setCode] = useState('//type your code...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch<AppDispatch>();
  const options = {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: false,
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorSmoothCaretAnimation: false,
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: "auto",
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    highlightActiveIndentGuide: true,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: true,
    renderIndentGuides: true,
    renderLineHighlight: "all",
    renderWhitespace: "none",
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: "mouseover",
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: true,
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapBreakObtrusiveCharacters: ".",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: "none"
  } as const;

  const handleChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    // editor.focus();
  }

  useEffect(() => {
    setLoading(true);
    dispatch(fetchQuestions()).then(unwrapResult).then(
      () => setLoading(false)).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }} >
        <LeftSideContainer style={{ fontFamily: 'Courier New' }}>
          <MonacoEditor
            width="50vw"
            height="90vh"
            language="typescript"
            theme="vs-dark"
            value={code}
            options={
              {
                fontFamily: "Courier New"
              }
            }
            editorDidMount={editorDidMount}
          />
        </LeftSideContainer>

        <RightSideContainer>
          <h1>Daily Coding Challenge July 28</h1>
          <CenteredTabs />
        </RightSideContainer>

      </div>
    </>
  )
}