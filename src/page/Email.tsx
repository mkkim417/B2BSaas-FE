import React, { useEffect, useState, useCallback } from 'react';
import CustomEditor from '../components/Editor';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import { LeftContents, RightContents } from './Alarmtalk';
import SelectBoxs from '../components/SelectBoxs';
import { EMAIL_TEMPLATE } from '../constants/emailTemplates';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import htmlToDraft from 'html-to-draftjs';
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
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
    }
  };

  const htmlToEditor = `<pre>const editorToHtml = 
  draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
  <p style="text-align:center;"><strong>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
  </strong></p>`;
  const blocksFromHtml = htmlToDraft(htmlToEditor);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorStateSecond = EditorState.createWithContent(contentState);
  useEffect(() => {
    if (location.state.id !== null) {
      if (!editorState) {
        setEditorState(
          // EditorState.createWithContent(
          //   convertFromRaw(
          //     JSON.parse(EMAIL_TEMPLATE[location.state.id]['text'] as any)
          //   )
          // )
          editorStateSecond
        );
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, []);
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
const H1 = styled.h1`
  margin: 30px 0px;
  font-weight: bold;
  font-size: 25px;
`;
const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  padding-top: 80px;
  padding-left: 350px;
  width: 100%;
  margin: 100px auto;
`;
export default Email;
