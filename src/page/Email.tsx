import React, { useEffect, useState } from 'react';
import CustomEditor from '../components/Editor';
import { Wrapper } from './Alarmtalk';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { H1, LeftContents, RightContents } from './Alarmtalk';
import SelectBoxs from '../components/SelectBoxs';
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
      // setEditorState(
      //   EditorState.createWithContent(convertFromRaw(JSON.parse('')))
      // );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [editorState]);
  console.log(editorState);
  return (
    <Wrapper>
      <LeftContents>
        <H1>이메일 발송하기</H1>
        <SelectBoxs></SelectBoxs>
      </LeftContents>
      <RightContents>
        {editorState != null && (
          <CustomEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onSave={handleSave}
          />
        )}
      </RightContents>
    </Wrapper>
  );
}

export default Email;
