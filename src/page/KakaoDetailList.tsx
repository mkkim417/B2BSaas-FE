import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
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
import { Button, Thead } from './UploadPage';
import { Link } from 'react-router-dom';
import ArrowBack from '../asset/svg/ArrowBack';
function KakaoDetailList() {
  const token = getCookie('userToken');
  const params = useParams();
  const location = useLocation();
  const [isData, setData] = useState([]);
  const navigate = useNavigate();
  console.log(location.state.selectedValue);

  const KakaoDetail = useCallback(async () => {
    await axios
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
      <FlexWrapTable>
        <span
          style={{
            width: '45px',
            display: 'inline-block',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </span>
        <H1>전송상세조회</H1>
      </FlexWrapTable>
      <FlexWrap>
        <Halfdiv>
          <GrayWrapHeidght>
            <FlexWrapTable flexDirection="column">
              <FlexText>보낸날짜</FlexText>
              <ContentDiv>{location?.state?.sendDate}</ContentDiv>
            </FlexWrapTable>
          </GrayWrapHeidght>
          <GrayWrapHeidght>
            <FlexWrapTable flexDirection="column">
              <FlexText>총성공률(%)</FlexText>
              <ContentDiv>{location?.state?.success}%</ContentDiv>
            </FlexWrapTable>
          </GrayWrapHeidght>
          <GrayWrapHeidght>
            <FlexWrapTable flexDirection="column">
              <FlexText>그룹이름</FlexText>
              <ContentDiv>{location?.state?.groupName}</ContentDiv>
            </FlexWrapTable>
          </GrayWrapHeidght>
          <GrayWrapHeidght>
            <FlexWrapTable flexDirection="column">
              <FlexText>발송상태</FlexText>
              <ContentDiv>{location?.state?.sendState}</ContentDiv>
            </FlexWrapTable>
          </GrayWrapHeidght>
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
const FlexText = styled.div`
  color: #bdbdbd;
  font-size: 14px;
`;
const FlexWrapTable = styled.div<{
  marginBottom?: string;
  flexDirection?: string;
}>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : 'inherit'};
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'inhert'};
  gap: 10px;
`;
const FlexWrap = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin-top: 30px;
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
  width: 100%;
`;
const GrayWrapHeidght = styled(GrayWrap)`
  background: #fff;
  padding: 15px;
  justify-content: space-between;
  width: 25%;
`;

export default KakaoDetailList;
