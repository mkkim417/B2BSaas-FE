import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getCookie } from '../util/cookie';
import { Table, Td, Th } from './KakaoResultList';
import styled from 'styled-components';
import { HeaderContainer } from './GroupManageList';
import Pagination from 'react-js-pagination';
import { PaginationBox1 } from '../components/PaginationStyled';
function ReadyAlarmtalk() {
  const params = useParams();
  const token = getCookie('userToken');
  const location = useLocation();
  const [isTableData, setTableData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isKeyData, setKeyData] = useState([]);
  const navigate = useNavigate();
  const DoneAlertalkSend = () => {
    navigate(`/alarmtalk/${params.id}`);
  };
  const fetchTemplateList = useCallback(async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/talk/clients/contents`,
          {
            groupId: params?.id,
            clientIds: location?.state.ArrClientsIdsData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTableData(
            res.data.data.map((el: any) =>
              Object.assign(el.client, el.talkContent)
            )
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
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const setPage = () => {};
  useEffect(() => {
    fetchTemplateList();
  }, [fetchTemplateList]);
  console.log(isKeyData);
  console.log(isTableData);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <Contents>
          <HeaderContainer>알림톡 전송 내용 조회</HeaderContainer>
          <Table>
            <thead style={{ fontWeight: 'bold' }}>
              <tr>
                {isKeyData &&
                  isKeyData.map((el: any, idx: number) => <Th>{el}</Th>)}
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
                    <Td>{el.customerName}</Td>
                    <Td>{el.deliveryCompany}</Td>
                    <Td>{el.deliveryDate}</Td>
                    <Td>{el.deliveryNumber}</Td>
                    <Td>{el.deliveryTime}</Td>
                    <Td>{el.groupId}</Td>
                    <Td>{el.orderNumber}</Td>
                    <Td>{el.organizationName}</Td>
                    <Td>{el.paymentPrice}</Td>
                    <Td>{el.region}</Td>
                    <Td>{el.regionDetail}</Td>
                    <Td>{el.talkContentId}</Td>
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
      </Wrapper>
    </motion.div>
  );
}

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
