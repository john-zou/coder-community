export const CCMousePositionChangeEvent = "code-collab-position-change";

export class CCMousePositionChangeDto {
    username: string;
    roomID: string;
    column: number;
    lineNumber: number;
}

export const JoinCCEvent = "code-collab-join";
export class JoinCCServerToClientDto {
    code: string;
}
export class JoinCCClientToServerDto {
    roomID: string;
}

export const CCEditorInsertEvent = "code-collab-editor-insert";
export class CCEditorInsertDto {
    roomID: string;
    index: number;
    text: string;
}

export const CCEditorDeleteEvent = "code-collab-editor-delete";
export class CCEditorDeleteDto {
    roomID: string;
    index: number;
    length: number;
}

export const DefaultCode = `const helloWorld = () => { console.log('Hello Coders!') }`