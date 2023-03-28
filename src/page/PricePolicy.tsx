import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBicycle,
  faCar,
  faCarSide,
  faPaperPlane,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function PricePolicy() {
  const onClickPayment = (price: number) => {
    const { IMP } = window as any;
    IMP.init('iamport'); // 가맹점 식별코드
    // IMP.init('imp31132542'); // 가맹점 식별코드
    const amount = price;
    if (!amount) {
      alert('결제 금액1을 확인해주세요');
      return;
    }
    const data: any = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: amount,
      buyer_tel: '00-000-0000',
    };
    const callback = (response: any) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } =
        response;
      if (success) {
        console.log(response);
      } else {
        console.log(response);
      }
    };
    IMP.request_pay(data, callback);
  };
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  return (
    <Wrapper>
      <FlexWrap>
        <Ul>
          <Trial>
            <Textdiv>
              <H1>Free Trial</H1>
              <Stp>SendingGo의 서비스를 무료로 체험 해 보세요</Stp>
            </Textdiv>

            <IconDiv>
              <Stp>prcie: 0/month</Stp>

              <Stbutton
                type="button"
                id="purchase-button"
                className="mt30"
                onClick={() => {
                  onClickPayment(10000);
                }}
              >
                결제하기
              </Stbutton>
              <FontAwesomeIcon

                icon={faPaperPlane}
                style={{ color: '#256be4' }}
                display="flex"
                justify-content="center"
                align-items="center"
                flex-direction="column"
                size="2x"

              />
            </IconDiv>
            <Stp>✔ 팀원 1명 권한 부여 가능</Stp>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  SendingGo의 서비스를 한 달 간 무료로 체험해보세요
                </Tooltip>
              }
            >
              <Stp>✔ 무료 체험 기간: 1개월</Stp>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 발송에 필요한 간단한 예시 템플릿을 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔템플릿 제공</Stp>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 수신 및 클릭에 대한 통계를 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔ 이메일 전송 관련 인사이트</Stp>
            </OverlayTrigger>
          </Trial>
          <Standard>
            <Textdiv2>
              <H1>Standard</H1>
              <Stp>이메일 대량발송 서비스로 비즈니스 역량을 강화해보세요</Stp>
            </Textdiv2>
            <IconDiv>
              <Stp>prcie (1month) 30000</Stp>

              <Stbutton
                type="button"
                id="purchase-button"
                className="mt30"
                onClick={() => {
                  onClickPayment(30000);
                }}
              >
                결제하기
              </Stbutton>
              <FontAwesomeIcon
                icon={faBicycle}
                style={{ color: '#256be4' }}
                display="flex"
                justify-content="center"
                align-items="center"
                flex-direction="column"
                size="2x"
              />
            </IconDiv>
            <Stp>✔ 팀원 3명 권한 부여 가능</Stp>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  SendingGo의 서비스를 한 달 간 무료로 체험해보세요
                </Tooltip>
              }
            >
              <Stp>✔ 무료 체험 기간: 1개월</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 발송에 필요한 간단한 예시 템플릿을 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔템플릿 제공</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 수신 및 클릭에 대한 통계를 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔ 이메일 전송 관련 인사이트</Stp>
            </OverlayTrigger>
          </Standard>
          <Medium>
            <Textdiv3>
              <H1>Medium</H1>
              <Stp>이메일 대량발송 서비스로 비즈니스 역량을 강화해보세요</Stp>
            </Textdiv3>
            <IconDiv>
              <Stp>prcie (1month) 30000</Stp>
              <Stbutton
                type="button"
                id="purchase-button"
                className="mt30"
                onClick={() => {
                  onClickPayment(30000);
                }}
              >
                결제하기
              </Stbutton>
              <FontAwesomeIcon
                icon={faCarSide}
                style={{ color: '#256be4' }}
                display="flex"
                justify-content="center"
                align-items="center"
                flex-direction="column"
                size="2x"
              />
            </IconDiv>
            <Stp>✔ 팀원 3명 권한 부여 가능</Stp>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  SendingGo의 서비스를 한 달 간 무료로 체험해보세요
                </Tooltip>
              }
            >
              <Stp>✔ 무료 체험 기간: 1개월</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 발송에 필요한 간단한 예시 템플릿을 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔템플릿 제공</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 수신 및 클릭에 대한 통계를 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔ 이메일 전송 관련 인사이트</Stp>
            </OverlayTrigger>
          </Medium>
          <Highest>
            <Textdiv4>
              <H1>Highest</H1>
              <Stp>이메일 대량발송 서비스로 비즈니스 역량을 강화해보세요</Stp>
            </Textdiv4>
            <IconDiv>
              <Stp>prcie (1month) 30000</Stp>
              <Stbutton
                type="button"
                id="purchase-button"
                className="mt30"
                onClick={() => {
                  onClickPayment(30000);
                }}
              >
                결제하기
              </Stbutton>
              <FontAwesomeIcon
                icon={faRocket}
                style={{ color: '#256be4' }}
                display="flex"
                justify-content="center"
                align-items="center"
                flex-direction="column"
                size="2x"
              />
            </IconDiv>
            <Stp>✔ 팀원 3명 권한 부여 가능</Stp>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  SendingGo의 서비스를 한 달 간 무료로 체험해보세요
                </Tooltip>
              }
            >
              <Stp>✔ 무료 체험 기간: 1개월</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 발송에 필요한 간단한 예시 템플릿을 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔템플릿 제공</Stp>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-template">
                  이메일 수신 및 클릭에 대한 통계를 제공합니다.
                </Tooltip>
              }
            >
              <Stp>✔ 이메일 전송 관련 인사이트</Stp>
            </OverlayTrigger>
          </Highest>
        </Ul>
      </FlexWrap>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0px auto;
  width: 100%;
  padding-left: 250px;
  padding-top: 50px;
  gap: 30px;
  height: 100vh;
  -webkit-box-pack: center;
  justify-content: center;
  display: flex;
`;
const Ul = styled.ul`
  display: flex;
  gap: 30px;
`;

const Stp = styled.p`
  margin: 10px;
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Trial = styled.li`
  list-style: none;
  width: 100%;
  height: 100%;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 #c8d7ee;
`;

const Standard = styled.li`
  list-style: none;
  width: 100%;
  height: 100%;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 #c8d7ee;
`;

const Medium = styled.li`
  list-style: none;
  width: 100%;
  height: 100%;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 #c8d7ee;
`;

const Highest = styled.li`
  list-style: none;
  width: 100%;
  height: 100%;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 #c8d7ee;
`;

const Stbutton = styled.button`
  font-family: Whitney SSm A, Whitney SSm B, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  display: inline-block;
  padding: 0.7rem 1.5rem;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 4px;
  outline: 0;
  color: #fff;
  background-color: #3368fa;
  border-color: #3368fa;
  box-shadow: 0 2px 4px 0 #c8d7ee;
  transition: all 0.2s ease-in-out;
`;

const Textdiv = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  background-color: #e0ffef;
`;

const Textdiv2 = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  background-color: #fff7e5;
`;

const Textdiv3 = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  background-color: #f5f8ff;
`;

const Textdiv4 = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  background-color: #ecedf0;
`;

const H1 = styled.h1`
  font-size: 20px;
  color: #002ca6;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default PricePolicy;
