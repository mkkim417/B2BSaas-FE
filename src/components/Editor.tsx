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
  function uploadImageCallBack(file: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }
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
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
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
  transition: 0.2s;
  font-weight: bold;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Wrapper = styled.div`
  padding: 16px;
  width: 900px;
  border: 3px solid #000;
  border-radius: 15px;
`;
