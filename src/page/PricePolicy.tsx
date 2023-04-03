import { range } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
            </IconDiv>
            <input type="range"></input>

            <Tooltip data-tooltip="설명입니다">
              <Stp>✔ 팀원 1명 권한 부여 가능</Stp>
            </Tooltip>
            <Tooltip data-tooltip="100건">
              <Stp>✔ 100건 가능</Stp>
            </Tooltip>
          </Trial>

          <Normal>
            <Textdiv>
              <H1>Free Trial</H1>
              <Stp>SendingGo의 서비스를 체험 해 보세요</Stp>
            </Textdiv>

            <IconDiv>
              <Stp>prcie: 10,000/month</Stp>

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
            </IconDiv>
            <Stp>✔ 팀원 3명 권한 부여 가능</Stp>
          </Normal>
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

const Normal = styled.li`
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

const H1 = styled.h1`
  font-size: 20px;
  color: #002ca6;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.span`
  position: relative;

  &:hover:before {
    content: attr(data-tooltip);
    width: 100%;
    background-color: #beb5b5;
    color: #fff;
  }
`;

export default PricePolicy;
