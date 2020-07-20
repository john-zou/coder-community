import styled from "@emotion/styled";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
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
  const options = {
    selectOnLineNumbers: true
  };

  const handleChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }} >
        <LeftSideContainer>
          <MonacoEditor
            width="50vw"
            height="60vh"
            language="typescript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={handleChange}
            editorDidMount={editorDidMount}
          />
        </LeftSideContainer>

        <RightSideContainer>
          <h1>Daily Coding Challenge: July 28</h1>
          <CenteredTabs />
        </RightSideContainer>

      </div>
    </>
  )
}