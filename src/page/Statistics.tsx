import React from 'react';
import styled from 'styled-components';
import { Chart } from '../components/Chart';
import { motion } from 'framer-motion';

function Statistics() {
  //참고할 레퍼런스
  // https://react-chartjs-2.js.org/examples/grouped-bar-chart

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <Chart></Chart>
      </Wrapper>
    </motion.div>
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

export default React.memo(Statistics);
