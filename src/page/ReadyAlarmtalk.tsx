import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { getCookie } from '../util/cookie';
import { FlexWrapResult, H1, Table, Wrapper } from './KakaoResultList';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { PaginationBox1 } from '../components/PaginationStyled';
import { useMutation } from 'react-query';
import { fetchTemplatesList } from '../axios/api';
import { Button, MapWrapper, Td, Th, Thead } from './UploadPage';
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
      // setTableData(
      //   res.data.data.map((el: any) => Object.assign(el.client, el.talkContent))
      // );
      // console.log(
      //   res.data.data.map((el: any) =>
      //     Object.keys(Object.assign(el.client, el.talkContent))
      //   )
      // );
      // .filter((el: any) => el !== 'talkContentId');
      console.log(res.data.data);
      const newData = res.data.data
        .map((el: any) => Object.assign(el.client, el.talkContent))
        .map((item: any) => {
          const {
            useLink,
            talkContentId,
            talkTemplateId,
            groupId,
            createdAt,
            clientId,
            ...rest
          } = item;
          return rest;
        });
      console.log(newData);

      setKeyData(Object.keys(newData[0]) as any);
      setTableData(newData);
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
      });
    } else {
      setNullComponent(true);
    }
  }, [mutate]);
  const transData = {
    organizationName: '회사명',
    orderNumber: '주문번호',
    region: '구/면',
    regionDetail: '동/리',
    deliveryDate: '월일',
    paymentPrice: '결제금액',
    deliveryCompany: '택배회사명',
    deliveryTime: '택배배송시간',
    deliveryNumber: '송장번호',
    customerName: '고객명',
    useLink: '사용법링크',
    clientEmail: '이메일',
    contact: '연락처',
    clientId: 'ID',
    clientName: '이름',
    createdAt: '생성일',
    groupId: '그룹ID',
    groupName: '그룹이름',
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
        <H1>알림톡 전송 내용 조회</H1>
        <FlexWrapResultResize>
          {isNullComponent === false ? (
            <>
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
              <div style={{ margin: '20px' }}></div>
              <ButtonWrap>
                <NewButton
                  width={'120px'}
                  padding={'10px'}
                  onClick={() => navigate('/groupmanageList')}
                >
                  뒤로가기
                </NewButton>
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
                <NewButton
                  width={'110px'}
                  padding={'10px'}
                  onClick={DoneAlertalkSend}
                >
                  다음단계
                </NewButton>
              </ButtonWrap>
            </>
          ) : (
            <>
              <NoticeFont>아직 선택된 그룹이 없으시네요 😊</NoticeFont>
              <NewButton
                width={'150px'}
                onClick={() => navigate('/groupmanageList')}
              >
                고객그룹등록하기
              </NewButton>
            </>
          )}
        </FlexWrapResultResize>
      </Wrapper>
    </motion.div>
  );
}
const NewButton = styled(Button)`
  height: 45px;
  padding: inherit;
`;
const FlexWrapResultResize = styled(FlexWrapResult)`
  align-items: center;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media screen and (min-width: 1300px) {
    display: flex;
    width: 1000px;
  }
`;
const NoticeFont = styled.div`
  font-size: 18px;
  margin: 10px 0px 20px;
  font-weight: 900;
  color: black;
`;
export default ReadyAlarmtalk;
