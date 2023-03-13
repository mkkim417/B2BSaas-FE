import React from 'react';
import styled from 'styled-components';

function Home() {
  return (
    <Wrapper>
      <LogoText>SendinGo</LogoText>
      <CotentsTxt>
        카카오톡 알림톡을 보내도 답변이 없어 막막하셨나요? 웹 서비스로 간편하게
        고객 관리를 해보세요!
      </CotentsTxt>
      <VideoBox controls />
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 200px;
  gap: 30px;
`;
const LogoText = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const CotentsTxt = styled.div`
  font-size: 13px;
`;
const VideoBox = styled.video`
  width: 300px;
  height: 300px;
`;
export default Home;
