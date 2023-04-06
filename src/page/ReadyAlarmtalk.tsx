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
import { MapWrapper, Thead } from './UploadPage';
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
      <Wrapper>
        {isNullComponent === false ? (
          <>
            <H1>알림톡 전송 내용 조회</H1>
            <MapWrapper>
              <Table>
                <Thead style={{ fontWeight: 'bold' }}>
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
                        {el.talkContentId ? <Td>{el.talkContentId}</Td> : null}
                        {el.talkTemplateId ? (
                          <Td>{el.talkTemplateId}</Td>
                        ) : null}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </MapWrapper>
            <ButtonWrap>
              <Button onClick={() => navigate('/groupmanageList')}>
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
              <Button onClick={DoneAlertalkSend}>알림톡 전송 준비 완료</Button>
            </ButtonWrap>
          </>
        ) : (
          <>
            <ButtonWrap>
              <Button onClick={() => navigate('/groupmanageList')}>
                고객그룹등록하기
              </Button>
            </ButtonWrap>
          </>
        )}
      </Wrapper>
    </motion.div>
  );
}
const Td = styled.td`
  border-bottom: 1px solid black;
  vertical-align: middle;
  color: #555;
  padding: 5px;
  :nth-of-type(2) {
    text-align: center;
  }
`;
const Th = styled.th`
  border: 1px solid black;
  background-color: #f2f2f2;
  border: 1px solid #c7c7c7;
  color: #555;
  font-weight: bold;
  vertical-align: middle;
  min-width: 80px;
`;
const ButtonWrap = styled.div`
  width: 1080px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 50px;
`;
const Button = styled.button`
  border-radius: 15px;
  background-color: #000;
  color: #fff;
  width: 85px;
  padding: 10px 5px;
`;
const Contents = styled.div`
  width: 1080px;
  margin: 0px auto;
  overflow: auto;
`;
const Wrapper = styled.div`
  padding-left: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default ReadyAlarmtalk;
