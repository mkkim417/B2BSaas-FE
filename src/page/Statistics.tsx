import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker'

// 라이브러리 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data1 = [
//   { x: 'January', y: 1 },
//   { x: 'February', y: 2 },
//   { x: 'March', y: 3 },
//   { x: 'April', y: 4 },
//   { x: 'May', y: 5 }
// ]
  // const data1 = [1, 2, 3, 4, 6]
  // const data2 = [2, 3, 4, 5 ,7]

// export const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: data2,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: data1,
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };


function Statistics() {  
  // select 박스 값
  const selectList = ['첫번째', '두번째', '세번째']

  // select값 state 
  const [ selectedValue, setSelectedValue ] = useState('');

  // 데이터 값들
  const [ firstData, setFirstData ] = useState<number[]>([]);
  const [ secondData, setSecondData ] = useState<number[]>([]);

  const selectHandler = (e : any) => {
    setSelectedValue(e.target.value)
  }

  // 그래프 셋팅
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: firstData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: secondData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    console.log('select값', selectedValue)

    if ( selectedValue === '첫번째') {
      setFirstData([1, 2, 3, 4, 5])
      setSecondData([5, 4, 3, 2, 1])
    } else if ( selectedValue === '두번째') {
      setFirstData([300, 100, 400, 300, 200])
      setSecondData([100, 600, 700, 200, 100])
    } else {
      setFirstData([1000, 2000, 3000, 4000, 5000])
      setSecondData([5000, 4000, 3000, 2000, 1000])
    }
  }, [selectedValue])
  return (
    <Container>
        {selectedValue}
        <select onChange={selectHandler}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      <Line options={options} data={data} />
    </Container>
  )
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 200px;
  gap: 30px;
  padding: 200px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100vw; */
  width: 80%;
  height: 80%;
  margin-top: 100px;
  margin-left: 220px;
  /* padding-top: 100px;
  padding-left: 300px; */
  /* margin: 0 auto; */
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  /* background-color: sandybrown; */
`;

const StaticContainer = styled.div`
  max-width: 1000px;
  max-height: 800px;
  background-color: red;
`

export default Statistics
