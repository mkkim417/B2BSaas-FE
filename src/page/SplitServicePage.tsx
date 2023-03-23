import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Kakao from '../asset/svg/Kakao';
import { LeftContents, RightContents } from './Alarmtalk';
import { motion } from 'framer-motion';
function SplitServicePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper style={{ gap: '100px', flexDirection: 'column' }}>
        <WrapperService>
          <H1>서비스 선택</H1>
          <div style={{ display: 'flex', gap: '50px' }}>
            <AlginCenter>
              <Link to={'/alarmtalk'}>
                <KakaoWrap style={{ alignItems: 'center' }}>
                  <Kakao />
                </KakaoWrap>
              </Link>
              <MarginTop>카카오알림톡</MarginTop>
            </AlginCenter>
            <AlginCenter>
              <Link to={'/emailtemplates'}>
                <KakaoWrap>
                  <img
                    src={'https://illustoon.com/photo/dl/7764.png'}
                    alt={'email'}
                  />
                </KakaoWrap>
                <MarginTop>이메일</MarginTop>
              </Link>
            </AlginCenter>
          </div>
        </WrapperService>
      </Wrapper>
    </motion.div>
  );
}
const MarginTop = styled.div`
  margin-top: 17px;
`;
const AlginCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const WrapperService = styled.div`
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 190px;
`;
const H1 = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 25px;
`;
const KakaoWrap = styled.span`
  width: 80px;
  height: 80px;
  display: flex;
`;
const Wrapper = styled.div`
  padding-left: 200px;
  display: flex;
  gap: 30px;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default SplitServicePage;
