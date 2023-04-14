import React from 'react';
import styled from 'styled-components';
import ClientHeader from '../components/ClientHeader';
import SingleUserCreate from './SingleUserCreate';
import { motion } from 'framer-motion';
import { Wrapper } from './KakaoResultList';
function ClientRegistration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <Title>고객등록</Title>
        <ClientHeader />
        <SingleUserCreate />
      </Wrapper>
    </motion.div>
  );
}
const Title = styled.div`
  color: #002333;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-left: 55px;
  padding-top: 60px;
  /* background-color: sandybrown; */
`;

export default ClientRegistration;
