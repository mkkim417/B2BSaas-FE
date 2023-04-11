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
import { Button, Thead } from './UploadPage';
import SelectBoxs from '../components/SelectBoxs';
function KakaoResultList() {
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [postPerPage] = useState(5);
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [isGroupList, setGroupList] = useState([]);
  const [isGroupClient, setGroupClient] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

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
      const skip = postPerPage * (currentPage - 1);

      if (startDay === undefined) {
        console.log('3');
        await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/talk/results/list?groupId=${groupId}`,
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setGroupClient(res.data.data.list);
            setTotal(res.data.data.list.length);
          });
      } else {
        console.log('4');
        await axios
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
        console.log('1');
        kakaoResultListFetch(
          currentValue,
          formatDate(value[0]),
          formatDate(value[1])
        );
      } else {
        console.log('2');
        kakaoResultListFetch(currentValue);
      }
    }
    //캘린더 선택시
  }, [currentValue]);

  console.log('isGroupClient :', isGroupClient);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <H1>전송결과조회</H1>
        <FlexWrapResult>
          <FlexWrap>
            <GrayWrap>고객그룹</GrayWrap>
            {/* <SelectBoxs
            currentCategoryValue={currentValue}
            // className={`obj_${idx}`}
            // propFunction={messagePreviewFunc}
            optionData={['빈값입니다.']}
          ></SelectBoxs> */}
            {/* 셀렉트박스 넣을부분 */}
            <select
              style={{
                height: '40px',
                border: '2px solid #000',
                fontWeight: 'bold',
              }}
              name=""
              id=""
              onChange={(e) => handleOnChangeSelectValue(e)}
            >
              {isGroupList?.map((item: any, idx: number) => {
                return (
                  <option key={item.groupId} value={item.groupId}>
                    {item.groupName}({item.clientCount}명)
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
                    <DatePicker
                      type="range"
                      value={value}
                      onChange={setValue}
                    />
                  </Group>
                </Group>
              ) : null}
              <div onClick={() => setIsOpen((prev: any) => !prev) as any}>
                <Callander />
              </div>
            </CallanderWrap>
          </FlexWrap>
        </FlexWrapResult>
        {/* <Button onClick={SubmitBtnHandler}>조회</Button> */}
        <MapWrapper>
          <Table>
            <Thead>
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
            </Thead>
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
                      <Button width="100px" padding="8px">
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
                      </Button>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {isGroupClient && isGroupClient.length === 0 ? (
            <AlertNoGroup>그룹내 전송된 내역이 없습니다.</AlertNoGroup>
          ) : null}
        </MapWrapper>
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
      </Wrapper>
    </motion.div>
  );
}
const AlertNoGroup = styled.div`
  font-family: 'TheJamsil5Bold';
  font-weight: bold;
  background: linear-gradient(to top, rgb(54, 254, 173) 40%, transparent 40%);
  padding: 10px;
  margin-top: 15px;
`;
export const FlexWrapResult = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
export const MapWrapper = styled.div`
  width: 100%;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 20px 30px;
  margin: 15px auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
export const Th = styled.th``;
export const Td = styled.td`
  vertical-align: middle;
  :nth-of-type(2) {
    text-align: center;
  }
`;

const CallanderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px;
`;
export const GrayWrap = styled.div`
  margin-right: 10px;
  color: #14b769;
  font-family: 'TheJamsil5Bold';
  border: 2px solid #14b769;
  border-radius: 8px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FlexWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  /* padding-left: 80px; */
  /* @media screen and (min-width: 1200px) {
    padding-left: inherit;
  } */
`;
export const H1 = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'TheJamsil5Bold';
  text-align: left;
  color: #000;
  background: linear-gradient(to top, #36fead 40%, transparent 40%);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export default KakaoResultList;
