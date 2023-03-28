import React from 'react';
import styled from 'styled-components';
import ClientHeader from '../components/ClientHeader';
import SingleUserCreate from './SingleUserCreate';
import { motion } from 'framer-motion';
function ClientRegistration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <ClientHeader />
        <SingleUserCreate />
      </Container>
    </motion.div>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  padding-left: 250px;
  /* background-color: sandybrown; */
`;

export default ClientRegistration;
