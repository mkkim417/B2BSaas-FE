import React, { useEffect, useState } from 'react';
import CustomEditor from '../components/Editor';
import { Wrapper } from './Home';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { H1 } from './Alarmtalk';
function Email() {
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );
  const handleSave = () => {
    if (editorState) {
      // fetch('/api',{
      //   method:'POST',
      //   body:JSON.stringify({
      //     id:'sdfkjlsdf',
      //     contents:JSON.stringify(
      //       convertToRaw(editorState.getCurrentContent())
      //     )
      //   })
      // })
      // console.log(
      //   'contents : ',
      //   JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      // );
    }
  };
  useEffect(() => {
    if (editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse('')))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);
  console.log(editorState);
  return (
    <Wrapper>
      <H1>이메일 발송하기</H1>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </Wrapper>
  );
}

export default Email;
