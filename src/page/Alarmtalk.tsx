import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SelectBoxs from '../components/SelectBoxs';
import { kakaoSendDataCreate } from '../redux/modules/kakaoSendData';
import AutoModal, {
  KakaoBox,
  WhiteWrap,
  YellowWrap,
} from '../components/Automodal';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getCookie } from '../util/cookie';
import { HeaderContainer } from './GroupManageList';
import { useMutation } from 'react-query';
import { fetchTemplatesList } from '../axios/api';
import { KorToEngTransData, engToKorTransData } from '../constants/alarmtalk';
function Alarmtalk() {
  const [isTemplatesList, setTemplatesList] = useState<any>([]);
  const token = getCookie('userToken');
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state.ArrClientsIdsData);
  const params = useParams();

  const sendGroupNameData = useSelector((state: any) => {
    return state.sendGroupName.sendGroupName;
  });
  const [isAutoModal, setAutoModal] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [isTarget, setTarget] = useState<string | undefined>(undefined);
  const [isReqTemplates, setReqTemplates] = useState('');
  const [isReqData, setReqData] = useState([]);

  const [isAllData, setAllData] = useState<any>();
  const [isViewData, setViewData] = useState<string>();
  const [isTableData, setTableData] = useState([]);
  const [isKeyData, setKeyData] = useState([]);
  const [isSendModalData, setSendModalData] = useState({});
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value);
  };

  // 카카오내용 불러오기
  const { mutate } = useMutation(fetchTemplatesList, {
    onSuccess: (res) => {
      console.log(res.data.data);
      setTableData(
        res.data.data.map((el: any) => Object.assign(el.client, el.talkContent))
      );
      const engKeyData = res.data.data.map(
        (el: any) =>
          Object.keys(Object.assign(el.client, el.talkContent)) as any
      )[0];
      const korKeyData = [] as any;
      for (let el of engKeyData) {
        korKeyData.push(engToKorTransData[el]);
      }
      console.log(korKeyData);
      setKeyData(korKeyData);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //템플릿전체조회
  const fetchTemplateList = useCallback(async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/talk/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('템플릿전체조회 : ', res.data.data);
          setTemplatesList(res.data.data);
          setAllData(res.data.data[0]);
          setViewData(res.data.data[0]['text']);
          setReqData(JSON.parse(res.data.data[0].reqData));
          fetchTemplateDetail(res.data.data[0]['talkTemplateId']);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //템플릿상세조회
  const fetchTemplateDetail = useCallback(async (talkTemplateId: number) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/talk/templates/${talkTemplateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log('fetchTemplateDetail : ', res.data.data);
          setReqTemplates(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //알림톡DATA만드는fn
  const refactoringFunc = (TM_CODE: any) => {
    const labelObj = document.getElementsByTagName('label');
    let labelArr = [] as any;
    for (let i = 0; i < labelObj.length; i++) {
      labelArr.push(labelObj[i].innerHTML);
    }
    let data = [] as any;
    if (TM_CODE === 'TM_2223') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          customerName: el[KorToEngTransData[labelArr[0]]],
          organizationName: el[KorToEngTransData[labelArr[1]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    } else if (TM_CODE === 'TM_2222') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          customerName: el[KorToEngTransData[labelArr[0]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    } else if (TM_CODE === 'TM_2220') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          customerName: el[KorToEngTransData[labelArr[0]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    } else if (TM_CODE === 'TM_2217') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          organizationName: el[KorToEngTransData[labelArr[0]]],
          orderNumber: el[KorToEngTransData[labelArr[1]]],
          region: el[KorToEngTransData[labelArr[2]]],
          regionDetail: el[KorToEngTransData[labelArr[3]]],
          deliveryDate: el[KorToEngTransData[labelArr[4]]],
          paymentPrice: el[KorToEngTransData[labelArr[5]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    } else if (TM_CODE === 'TM_2216') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          customerName: el[KorToEngTransData[labelArr[0]]],
          deliveryCompany: el[KorToEngTransData[labelArr[1]]],
          deliveryTime: el[KorToEngTransData[labelArr[2]]],
          deliveryNumber: el[KorToEngTransData[labelArr[3]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    } else if (TM_CODE === 'TM_2048') {
      isTableData?.map((el: any, idx: number) => {
        data.push({
          groupId: Number(params.id),
          clientId: el.clientId,
          organizationName: el[KorToEngTransData[labelArr[0]]],
          orderNumber: el[KorToEngTransData[labelArr[0]]],
          region: el[KorToEngTransData[labelArr[0]]],
          regionDetail: el[KorToEngTransData[labelArr[0]]],
          deliveryDate: el[KorToEngTransData[labelArr[0]]],
          paymentPrice: el[KorToEngTransData[labelArr[0]]],
          talkTemplateId: isAllData.talkTemplateId,
        });
      });
    }
    return data;
  };
  //카카오전송
  const kakaoSaveFetch = async () => {
    let data = refactoringFunc(isAllData.talkTemplateCode);
    console.log('data : ', data);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/talk/contents`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAutoModal((prev) => !prev);
          console.log('setSendModalData : ', res.data.data);
          setSendModalData(res.data.data);
        });
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  const messagePreviewFunc = useCallback(
    (text: string, target: string) => {
      console.log(text, target);
      const obj_n = document.getElementById(`${target}`)?.innerHTML;
      setTarget(text);
      console.log(obj_n);
      const targetData = document.getElementById(`${obj_n}`)?.innerHTML;
      const ChangeData = isTableData[0][KorToEngTransData[text]];
      const sumData =
        document
          .getElementById('view')
          ?.innerHTML.split(`<span id=\"${obj_n}\">${targetData}`)[0] +
        `<span id=\"${obj_n}\">${ChangeData}` +
        document
          .getElementById('view')
          ?.innerHTML.split(`<span id=\"${obj_n}\">${targetData}`)[1];
      setViewData(sumData);
      return;
    },
    [isTableData]
  );
  // onChange setState비동기
  useEffect(() => {
    if (currentValue !== null) {
      const data = isTemplatesList.filter(
        (el: any) => el.talkTemplateName === currentValue
      );
      setAllData(data[0]);
      setViewData(data[0]['text']);
      setReqData(JSON.parse(data[0].reqData));
    }
  }, [currentValue, isTemplatesList]);
  useEffect(() => {
    if (location && location?.state?.ArrClientsIdsData) {
      fetchTemplateList();
      mutate({
        groupId: params?.id,
        clientIds: location?.state.ArrClientsIdsData,
      });
    }
    console.log(isTableData);
  }, [fetchTemplateList, mutate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <LeftContents>
          <>
            <HeaderContainer>알림톡 전송</HeaderContainer>
            <select
              name=""
              id=""
              onChange={(e) => handleOnChangeSelectValue(e)}
            >
              {isTemplatesList &&
                isTemplatesList.map((el: any, idx: number) => (
                  <option key={el.talkTemplateId}>{el.talkTemplateName}</option>
                ))}
            </select>
            {isReqData &&
              isReqData.map((el: any, idx: any) => (
                <div key={idx}>
                  <div id={`obj_${idx}`}>{el}</div>
                  <SelectBoxs
                    currentCategoryValue={currentValue}
                    className={`obj_${idx}`}
                    propFunction={messagePreviewFunc}
                    optionData={(isKeyData && isKeyData) || ['빈값입니다.']}
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
                dangerouslySetInnerHTML={{ __html: isViewData || '' }}
              ></WhiteWrap>
            </KakaoBox>
          </ContnetDataWrap>
          <ButtonWrap>
            <Button onClick={() => navigate(-1)}>취소</Button>
            <Button
              onClick={() => {
                kakaoSaveFetch();
              }}
            >
              전송
            </Button>
          </ButtonWrap>
        </RightContents>
        {isAutoModal && isAutoModal ? (
          <AutoModal
            closeModal={setAutoModal}
            userNum={100}
            groupName={sendGroupNameData && sendGroupNameData[0]}
            isAllData={isViewData}
            isSendModalData={isSendModalData}
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
  padding-left: 250px;
  display: flex;
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
