import React from 'react';
import styled from 'styled-components';
import { Chart } from '../components/Chart';

function Statistics() {
  //참고할 레퍼런스
  // https://react-chartjs-2.js.org/examples/grouped-bar-chart

  return (
    <Wrapper>
      <Chart></Chart>
      <Chart></Chart>
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

export default Statistics;
