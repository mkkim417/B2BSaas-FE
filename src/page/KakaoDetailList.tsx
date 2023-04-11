import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import {
  GrayWrap,
  H1,
  MapWrapper,
  Table,
  Td,
  Th,
  Wrapper,
} from './KakaoResultList';
import { getCookie } from '../util/cookie';
import { Thead } from './UploadPage';
function KakaoDetailList() {
  const token = getCookie('userToken');
  const params = useParams();
  const location = useLocation();
  const [isData, setData] = useState([]);
  const KakaoDetail = useCallback(async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/talk/results/detail/${params.id}`,
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log('res.data : ', res.data.data);
        setData(res.data.data);
      });
  }, [params.id]);
  useEffect(() => {
    KakaoDetail();
  }, [KakaoDetail]);
  return (
    <Wrapper>
      <H1>전송상세조회</H1>
      <FlexWrap>
        <Halfdiv>
          <GrayWrapHeidght>보낸날짜</GrayWrapHeidght>
          <ContentDiv>{location?.state?.sendDate}</ContentDiv>
        </Halfdiv>
        <Halfdiv>
          <GrayWrapHeidght>총성공률(%)</GrayWrapHeidght>
          <ContentDiv>{location?.state?.success}%</ContentDiv>
        </Halfdiv>
      </FlexWrap>
      <FlexWrap>
        <Halfdiv>
          <GrayWrapHeidght>그룹이름</GrayWrapHeidght>
          <ContentDiv>{location?.state?.groupName}</ContentDiv>
        </Halfdiv>
        <Halfdiv>
          <GrayWrapHeidght>발송상태</GrayWrapHeidght>
          <ContentDiv>{location?.state?.sendState}</ContentDiv>
        </Halfdiv>
      </FlexWrap>
      <MapWrapper>
        <Table>
          <Thead style={{ fontWeight: 'bold' }}>
            <tr>
              <Th>보낸날짜</Th>
              <Th>메시지</Th>
              <Th style={{ width: '100px' }}>보낸사람</Th>
              <Th style={{ width: '70px' }}>전화번호</Th>
              <Th style={{ width: '70px' }}>결과</Th>
            </tr>
          </Thead>
          <tbody style={{ textAlign: 'center' }}>
            {isData &&
              isData.map((el: any, idx: number) => (
                <tr key={idx}>
                  <InitTd>{el.resultDate}</InitTd>
                  <InitTd>{el.msgContent}</InitTd>
                  <InitTd>{el.clientName}</InitTd>
                  <InitTd>{el.phone}</InitTd>
                  <InitTd>
                    {el.resultMessage === '성공' ? (
                      <span style={{ color: '#14b769', fontWeight: 'bold' }}>
                        성공
                      </span>
                    ) : null}
                  </InitTd>
                </tr>
              ))}
          </tbody>
        </Table>
      </MapWrapper>
    </Wrapper>
  );
}
const FlexWrap = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
`;
const InitTd = styled(Td)`
  :nth-of-type(2) {
    text-align: center;
  }
`;
const ContentDiv = styled.div``;
const Halfdiv = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;
const GrayWrapHeidght = styled(GrayWrap)``;

export default KakaoDetailList;
