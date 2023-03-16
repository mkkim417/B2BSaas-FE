import { EditorProps } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import { EditorState } from 'draft-js';
import React, { Dispatch, SetStateAction, Suspense } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = React.lazy(() =>
  import('react-draft-wysiwyg').then((module) => ({
    default: module.Editor,
  }))
);
export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState;
  readOnly?: boolean;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  onSave?: () => void;
}) {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          toolbarHidden={readOnly}
          wrapperClassName="wrapper-class"
          toolbarClassName="editorToolbar-hidden"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
          toolbar={{ options: ['inline', 'list', 'textAlign', 'link'] }}
          localization={{ locale: 'ko' }}
        />
        {!readOnly && <Button onClick={onSave}>Save</Button>}
      </Suspense>
    </Wrapper>
  );
}
const Button = styled.button`
  width: 100px;
  border: 3px solid #000;
  padding: 10px;
  border-radius: 15px;
`;
const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
`;
