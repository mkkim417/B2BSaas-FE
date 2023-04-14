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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../util/cookie';
import { Button, Thead } from './UploadPage';
import SelectBoxs from '../components/SelectBoxs';
import ArrowDown from '../asset/svg/ArrowDown';
function KakaoResultList() {
  //페이지네이션
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [postPerPage] = useState(5);
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const navigate = useNavigate();
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
        await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/talk/results/list?groupId=${groupId}`,
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            console.log(res.data.data);
            setGroupClient(res.data.data.list);
            setTotal(res.data.data.list.length);
          });
      } else {
        await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/talk/results/list?groupId=${groupId}&startdate=${startDay}&enddate=${endData}`,
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            console.log(res.data.data);
            setGroupClient(res.data.data.list);
            setTotal(res.data.data.list.length);
          });
      }
    },
    []
  );
  //yyyymmdd date변환 gkatn
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + month + day;
  }
  const handleOnChangeSelectValue = (e: any) => {
    console.log(e.target.value);
    setCurrentValue(e.target.value);
    setValue([null, null]);
  };
  useEffect(() => {
    getGroupData();
  }, [getGroupData]);

  useEffect(() => {
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
  console.log('location : ', location);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <H1 marginBottom="30px">전송결과</H1>
        <FlexWrapResult>
          <FlexWrap>
            <GrayWrap>고객그룹</GrayWrap>
            <select
              style={{
                height: '40px',
                border: '1px solid #bdbdbd',
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
                      numberOfColumns={2}
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
                <Th>
                  <FlexWrapTable>
                    보낸날짜
                    <span style={{ width: '18px', display: 'inline-block' }}>
                      <ArrowDown />
                    </span>
                  </FlexWrapTable>
                </Th>
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
                      <Link
                        to={`/kakaodetaillist/${el.talkSendId}`}
                        state={{
                          groupName: `${el.groupName}`,
                          sendState: `${el.sendState}`,
                          fcnt: `${el.fcnt}`,
                          success: `${(el.scnt / el.msgCount) * 100}`,
                          sendDate: `${el.sendDate}`,
                          selectedValue: currentValue,
                        }}
                      >
                        <Button width="100px" padding="8px">
                          상세보기
                        </Button>
                      </Link>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {isGroupClient && isGroupClient.length === 0 ? (
            <FlexWrapAlert>
              <AlertNoGroup>
                전송내역이 없습니다.
                <AlertBox onClick={() => navigate('/groupManageList')}>
                  알림톡 전송하러 가기
                </AlertBox>
              </AlertNoGroup>
            </FlexWrapAlert>
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
const AlertBox = styled.div`
  padding: 15px;
  border: 2px solid #159a9c;
  cursor: pointer;
  color: #159a9c;
`;
export const FlexWrapTable = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : 'inherit'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FlexWrapAlert = styled(FlexWrapTable)`
  height: 100%;
  flex-direction: column;
`;
const AlertNoGroup = styled.div`
  font-weight: bold;
  padding: 10px;
  display: flex;
  font-size: 20px;
  height: 100%;
  margin-top: 15px;
  align-items: center;
  gap: 30px;
  justify-content: center;
`;
export const FlexWrapResult = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 30px;
`;
export const MapWrapper = styled.div`
  width: 100%;
  min-height: 65vh;
  border-radius: 8px;
  margin: 15px auto;
  flex-direction: column;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: start;
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
  background: #fff;
  border-spacing: 0px 10px;
`;
export const GrayWrap = styled.div`
  margin-right: 10px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
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
  align-items: start;
  justify-content: start;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 90px;
  min-height: 100vh;
  padding-left: 210px;
  background: #f2f4f8;
  padding-right: 30px;
  /* padding-left: 80px; */
  /* @media screen and (min-width: 1200px) {
    padding-left: inherit;
  } */
`;
export const H1 = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : 'inherit'};
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #000;
  //background: linear-gradient(to top, #36fead 40%, transparent 40%);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export default KakaoResultList;
