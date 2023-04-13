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
      alert('결제 금액을 확인해주세요');
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
              <H1>Free</H1>
              <H2>￦<MoneyDiv>0</MoneyDiv>/ month</H2>
            </Textdiv>

            <IconDiv>
              {/* <Stp>prcie: 0/month</Stp> */}
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
            <ConditionDiv>
            {/* <input type="range"></input> */}
            <Tooltip data-tooltip="권한 부여 갯수">
              <Stp><Exclamation>✓</Exclamation> 팀원 1명 권한 부여 가능</Stp>
            </Tooltip>
            <Tooltip data-tooltip="월 100건 무료">
              <Stp><Exclamation>✓</Exclamation>월 100건 가능</Stp>
            </Tooltip>
            </ConditionDiv>
          </Trial>

          <MainTrial>
          <BestDiv>BEST</BestDiv>
            <Textdiv>
              <H1>Business</H1>
              <H2>￦<MoneyDiv>29,000</MoneyDiv>/ 월</H2>
            </Textdiv>

            <IconDiv>
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
            <ConditionDiv>
            {/* <input type="range"></input> */}
            <Tooltip data-tooltip="권한 부여 갯수">
              <Stp><Exclamation>✓</Exclamation> 팀원 5명 권한 부여 가능</Stp>
            </Tooltip>
            <Tooltip data-tooltip="일일 빠른 지원">
              <Stp><Exclamation>✓</Exclamation>1일 이내 빠른 지원</Stp>
            </Tooltip>
            <Tooltip data-tooltip="월별 발송 건수">
              <Stp><Exclamation>✓</Exclamation>월 3,000건 가능</Stp>
            </Tooltip>
            <Tooltip data-tooltip="커스텀 템플릿 제공">
              <Stp><Exclamation>✓</Exclamation>커스텀 템플릿 20개</Stp>
            </Tooltip>
            </ConditionDiv>
          </MainTrial>


          <Trial>
            <Textdiv>
              <H1>Enterprise</H1>
              <H2><MoneyDiv>문의</MoneyDiv></H2>
            </Textdiv>

            <IconDiv>
              {/* <Stp>prcie: 0/month</Stp> */}
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
            <ConditionDiv>
            {/* <input type="range"></input> */}
            <Tooltip data-tooltip="권한 부여 갯수">
              <Stp><Exclamation>✓</Exclamation> 팀당 100명 권한 부여</Stp>
            </Tooltip>
            <Tooltip data-tooltip="일일 빠른 지원">
              <Stp><Exclamation>✓</Exclamation>8시간 이내 빠른 지원</Stp>
            </Tooltip>
            <Tooltip data-tooltip="월별 발송 건수">
              <Stp><Exclamation>✓</Exclamation>월 500,000건 가능</Stp>
            </Tooltip>
            <Tooltip data-tooltip="커스텀 템플릿 제공">
              <Stp><Exclamation>✓</Exclamation>커스텀 템플릿 500개</Stp>
            </Tooltip>
            </ConditionDiv>
          </Trial>

          {/* <Normal>
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
            <Tooltip>
              <Stp>✔ 팀원 1명 권한 부여 가능</Stp>
            </Tooltip>
            <Tooltip>
              <Stp>✔ 100건 가능</Stp>
            </Tooltip>
          </Trial> */}
        </Ul>
      </FlexWrap>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0px auto;
  width: 100%;
  /* padding-left: 250px; */
  padding-top: 50px;
  gap: 30px;
  height: 100vh;
  -webkit-box-pack: center;
  justify-content: center;
  display: flex;
  /* background-color: red; */
`;
const Ul = styled.ul`
  display: flex;
  width: 1100px;
  height: 480px;
  gap: 30px;
  /* background-color: red; */
`;

const Stp = styled.p`
  font-size: 20px;
  /* width: 200px; */
  /* font-weight: 900; */
  float: left;
  margin: 10px;
  /* background-color: aquamarine; */
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border: 2px solid #EBEFF4;
  border-top: 1ch;
  border-left: 1ch;
  border-right: 1ch;
  /* background-color: red; */
`;
const ConditionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const Exclamation = styled.div`
  font-size: 26px;
  /* font-weight: 500; */
  margin-right: 10px;
  float: left;
  color: #FBA94C;
`
const Trial = styled.li`
  list-style: none;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 5px solid #ccc;
  padding: 30px 20px 30px 20px;
  display: flex;
  /* align-items: left; */
  /* justify-content: center; */
  flex-direction: column;
  box-shadow: 0 2px 4px 0 #a4bde2;
  cursor: pointer;
  /* background-color: blueviolet; */

  :hover {
    background-color: #179A9C;
    color: white;
    border-color: #179A9C;
  }
  &:hover ${IconDiv} {
  border: 1px solid #002333;
  border-top: 1ch;
  border-left: 1ch;
  border-right: 1ch;
  }
`;

const MainTrial = styled(Trial)`
  padding: 0px 20px 30px 20px;
`
const BestDiv = styled.div`
  height: 20px;
  width: 50px;
  margin: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: #1E202C;
  border-radius: 5px;
  background-color: #FBA94C;
`

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
  background-color: beige;
`;

const Stbutton = styled.button`
  width: 300px;
  height: 60px;
  font-family: Whitney SSm A, Whitney SSm B, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  display: inline-block;
  padding: 0.7rem 1.5rem;
  font-size: 22px;
  line-height: normal;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: 0;
  color: #10313F;
  /* background-color: #3368fa; */
  border-color: #10313F;
  box-shadow: 0 2px 4px 0 #c8d7ee;
  transition: all 0.2s ease-in-out;
  
  :hover {
    background-color: #002333;
    border-color: #002333;
    color: white;
    font-weight: 700;
  }
`;

const Textdiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 0px 10px 10px 10px;
  margin-bottom: 20px;
  /* background-color: #e0ffef; */
`;

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
  font-weight: 900;
  color: #002333;
`;
const H2 = styled.p`
  font-size: 20px;
  height: 30px;
  display: flex;
  flex-direction: row;
  /* float: right; */
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  /* background-color: red; */
`
const MoneyDiv = styled.p`
  font-size: 26px;
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 900;
  /* background-color: red; */
`

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.span`
  position: relative;

  /* &:hover:before {
    content: attr(data-tooltip);
    position: relative;
    width: 100%;
    background-color: #beb5b5;
    color: #fff;
  } */
`;

export default PricePolicy;
