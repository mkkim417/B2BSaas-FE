import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import {
  FlexWrap,
  GrayWrap,
  H1,
  Table,
  Td,
  Th,
  Wrapper,
} from './KakaoResultList';

function KakaoDetailList() {
  const params = useParams();
  const location = useLocation();
  console.log('location : ', location.state.groupName);
  const [isData, setData] = useState([]);
  const KakaoDetail = useCallback(async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/talk/results/detail/${params.id}`
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
          <GrayWrapHeidght>그룹이름</GrayWrapHeidght>
          <ContentDiv>{location?.state?.groupName}</ContentDiv>
        </Halfdiv>
        <Halfdiv>
          <GrayWrapHeidght>발송상태</GrayWrapHeidght>
          <ContentDiv>{location?.state?.sendState}</ContentDiv>
        </Halfdiv>
      </FlexWrap>
      <FlexWrap>
        <Halfdiv>
          <GrayWrapHeidght>실패건수</GrayWrapHeidght>
          <ContentDiv>{location?.state?.fcnt}</ContentDiv>
        </Halfdiv>
        <Halfdiv>
          <GrayWrapHeidght>성공률</GrayWrapHeidght>
          <ContentDiv>{location?.state?.success}%</ContentDiv>
        </Halfdiv>
      </FlexWrap>
      <FlexWrap>
        <Halfdiv>
          <GrayWrapHeidght>발송일자</GrayWrapHeidght>
          <ContentDiv>{location?.state?.sendDate}</ContentDiv>
        </Halfdiv>
        <Halfdiv>
          <GrayWrapHeidght>오픈율(%)</GrayWrapHeidght>
          <ContentDiv>준비중</ContentDiv>
        </Halfdiv>
      </FlexWrap>
      <Table>
        <thead style={{ fontWeight: 'bold' }}>
          <tr>
            <Th>고객ID</Th>
            <Th>메시지</Th>
            <Th style={{ width: '100px' }}>이름</Th>
            <Th style={{ width: '70px' }}>결과</Th>
            <Th style={{ width: '70px' }}>전화번호</Th>
            <Th>보낸날짜</Th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {isData &&
            isData.map((el: any, idx: number) => (
              <tr key={idx}>
                <InitTd>{el.clientId}</InitTd>
                <InitTd>{el.msgContent}</InitTd>
                <InitTd>{el.clientName}</InitTd>
                <InitTd>{el.resultMessage}</InitTd>
                <InitTd>{el.phone}</InitTd>
                <InitTd>{el.resultDate}</InitTd>
              </tr>
            ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const InitTd = styled(Td)`
  :nth-of-type(2) {
    text-align: center;
  }
`;
const ContentDiv = styled.div`
  padding-left: 20px;
`;
const Halfdiv = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;
const GrayWrapHeidght = styled(GrayWrap)`
  height: 50px;
  width: 150px;
`;

export default KakaoDetailList;
