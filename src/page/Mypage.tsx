import React from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';

function Mypage() {
  return (
    <Wrapper>
      <LogoText>Mypage</LogoText>
      <CotentsTxt>
        카카오톡 알림톡을 보내도 답변이 없어 막막하셨나요? 웹 서비스로 간편하게
        고객 관리를 해보세요!
      </CotentsTxt>
    </Wrapper>
  );
}

export default Mypage;

const LogoText = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const CotentsTxt = styled.div`
  font-size: 13px;
`;
