import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
function Home() {
  useEffect(() => {}, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <LeftContnets>
          <LogoText>
            <div>SendinGo 관련 두줄</div>
            <div>소개글 작성</div>
          </LogoText>
          <CotentsTxt>
            <div>이메일을 보내도 답변이 없으셔서 막막하셨나요? </div>
            <div>SendinGo와 함께 간편하게 고객관리를 해보세요!</div>
          </CotentsTxt>
        </LeftContnets>
        <VideoBox controls />
      </Wrapper>
    </motion.div>
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
