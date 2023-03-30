import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SelectBoxs from '../components/SelectBoxs';
import { ALAERMTALK_TEMPLATE } from '../constants/alarmtalk';
import { kakaoSendDataCreate } from '../redux/modules/kakaoSendData';
import AutoModal, {
  KakaoBox,
  WhiteWrap,
  YellowWrap,
} from '../components/Automodal';
import axios from 'axios';
import { motion } from 'framer-motion';
function Alarmtalk() {
  const dispatch = useDispatch();
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
  const clientIdData = useSelector((state: any) => {
    return state.clientsId.clientsId;
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
  const [isTarget, setTarget] = useState<string | undefined>(undefined);
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
  const refactoringFunc = (TM_CODE: any) => {
    console.log(isAllData); //
    console.log('TM_CODE : ', TM_CODE); //현재성택된 템플릿명
    console.log(sendListData); //엑셀데이터
    // const targetData = document.getElementById(`${isTarget}`)?.innerHTML;
    // console.log('targetData : ', targetData);
    console.log('isTarget : ', isTarget);
    const labelObj = document.getElementsByTagName('label');
    let labelArr = [] as any;
    for (let i = 0; i < labelObj.length; i++) {
      labelArr.push(labelObj[i].innerHTML);
    }
    console.log(sendListData[0]);
    console.log(clientIdData);
    let data = [] as any;
    if (TM_CODE === 'TM_2223') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          customerName: el[labelArr[0]],
          organizationName: el[labelArr[1]],
          templateCode: TM_CODE,
        });
      });
    } else if (TM_CODE === 'TM_2222') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          customerName: el[labelArr[0]],
          templateCode: TM_CODE,
        });
      });
    } else if (TM_CODE === 'TM_2220') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          customerName: el[labelArr[0]],
          templateCode: TM_CODE,
        });
      });
    } else if (TM_CODE === 'TM_2217') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          organizationName: el[labelArr[0]],
          orderNumber: el[labelArr[1]],
          region: el[labelArr[2]],
          regionDetail: el[labelArr[3]],
          deliveryDate: el[labelArr[4]],
          paymentPrice: el[labelArr[5]],
          templateCode: TM_CODE,
        });
      });
    } else if (TM_CODE === 'TM_2216') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          customerName: el[labelArr[0]],
          deliveryCompany: el[labelArr[1]],
          deliveryTime: el[labelArr[2]],
          deliveryNumber: el[labelArr[3]],
          templateCode: TM_CODE,
        });
      });
    } else if (TM_CODE === 'TM_2048') {
      sendListData[0]?.map((el: any, idx: number) => {
        data.push({
          clientId: clientIdData[0][idx],
          organizationName: el[labelArr[0]],
          orderNumber: el[labelArr[1]],
          region: el[labelArr[2]],
          regionDetail: el[labelArr[3]],
          deliveryDate: el[labelArr[4]],
          paymentPrice: el[labelArr[5]],
          templateCode: TM_CODE,
        });
      });
    }
    return data;
  };

  const kakaoSaveFetch = async () => {
    let data = refactoringFunc(isAllData.tmpCode);
    try {
      const response = await axios
        .post(`https://dev.sendingo-be.store/api/talk/contents`, { data })
        .then((res) => {
          console.log(res.data);
          dispatch(kakaoSendDataCreate(res.data.data));
        });
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  const messagePreviewFunc = useCallback(
    (text: string, target: string, groupId: string) => {
      const obj_n = document.getElementById(`${target}`)?.innerHTML;
      setTarget(text);
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
      console.log(obj_n);
      console.log(targetData);
      console.log(ChangeData);
      console.log(sumData);
      setViewData(sumData);
      return;
    },
    [sendListData]
  );
  console.log(isAllData.tmpCode);
  // onChange setState비동기
  useEffect(() => {
    if (currentValue !== null) {
      setAllData(ALAERMTALK_TEMPLATE[currentValue]);
      setViewData(ALAERMTALK_TEMPLATE[currentValue]['text']);
    }
  }, [currentValue]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <LeftContents>
          <>
            <H1>알림톡 대량발송하기</H1>
            <select
              name=""
              id=""
              onChange={(e) => handleOnChangeSelectValue(e)}
            >
              {TemplatesNameDummy().map((el, idx) => (
                <option key={idx} value={el}>
                  {el}
                </option>
              ))}
            </select>
            {isAllData.reqData.map((el: any, idx: any) => (
              <div key={idx}>
                <div id={`obj_${idx}`}>{el}</div>
                <SelectBoxs
                  currentCategoryValue={currentValue}
                  className={`obj_${idx}`}
                  propFunction={messagePreviewFunc}
                  optionData={
                    (sendKeyData && sendKeyData[0]) || ['빈값입니다.']
                  }
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
                setAutoModal((prev) => !prev);
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
            currentValue={
              currentValue === null ? '택배번호 안내' : currentValue
            }
          />
        ) : null}
      </Wrapper>
    </motion.div>
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
