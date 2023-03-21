import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Wrapper>
      <LeftContnets>
        <LogoText>
          <div>SendinGo 관련 두줄</div>
          <div>소개글 작성</div>
        </LogoText>
        <CotentsTxt>
          <div>이메일을 보내도 답변이 없으셔서 막막하셨나요? </div>
          <div>SendinGo와 함께 간편학게고객관리를 해보세요!</div>
        </CotentsTxt>
      </LeftContnets>
      <VideoBox controls />
    </Wrapper>
  );
}
const LeftContnets = styled.div`
  width: 650px;
  text-align: left;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
`;
const LogoText = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
`;
const CotentsTxt = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  gap: 10px;
`;
const VideoBox = styled.video`
  width: 500px;
  height: 300px;
`;
export default Home;
