import React, { useEffect, useState, useCallback } from 'react';
import CustomEditor from '../components/Editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { H1, LeftContents, RightContents } from './Alarmtalk';
import SelectBoxs from '../components/SelectBoxs';
import { EMAIL_TEMPLATE } from '../constants/emailTemplates';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
function Email() {
  const location = useLocation();
  console.log(location.state.id);
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
      console.log(
        'contents : ',
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
    }
  };
  const setFunc = useCallback(() => {
    if (editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(EMAIL_TEMPLATE[location.state.id]['text'] as any)
          )
        )
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [editorState]);

  useEffect(() => {
    setFunc();
  }, [setFunc]);
  return (
    <Wrapper>
      {/* <LeftContents>
        <SelectBoxs></SelectBoxs>
      </LeftContents> */}
      <H1>이메일 발송하기</H1>
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
const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 80px;
  padding-left: 200px;
`;
export default Email;
