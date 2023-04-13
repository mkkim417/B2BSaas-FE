import React, { useEffect, useState } from 'react';
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
import { useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { currentStatistic, timelyStatistic } from '../axios/api';
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
      display: false,
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
  // useQuery
  // const queryClient = useQueryClient();
  // select 박스 값
  const selectList = ['시간별 통계', '두번째', '세번째'];

  // select값 state
  const [selectedValue, setSelectedValue] = useState('');

  // 행값 배열
  const [ timeRow, setTimeRow ] = useState([] as any)
  // 시간별 행값 필터링용 배열

  // 데이터 값들
  const [firstData, setFirstData] = useState([] as any);
  const [secondData, setSecondData] = useState([] as any);

  const selectHandler = (e: any) => {
    setSelectedValue(e.target.value);
  };
  // 현재 데이터 get API
  const { data: currentData } = useQuery<any, AxiosError>(
    ['getCurrentData'], () => currentStatistic(), {
      onSuccess : (response) => {
        // console.log('현재데이터', response)
      },
      onError : (error) => {
        console.log(error)
      }
    }
  )
  // 시간 통계데이터 get API
  const { data : timelyData } = useQuery<any, AxiosError>(
    ['getTimelyData'], () => timelyStatistic(), {
      refetchOnWindowFocus: false,
      onSuccess : (response) => {
        console.log('시간별데이터', response.data)
        // console.log(response.data.map((item:any) =>
        //   item.createdAt.substr(0,10)))

        response.data.map((item:any) => {
          console.log(item.createdAt.substr(0,16))
          if( !(timeRow.includes(item.createdAt.substr(0,16)))) {
            timeRow.push(item.createdAt.substr(0,16))
            firstData.push(item.accumulateSuccessRatio) // 발신성공률
            secondData.push(item.accumulateClickRatio)  // 링크 클릭률
          }
          setTimeRow(timeRow)
          setFirstData(firstData)
          setSecondData(secondData)
        })
      },
      onError : (error) => {
        console.log(error)
      }
    }
  )


  // 그래프 셋팅
  const data = {
    type: 'line',
    labels: timeRow,
    datasets: [
      {
        label: '전송 성공률',
        data: firstData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '전송 링크 클릭률',
        data: secondData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    // if (selectedValue === '첫번째') {
    //   setFirstData([1, 2, 3, 4, 5]);
    //   setSecondData([5, 4, 3, 2, 1]);
    // } else if (selectedValue === '두번째') {
    //   setFirstData([300, 100, 400, 300, 200]);
    //   setSecondData([100, 600, 700, 200, 100]);
    // } else {
    //   setFirstData([1000, 2000, 3000, 4000, 5000]);
    //   setSecondData([5000, 4000, 3000, 2000, 1000]);
    // }
  }, []);
  return (
    <Wrapper>
      <FirstContainer>
      <TitleContainer>
        나의 통계 그래프
      </TitleContainer>
        <RowBox>
          <ListContainer>
          <RowContainer>
            <CountBox color="#F9FAFC">
              총 고객수
              <CountFont>{currentData?.data.totalClientCount}명</CountFont>
            </CountBox>
            <CountBox color="#F9FAFC">
              총 그룹수 
              <CountFont>{currentData?.data.totalGroupCount}개</CountFont>
            </CountBox>
          </RowContainer>
          <RowContainer>
            <TotalBox color="#E9FFEA">
              전체 발신성공률 
              <TotalFont color="#50B956">
                {currentData?.data.accumulateSuccessRatio}%
              </TotalFont>
            </TotalBox>
            <TotalBox color="#EEF8FF">
              발신메세지 클릭률
              <TotalFont color="#3599F9">
                {currentData?.data.accumulateClickRatio}%
              </TotalFont>
            </TotalBox>
          </RowContainer>
          </ListContainer>
          {/* <RightListContainer>
            <ListTitle>최근 발송 내역</ListTitle>
            <div>안녕하세요 반가워용</div>
            <div>안녕하세요 반가워용</div>
            <div>안녕하세요 반가워용</div>
            <div>안녕하세요 반가워용</div>
            <div>안녕하세요 반가워용</div>
          </RightListContainer> */}
        </RowBox>
      </FirstContainer>
      <SecondContainer>
      <OptionBox>
      {selectedValue}
      <select onChange={selectHandler}>
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      </OptionBox>
      <GraphContainer>
      <Line options={options} data={data} />
      </GraphContainer>
      </SecondContainer>
    
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  padding-left: 55px;
  gap: 30px;
  position: fixed;
  /* background-color: sandybrown; */
`;

const TitleContainer = styled.div`
  width: 100vw;
  padding : 20px 0px 20px 50px;
  font-size: 2rem;
  font-weight: 900;
  /* background-color: azure; */
`
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`
const ListContainer = styled.div`
  width: 640px;
  height: 210px;
  /* border: 1px solid dimgray; */
  border-radius: 20px;
  /* background-color: darkblue; */
`
const RightListContainer = styled(ListContainer)`
  width: 640px;
  height: 210px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid dimgray;
  border-radius: 20px;
  gap: 10px;
  background-color: whitesmoke;
`
const ListTitle = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 10px;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px;
  /* background-color: dimgray; */
`
const CountBox = styled.div<{color : any}>`
  width: 300px;
  height: 70px;
  font-weight: 700;
  padding: 10px 0px 0px 15px;
  border-radius: 20px;
  background-color: ${(props: any) => props.color};
`
const CountFont = styled.div`
  width: 295px;
  padding-right: 30px;
  font-size: 30px;
  font-weight: 900;
  color: #056039;
  text-align: end;
`
const TotalBox = styled.div<{color : any}>`
  width: 300px;
  height: 100px;
  font-weight: 700;
  padding: 10px 0px 0px 15px;
  border-radius: 20px;
  background-color: ${(props: any) => props.color};
`
const TotalFont = styled.div<{color : any}>`
  height: 70px;
  width: 280px;
  padding-right: 20px;
  font-size: 40px;
  font-weight: 900;
  color: ${(props: any) => props.color};
  display: flex;
  justify-content: end;
  align-items: center;
  /* background-color: #636969; */
`
const FirstContainer = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #636969;
  border-left: 1ch;
  border-right: 1ch;
  border-top: 1ch;
`;

const SecondContainer = styled.div`
  width: 100vw;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: pink; */
`;
const OptionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50px;
`
const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 400px;
`

export default Statistics;
