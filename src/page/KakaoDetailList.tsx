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
      <BtnWrap>
        <Link
          to={'/kakaoresultlist'}
          state={{
            selectedValue: location.state.selectedValue,
          }}
        >
          <Button width="100px" padding="8px">
            뒤로가기
          </Button>
        </Link>
      </BtnWrap>
    </Wrapper>
  );
}
const BtnWrap = styled.div`
  width: 100%;
`;
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
