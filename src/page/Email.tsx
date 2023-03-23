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
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
function Email() {
  const location = useLocation();
  const [editorState, setEditorState] = useState<EditorState | any>(undefined);
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
      //   JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      // );
      console.log(
        'editorState =>',
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
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
          EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(EMAIL_TEMPLATE[location.state.id]['text'] as any)
            )
          )
          // editorStateSecond
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
      <TopWrapper>
        <H1>이메일 작성</H1>
        <TopWrapper>
          <ButtonSecond>미리보기</ButtonSecond>
          <Button>발송</Button>
        </TopWrapper>
      </TopWrapper>
      <div>
        <div>
          <div>받는사람</div>
          <div></div>
        </div>
        <div>
          <div>제목</div>
          <div></div>
        </div>
      </div>
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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;
const Button = styled.div`
  height: 30px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonSecond = styled.div`
  height: 30px;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #000;
`;
const H1 = styled.h1`
  margin: 30px 0px;
  font-weight: bold;
  font-size: 25px;
`;
const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  padding-left: 250px;
  width: 100%;
`;
export default Email;
