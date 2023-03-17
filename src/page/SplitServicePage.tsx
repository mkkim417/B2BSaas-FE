import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Kakao from '../asset/svg/Kakao';
import { H1, LeftContents, RightContents, Wrapper } from './Alarmtalk';

function SplitServicePage() {
  return (
    <Wrapper style={{ gap: '100px', flexDirection: 'column' }}>
      <H1>서비스 선택</H1>
      <div style={{ display: 'flex', gap: '50px' }}>
        <Link to={'/alarmtalk'}>
          <KakaoWrap style={{ alignItems: 'center' }}>
            <Kakao />
          </KakaoWrap>
        </Link>
        <Link to={'/email'}>
          <KakaoWrap>
            <img
              src={'https://illustoon.com/photo/dl/7764.png'}
              alt={'email'}
            />
          </KakaoWrap>
        </Link>
      </div>
    </Wrapper>
  );
}
const KakaoWrap = styled.span`
  width: 80px;
  height: 80px;
  display: flex;
`;

export default SplitServicePage;
