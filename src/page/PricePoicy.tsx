import React, { useEffect } from 'react';
import styled from 'styled-components';

function PricePoicy() {
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
          <Li>
            prcie (1month) 10000
            <button
              type="button"
              id="purchase-button"
              className="mt30"
              onClick={() => {
                onClickPayment(10000);
              }}
            >
              결제하기
            </button>
          </Li>
          <Li>
            prcie (1month) 30000
            <button
              type="button"
              id="purchase-button"
              className="mt30"
              onClick={() => {
                onClickPayment(30000);
              }}
            >
              결제하기
            </button>
          </Li>
          <Li>
            prcie (1month) 1000
            <button
              type="button"
              id="purchase-button"
              className="mt30"
              onClick={() => {
                onClickPayment(80000);
              }}
            >
              결제하기
            </button>
          </Li>
        </Ul>
      </FlexWrap>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0px auto;
  width: 1200px;
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
const Li = styled.li`
  list-style: none;
  width: 200px;
  height: 350px;
  border: 5px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default PricePoicy;
