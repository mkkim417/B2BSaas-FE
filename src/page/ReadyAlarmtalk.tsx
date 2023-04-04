import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getCookie } from '../util/cookie';
import { Table } from './KakaoResultList';
import styled from 'styled-components';
import { HeaderContainer } from './GroupManageList';
import Pagination from 'react-js-pagination';
import { PaginationBox1 } from '../components/PaginationStyled';
import { useMutation } from 'react-query';
import { fetchTemplatesList } from '../axios/api';
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
      setTableData(
        res.data.data.map((el: any) => Object.assign(el.client, el.talkContent))
      );
      setKeyData(
        res.data.data.map((el: any) =>
          Object.keys(Object.assign(el.client, el.talkContent))
        )[0]
      );
      console.log(
        res.data.data.map((el: any) =>
          Object.keys(Object.assign(el.client, el.talkContent))
        )
      );
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
  console.log(
    'isKeyData : ',
    isKeyData.sort((a, b) => b - a)
  );
  console.log('isTableData : ', isTableData);
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
            <Contents>
              <HeaderContainer>알림톡 전송 내용 조회</HeaderContainer>
              <Table>
                <thead style={{ fontWeight: 'bold' }}>
                  <tr>
                    {isKeyData &&
                      isKeyData
                        .sort()
                        .map((el: any, idx: number) => (
                          <Th>{transData[el]}</Th>
                        ))}
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                  {isTableData &&
                    isTableData.map((el: any, idx: number) => (
                      <tr key={idx}>
                        <Td>{el.clientEmail}</Td>
                        <Td>{el.clientId}</Td>
                        <Td>{el.clientName}</Td>
                        <Td>{el.contact}</Td>
                        <Td>{el.createdAt}</Td>
                        <Td>{el.customerName}</Td>
                        <Td>{el.deliveryCompany}</Td>
                        <Td>{el.deliveryDate}</Td>
                        <Td>{el.deliveryNumber}</Td>
                        <Td>{el.deliveryTime}</Td>
                        <Td>{el.groupId}</Td>
                        <Td>{el.groupName}</Td>
                        <Td>{el.orderNumber}</Td>
                        <Td>{el.organizationName}</Td>
                        <Td>{el.paymentPrice}</Td>
                        <Td>{el.region}</Td>
                        <Td>{el.regionDetail}</Td>
                        <Td>{el.talkContentId}</Td>
                        <Td>{el.talkTemplateId}</Td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Contents>
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
`;
const ButtonWrap = styled.div`
  width: 1200px;
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
  width: 1200px;
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
