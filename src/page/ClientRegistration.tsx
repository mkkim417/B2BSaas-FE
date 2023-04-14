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
      <Wrapper1>
        <Title>고객등록</Title>
        <ClientHeader />
        <SingleUserCreate />
      </Wrapper1>
    </motion.div>
  );
}

export const Wrapper1 = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  padding-top: 60px;
  padding-left: 180px;
  background: #f2f4f8;
  padding-right: 30px;
  /* padding-left: 80px; */
  /* @media screen and (min-width: 1200px) {
    padding-left: inherit;
  } */
`;
export const Title = styled.div`
  color: #002333;
  font-weight: bold;
  font-size: 30px;
  font-weight: 800;
  padding-left: 30px;
  padding-top: 30px;
  /* margin-bottom: 30px; */
  /* background-color: red; */
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
