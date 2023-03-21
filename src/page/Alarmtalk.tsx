import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SelectBoxs from '../components/SelectBoxs';
import { ALAERMTALK_TEMPLATE } from '../constants/alarmtalk';
import AutoModal, {
  KakaoBox,
  WhiteWrap,
  YellowWrap,
} from '../components/Automodal';
import axios from 'axios';
function Alarmtalk() {
  const navigate = useNavigate();
  const sendKeyData = useSelector((state: any) => {
    return state.sendKey.sendKey;
  });
  const sendListData = useSelector((state: any) => {
    return state.sendList.sendList;
  });
  const sendGroupNameData = useSelector((state: any) => {
    return state.sendGroupName.sendGroupName;
  });
  const TemplatesNameDummy = () => {
    let Arr = [];
    for (const element in ALAERMTALK_TEMPLATE) {
      Arr.push(element);
    }
    return Arr;
  };

  const [isAutoModal, setAutoModal] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [isValue, setValue] = useState('');
  const [isAllData, setAllData] = useState<any>(
    ALAERMTALK_TEMPLATE['택배번호 안내']
  );
  const [isViewData, setViewData] = useState<string>(
    ALAERMTALK_TEMPLATE['택배번호 안내'].text
  );
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value);
  };

  const kakaoSaveFetch = async () => {
    const data = {
      clientId: 99,
      organizationName: '센딩고',
      orderNumber: '10230192393',
      region: '항해99배위',
      regionDetail: '101호실',
      deliveryDate: '2023-03-21',
      paymentPrice: 50000,
      deliveryCompany: '항해택배',
      deliveryTime: '오후 5시 30분경',
      deliveryNumber: '항해-12039123090',
      templateCode: 'TM_2048',
    };
    console.log(data);
    try {
      const response = await axios
        .post(`https://dev.sendingo-be.store/api/talk/contents`, data)
        .then((res) => {
          console.log(res);
        });
      console.log(response);
      alert('전송완료');
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  const highFunction = useCallback(
    (text: string, target: string) => {
      const obj_n = document.getElementById(`${target}`)?.innerHTML;
      const targetData = document.getElementById(`${obj_n}`)?.innerHTML;
      const ChangeData = sendListData[0][0][text];
      const sumData =
        document
          .getElementById('view')
          ?.innerHTML.split(`<span id=\"${obj_n}\">${targetData}`)[0] +
        `<span id=\"${obj_n}\">${ChangeData}` +
        document
          .getElementById('view')
          ?.innerHTML.split(`<span id=\"${obj_n}\">${targetData}`)[1];
      // console.log(sumData);
      setViewData(sumData);
      return;
    },
    [sendListData]
  );

  // onChange setState비동기
  useEffect(() => {
    if (currentValue !== null) {
      setAllData(ALAERMTALK_TEMPLATE[currentValue]);
      setViewData(ALAERMTALK_TEMPLATE[currentValue]['text']);
    }
  }, [currentValue]);

  return (
    <Wrapper>
      <LeftContents>
        <>
          <H1>알림톡 대량발송하기</H1>
          <select name="" id="" onChange={(e) => handleOnChangeSelectValue(e)}>
            {TemplatesNameDummy().map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))}
          </select>
          {isAllData.reqData.map((el: any, idx: any) => (
            <div key={idx}>
              {/* {#회사명} */}
              <div id={`obj_${idx}`}>{el}</div>
              <SelectBoxs
                currentCategoryValue={currentValue}
                className={`obj_${idx}`}
                propFunction={highFunction}
                optionData={(sendKeyData && sendKeyData[0]) || ['빈값입니다.']}
              ></SelectBoxs>
            </div>
          ))}
        </>
      </LeftContents>
      <RightContents>
        <ContnetDataWrap>
          <KakaoBox>
            <YellowWrap>
              {currentValue === null ? '택배번호 안내' : currentValue}
            </YellowWrap>
            <WhiteWrap
              id="view"
              dangerouslySetInnerHTML={{ __html: isViewData }}
            ></WhiteWrap>
          </KakaoBox>
        </ContnetDataWrap>
        <ButtonWrap>
          <Button onClick={() => navigate(-1)}>취소</Button>
          <Button
            onClick={() => {
              //setAutoModal((prev) => !prev);
              kakaoSaveFetch();
            }}
          >
            다음
          </Button>
        </ButtonWrap>
      </RightContents>
      {isAutoModal && isAutoModal ? (
        <AutoModal
          closeModal={setAutoModal}
          userNum={sendListData && sendListData[0]?.length}
          groupName={sendGroupNameData && sendGroupNameData[0]}
          isAllData={isViewData}
          currentValue={currentValue === null ? '택배번호 안내' : currentValue}
        />
      ) : null}
    </Wrapper>
  );
}

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 25px;
`;
export const RightContents = styled.div``;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;
const Button = styled.button`
  border-radius: 15px;
  border: 2px solid #000;
  background-color: white;
  color: #000;
  width: 85px;
  padding: 5px 0px;
`;
export const Wrapper = styled.div`
  padding-left: 200px;
  margin-top: 60px;
  display: flex;
  gap: 30px;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const LeftContents = styled.div`
  width: 200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ContnetDataWrap = styled.div`
  border-radius: 15px;
  width: 300px;
  padding: 10px;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 2px;
`;

export default Alarmtalk;
