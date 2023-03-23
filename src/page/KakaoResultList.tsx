import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PaginationBox } from './UserList';
import Pagination from 'react-js-pagination';
function KakaoResultList() {
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  const [count, setCount] = useState(0); // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  // const userData = userList.slice(indexOfFirstPost, indexOfLastPost)
  const setPage = (error: any) => {
    setCurrentPage(error);
  };
  const kakaoResultList = [
    {
      id: 1,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 2,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 3,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 4,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 5,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 6,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 7,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 8,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 9,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
    {
      id: 10,
      day: '2023.03.02',
      text: '신규가입자를 위한 이벤트',
      title: '3월신규가입자',
      reaction: '128',
      nope: '-',
      percent: '33%',
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <H1>전송결과조회</H1>
        <FlexWrap>
          <GrayWrap>고객그룹</GrayWrap>
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </FlexWrap>
        <FlexWrap>
          <GrayWrap>조회기간</GrayWrap>
        </FlexWrap>
        <Button>조회</Button>
        <Table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <Th>발송일자</Th>
              <Th>제목</Th>
              <Th>그룹명</Th>
              <Th>인원수</Th>
              <Th>발송상태</Th>
              <Th>오픈율(%)</Th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {/* {kakaoResultList &&
              kakaoResultList.map((el: any, idx: number) => (
                <tr key={idx}>
                  <td>{el}</td>
                </tr>
              ))} */}
            <tr>
              <Td>2023.03.02</Td>
              <Td>신규가입자를 위한 이벤트</Td>
              <Td>3월신규가입자</Td>
              <Td>128</Td>
              <Td>-</Td>
              <Td>33%</Td>
            </tr>
            <tr>
              <Td>2023.03.02</Td>
              <Td>신규가입자를 위한 이벤트</Td>
              <Td>3월신규가입자</Td>
              <Td>128</Td>
              <Td>-</Td>
              <Td>33%</Td>
            </tr>
            <tr>
              <Td>2023.03.02</Td>
              <Td>신규가입자를 위한 이벤트</Td>
              <Td>3월신규가입자</Td>
              <Td>128</Td>
              <Td>-</Td>
              <Td>33%</Td>
            </tr>
            <tr>
              <Td>2023.03.02</Td>
              <Td>신규가입자를 위한 이벤트</Td>
              <Td>3월신규가입자</Td>
              <Td>128</Td>
              <Td>-</Td>
              <Td>33%</Td>
            </tr>
          </tbody>
        </Table>
      </Wrapper>
      <PaginationBox>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={5}
          pageRangeDisplayed={5}
          prevPageText={'<'}
          nextPageText={'>'}
          totalItemsCount={kakaoResultList.length}
          onChange={setPage}
        />
      </PaginationBox>
    </motion.div>
  );
}
const Th = styled.th`
  border: 1px solid black;
  background-color: #f2f2f2;
  border: 1px solid #c7c7c7;
  color: #555;
  font-weight: bold;
  padding: 15px;
`;
const Td = styled.td`
  border-bottom: 1px solid black;
  color: #555;
  padding: 15px;
  :nth-of-type(2) {
    text-align: left;
  }
`;

const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  border-collapse: seperate;
  border-spacing: 20px 30px;
`;
const GrayWrap = styled.div`
  background-color: #f2f2f2;
  border: 1px solid #c7c7c7;
  color: #555;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.div`
  margin: 30px auto;
  width: 140px;
  height: 40px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FlexWrap = styled.div`
  display: flex;
  border: 1px solid #e7e7e7;
  height: 50px;
`;
export const Wrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  padding-left: 250px;
  padding-top: 50px;
  gap: 30px;
  justify-content: center;
`;
const H1 = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  color: #000;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export default KakaoResultList;
