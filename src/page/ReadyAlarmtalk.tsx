import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getCookie } from '../util/cookie';
import { H1, Table } from './KakaoResultList';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { PaginationBox1 } from '../components/PaginationStyled';
import { useMutation } from 'react-query';
import { fetchTemplatesList } from '../axios/api';
import {
  Button,
  ContentsWrap,
  MapWrapper,
  Td,
  Th,
  Thead,
  Wrapper,
} from './UploadPage';
function ReadyAlarmtalk() {
  const params = useParams();
  const token = getCookie('userToken');
  const location = useLocation();
  const [isTableData, setTableData] = useState([]);
  const [isKeyData, setKeyData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isNullComponent, setNullComponent] = useState(false);
  const navigate = useNavigate();
  //카카오내용 불러오기
  const DoneAlertalkSend = () => {
    navigate(`/alarmtalk/${params.id}`, {
      state: { ArrClientsIdsData: location?.state.ArrClientsIdsData },
    });
  };
  const { mutate } = useMutation(fetchTemplatesList, {
    onSuccess: (res) => {
      console.log(res.data.data);
      // setTableData(
      //   res.data.data.map((el: any) => Object.assign(el.client, el.talkContent))
      // );

      // console.log(
      //   res.data.data.map((el: any) =>
      //     Object.keys(Object.assign(el.client, el.talkContent))
      //   )
      // );
      const Data = res.data.data.map((el: any) =>
        Object.assign(el.client, el.talkContent)
      );

      const filteredData = Data.filter((obj: any) => {
        for (const prop in obj) {
          if (obj[prop] == null) {
            delete obj[prop];
          }
        }
        return Object.keys(obj).length > 0;
      });
      setKeyData(Object.keys(filteredData[0]) as any);
      setTableData(filteredData);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const setPage = () => {};
  useEffect(() => {
    //fetchTemplateList();
    if (location?.state?.ArrClientsIdsData) {
      mutate({
        groupId: params?.id,
        clientIds: location?.state.ArrClientsIdsData,
      });
    } else {
      setNullComponent(true);
    }
  }, [mutate]);
  console.log(isKeyData);
  const transData = {
    clientEmail: '이메일',
    clientId: 'ID',
    clientName: '이름',
    contact: '연락처',
    createdAt: '생성일',
    customerName: '고객명',
    deliveryCompany: '택배사',
    deliveryDate: '배송일',
    deliveryNumber: '송장번호',
    deliveryTime: '배송일자',
    groupId: '그룹ID',
    groupName: '그룹이름',
    orderNumber: '주문번호',
    organizationName: '회사명',
    paymentPrice: '결제금액',
    region: '구/면',
    regionDetail: '동/리',
    talkContentId: '알림톡컨텐츠ID',
    talkTemplateId: '템플릿ID',
  } as any;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <BottomWrap>
          {isNullComponent === false ? (
            <>
              <div style={{ textAlign: 'center', width: '1080px' }}>
                <H1>알림톡 전송 내용 조회</H1>
              </div>
              <MapWrapper>
                <Table>
                  <Thead>
                    <tr>
                      {isKeyData &&
                        isKeyData
                          .sort()
                          .map((el: any, idx: number) => (
                            <Th key={idx}>{transData[el]}</Th>
                          ))}
                    </tr>
                  </Thead>
                  <tbody style={{ textAlign: 'center' }}>
                    {isTableData &&
                      isTableData.map((el: any, idx: number) => (
                        <tr key={el.clientId}>
                          {el.clientEmail ? <Td>{el.clientEmail}</Td> : null}
                          {el.clientId ? <Td>{el.clientId}</Td> : null}
                          {el.clientName ? <Td>{el.clientName}</Td> : null}
                          {el.contact ? <Td>{el.contact}</Td> : null}
                          {el.createdAt ? <Td>{el.createdAt}</Td> : null}
                          {el.customerName ? <Td>{el.customerName}</Td> : null}
                          {el.deliveryCompany ? (
                            <Td>{el.deliveryCompany}</Td>
                          ) : null}
                          {el.deliveryDate ? <Td>{el.deliveryDate}</Td> : null}
                          {el.deliveryNumber ? (
                            <Td>{el.deliveryNumber}</Td>
                          ) : null}
                          {el.deliveryTime ? <Td>{el.deliveryTime}</Td> : null}
                          {el.groupId ? <Td>{el.groupId}</Td> : null}
                          {el.groupName ? <Td>{el.groupName}</Td> : null}
                          {el.orderNumber ? <Td>{el.orderNumber}</Td> : null}
                          {el.organizationName ? (
                            <Td>{el.organizationName}</Td>
                          ) : null}
                          {el.paymentPrice ? <Td>{el.paymentPrice}</Td> : null}
                          {el.region ? <Td>{el.region}</Td> : null}
                          {el.regionDetail ? <Td>{el.regionDetail}</Td> : null}
                          {el.talkContentId ? (
                            <Td>{el.talkContentId}</Td>
                          ) : null}
                          {el.talkTemplateId ? (
                            <Td>{el.talkTemplateId}</Td>
                          ) : null}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </MapWrapper>
              <ButtonWrap>
                <Button
                  width={'120px'}
                  padding={'10px'}
                  onClick={() => navigate('/groupmanageList')}
                >
                  그룹다시선택
                </Button>
                <PaginationBox1>
                  <Pagination
                    activePage={1}
                    // itemsCountPerPage={15}
                    pageRangeDisplayed={10}
                    prevPageText={'<'}
                    nextPageText={'>'}
                    totalItemsCount={1}
                    onChange={setPage}
                  />
                </PaginationBox1>
                <Button
                  width={'110px'}
                  padding={'10px'}
                  onClick={DoneAlertalkSend}
                >
                  알림톡 전송 준비 완료
                </Button>
              </ButtonWrap>
            </>
          ) : (
            <>
              <ButtonWrap>
                <NoticeFont>아직 등록된 클라이언트가 없으시네요 😊</NoticeFont>
                <Button
                  width={'150px'}
                  onClick={() => navigate('/groupmanageList')}
                >
                  고객그룹등록하기
                </Button>
              </ButtonWrap>
            </>
          )}
        </BottomWrap>
      </Container>
    </motion.div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-left: 80px;
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  /* background-color: sandybrown; */
`;

export const BottomWrap = styled.div<{ ref?: any }>`
  width: 100%;
  margin: 0px auto;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle;
  display: table-cell;
  @media screen and (min-width: 1300px) {
    display: flex;
    width: 1000px;
  }
`;
const ButtonWrap = styled.div`
  width: 1080px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 50px;
  /* background-color: red; */
`;
const NoticeFont = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: black;
`;
export default ReadyAlarmtalk;
