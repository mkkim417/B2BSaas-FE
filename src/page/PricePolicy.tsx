import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
              <H1>무료 체험</H1>
              <p>SendingGo의 서비스를 무료로 체험 해 보세요</p>
            </Textdiv>
            <div>
              prcie: 0/month
              {/* <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: '#256be4' }}
                display="flex"
                justify-content="center"
                align-items="center"
                flex-direction="column"
                size="2x"
              /> */}
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
            </div>
            <p>✔ 무료 체험 기간: 1개월</p>
            <p>✔ 템플릿 제공</p>
            <p>✔ 이메일 전송 관련 인사이트</p>
          </Trial>
          <Standard>
            prcie (1month) 30000
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
          </Standard>
          <Medium>
            prcie (1month) 1000
            <Stbutton
              type="button"
              id="purchase-button"
              className="mt30"
              onClick={() => {
                onClickPayment(80000);
              }}
            >
              결제하기
            </Stbutton>
          </Medium>
          <Highest>
            prcie (1month) 1000
            <Stbutton
              type="button"
              id="purchase-button"
              className="mt30"
              onClick={() => {
                onClickPayment(80000);
              }}
            >
              결제하기
            </Stbutton>
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
const Trial = styled.li`
  list-style: none;
  width: 100%;
  height: 350px;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Standard = styled.li`
  list-style: none;
  width: 100%;
  height: 350px;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Medium = styled.li`
  list-style: none;
  width: 100%;
  height: 350px;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Highest = styled.li`
  list-style: none;
  width: 100%;
  height: 350px;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
