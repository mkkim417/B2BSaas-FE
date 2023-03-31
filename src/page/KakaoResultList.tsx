import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PaginationBox } from '../components/NotUsedPages/UserList';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Callander from '../asset/svg/Callander';
import useDetectClose from '../hook/useDetectClose';
import { Link } from 'react-router-dom';
import { getCookie } from '../util/cookie';
function KakaoResultList() {
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  const [total, setTotal] = useState<number>(0);
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); //
  const dropDownRef = useRef();

  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [isScheduleOpen, setScheduleOpen] = useState(false);

  const [isGroupList, setGroupList] = useState([]);
  const [isGroupClient, setGroupClient] = useState([]);
  const [currentValue, setCurrentValue] = useState();
  //그룹리스트
  const token = getCookie('userToken');
  const getGroupData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/groups`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    setGroupList(response.data.data);
    setCurrentValue(response.data.data[0]['groupId']);
  }, []);
  //발송조회리스트
  const kakaoResultListFetch = useCallback(
    async (groupId?: any, startDay?: string, endData?: string) => {
      console.log(groupId);
      ///api/talk/results/list?groupId={groupId}&startdate={YYYYMMDD:string}&enddate={YYYYMMDD:string}
      const skip = postPerPage * (currentPage - 1);
      if (startDay === undefined) {
        const response = await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/talk/results/list?groupId=${groupId}`,
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setGroupClient(res.data.data.list);
            setTotal(res.data.data.list.length);
          });
      } else {
        const response = await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/talk/results/list?groupId=${groupId}&startdate=${startDay}&enddate=${endData}`,
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setGroupClient(res.data.data.list);
            setTotal(res.data.data.list.length);
          });
      }
    },
    []
  );
  //발송상세조회
  const KakaoDetailBtn = useCallback(async (talkSendId: string) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/talk/results/detail/${talkSendId}`
      )
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  //yyyymmdd date변환 gkatn
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + month + day;
  }
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value);
    setValue([null, null]);
  };
  useEffect(() => {
    getGroupData();
  }, [getGroupData]);

  useEffect(() => {
    // if (currentValue === undefined) {
    //   // kakaoResultListFetch(
    //   //   isGroupList[0]['groupId'],
    //   //   formatDate(value[0]),
    //   //   formatDate(value[1])
    //   // );
    //   //console.log(isGroupList && isGroupList[0]['groupId']);
    // }
    if (currentValue !== null) {
      if (value[0] !== null) {
        kakaoResultListFetch(
          currentValue,
          formatDate(value[0]),
          formatDate(value[1])
        );
      } else {
        kakaoResultListFetch(currentValue);
      }
    }
    //캘린더 선택시
  }, [value, currentValue]);
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
          <select name="" id="" onChange={(e) => handleOnChangeSelectValue(e)}>
            {isGroupList?.map((item: any, idx: number) => {
              return (
                <option key={item.groupId} value={item.groupId}>
                  {item.groupName}({item.clientCount})
                </option>
              );
            })}
          </select>
        </FlexWrap>
        <FlexWrap>
          <GrayWrap>조회기간</GrayWrap>
          <CallanderWrap ref={dropDownRef as any}>
            {isOpen ? (
              <Group position="center">
                <Group position="center">
                  <DatePicker type="range" value={value} onChange={setValue} />
                </Group>
              </Group>
            ) : null}
            <div onClick={() => setIsOpen((prev: any) => !prev) as any}>
              <Callander />
            </div>
          </CallanderWrap>
        </FlexWrap>
        {/* <Button onClick={SubmitBtnHandler}>조회</Button> */}
        <Table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <Th>보낸날짜</Th>
              <Th>총메시지</Th>
              <Th>성공건수</Th>
              <Th>실패건수</Th>
              <Th>총성공률</Th>
              <Th>그룹명</Th>
              <Th>발송상태</Th>
              <Th>상세</Th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {isGroupClient &&
              isGroupClient.map((el: any, idx: number) => (
                <tr key={idx}>
                  <Td>{el.sendDate}</Td>
                  <Td>{el.msgCount}</Td>
                  <Td>{el.scnt}</Td>
                  <Td>{el.fcnt}</Td>
                  <Td>{(el.scnt / el.msgCount) * 100}%</Td>
                  <Td>{el.groupName}</Td>
                  <Td>{el.sendState}</Td>
                  <Td>
                    <StlyeBtn
                    // onClick={() => {
                    //   KakaoDetailBtn(el.talkSendId);
                    // }}
                    >
                      <Link
                        to={`/kakaodetaillist/${el.talkSendId}`}
                        state={{
                          groupName: `${el.groupName}`,
                          sendState: `${el.sendState}`,
                          fcnt: `${el.fcnt}`,
                          success: `${(el.scnt / el.msgCount) * 100}`,
                          sendDate: `${el.sendDate}`,
                        }}
                      >
                        상세보기
                      </Link>
                    </StlyeBtn>
                  </Td>
                </tr>
              ))}
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
          totalItemsCount={total}
          onChange={setCurrentPage}
        />
      </PaginationBox>
    </motion.div>
  );
}
const CallanderIconWrap = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;
const StlyeBtn = styled.span`
  background-color: #000;
  height: 30px;
  display: block;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Th = styled.th`
  border: 1px solid black;
  background-color: #f2f2f2;
  border: 1px solid #c7c7c7;
  color: #555;
  font-weight: bold;
  padding: 15px;
`;
export const Td = styled.td`
  border-bottom: 1px solid black;
  vertical-align: middle;
  color: #555;
  padding: 15px;
  :nth-of-type(2) {
    text-align: center;
  }
`;

const CallanderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
`;
export const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  border-collapse: seperate;
  border-spacing: 20px 30px;
`;
export const GrayWrap = styled.div`
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
export const FlexWrap = styled.div`
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
export const H1 = styled.div`
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
