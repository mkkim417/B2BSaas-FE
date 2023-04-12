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
import {
  ALAERMTALK_TEMPLATE,
  KorToEngTransData,
  engToKorTransData,
} from '../constants/alarmtalk';
import { Wrapper } from './KakaoResultList';
import useInput from '../hook/useInput';
import { extractDomainWithoutTrailingSlash } from '../util/LinkValidate';
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
  const [isButtonTmp, setButtonTmp] = useState<boolean>(false);
  const [isLinkData, onChangeLinkData] = useInput();
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value);
  };

  // 카카오내용 불러오기
  const { mutate } = useMutation(fetchTemplatesList, {
    onSuccess: (res) => {
      const newData = res.data.data
        .map((el: any) => Object.assign(el.client, el.talkContent))
        .map((item: any) => {
          const {
            useLink,
            talkContentId,
            talkTemplateId,
            groupId,
            createdAt,
            ...rest
          } = item;
          return rest;
        });
      setTableData(newData);
      const engKeyData = Object.keys(newData[0]) as any;
      const korKeyData = [] as any;
      for (let el of engKeyData) {
        korKeyData.push(engToKorTransData[el]);
      }
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
          useLink: isLinkData,
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
    console.log(data);
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
      const obj_n = document.getElementById(`${target}`)?.innerHTML;
      setTarget(text);
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
      currentValue === '사용법 안내' ? setButtonTmp(true) : setButtonTmp(false);
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
  }, [fetchTemplateList, mutate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <Container>
          <HeadFont>
            <HeaderContainerRe>알림톡 전송</HeaderContainerRe>
          </HeadFont>
          <ContentContainer>
            <LeftContents>
              <>
                <TempleteDiv>
                  <TemplateSelectBox
                    name=""
                    id=""
                    onChange={(e) => handleOnChangeSelectValue(e)}
                  >
                    {isTemplatesList &&
                      isTemplatesList.map((el: any, idx: number) => (
                        <option key={el.talkTemplateId}>
                          {el.talkTemplateName}
                        </option>
                      ))}
                  </TemplateSelectBox>
                </TempleteDiv>
                <SelectDiv>
                  {isReqData &&
                    isReqData.map((el: any, idx: any) => (
                      <div key={idx}>
                        <SelectNameBox>
                          <NameContents id={`obj_${idx}`}>{el}</NameContents>
                          <SelectBoxs
                            currentCategoryValue={currentValue}
                            className={`obj_${idx}`}
                            propFunction={messagePreviewFunc}
                            optionData={
                              (isKeyData && isKeyData) || ['빈값입니다.']
                            }
                          ></SelectBoxs>
                        </SelectNameBox>
                      </div>
                    ))}
                  {isButtonTmp && isButtonTmp ? (
                    <ButtonWrap>
                      <BtnLabel>버튼링크</BtnLabel>
                      <LinkInput
                        type="text"
                        placeholder="버튼링크를 입력해주세요."
                        value={extractDomainWithoutTrailingSlash(isLinkData)}
                        onChange={onChangeLinkData}
                      />
                    </ButtonWrap>
                  ) : null}
                </SelectDiv>
              </>
            </LeftContents>
            <RightContents>
              {/* <ContnetDataWrap>
                <KakaoBox>
                  <YellowWrap>
                    {currentValue === null ? '택배번호 안내' : currentValue}
                  </YellowWrap>
                  <WhiteWrap
                    id="view"
                    dangerouslySetInnerHTML={{ __html: isViewData || '' }}
                  ></WhiteWrap>
                </KakaoBox>
              </ContnetDataWrap> */}
              {/* 디자인 */}
              <div style={{ position: 'relative' }}>
                <BoxWrap>
                  <KakaoBoxWrap>
                    {/* <div
                  id="view"
                  dangerouslySetInnerHTML={{ __html: isViewData || '' }}
                ></div> */}
                    <div>
                      <YellowWrap>
                        {currentValue === null ? '택배번호 안내' : currentValue}
                      </YellowWrap>
                      <WhiteWrapTalk
                        id="view"
                        dangerouslySetInnerHTML={{ __html: isViewData || '' }}
                      ></WhiteWrapTalk>
                      {/* <WhiteWrapTalk>
                        카카오미리보기 Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quaerat assumenda distinctio modi
                      </WhiteWrapTalk> */}
                    </div>
                  </KakaoBoxWrap>
                </BoxWrap>
              </div>
            </RightContents>
          </ContentContainer>
          <ButtonWrap>
            <GroupButton onClick={() => navigate(-1)}>취소</GroupButton>
            <GroupButton
              onClick={() => {
                kakaoSaveFetch();
              }}
            >
              전송
            </GroupButton>
          </ButtonWrap>
        </Container>
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
const BtnLabel = styled.div`
  width: 150px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  color: rgb(68, 67, 67);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const LinkInput = styled.input`
  position: relative;
  height: 45px;
  width: 200px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(66, 66, 66);
  padding: 9px 20px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-self: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  border: 1px solid rgb(221, 221, 221);
  cursor: pointer;
`;
const HeaderContainerRe = styled(HeaderContainer)`
  margin-top: 0px;
`;
const WhiteWrapTalk = styled(WhiteWrap)`
  height: auto;
  white-space: pre-line;
  overflow-wrap: break-word;
`;
const KakaoBoxWrap = styled(KakaoBox)`
  top: 18px;
  width: 239px;
  position: absolute;
  left: 72px;
  height: 505px;
  z-index: -1;
  border-radius: 49px;
  padding-top: 54px;
  filter: drop-shadow(black 4px 6px 6px);
`;
const BoxWrap = styled.div`
  background-image: url('/iPhone12.png');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 400px;
  height: 581px;
`;
export const H1 = styled.h1`
  font-weight: bold;
  font-size: 25px;
`;
export const RightContents = styled.div``;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeadFont = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 80px;
  /* padding-left: 280px; */
  /* margin-right: 280px; */
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  /* background-color: sandybrown; */
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 30px; */
  /* background-color: black; */
`;

const Button = styled.button`
  border-radius: 15px;
  border: 1px solid #bdbdbd;
  background-color: white;
  color: #000;
  width: 85px;
  padding: 5px 0px;
`;
export const LeftContents = styled.div`
  width: auto;
  flex-direction: column;
  justify-content: center;
  display: flex;
`;
const NameContents = styled.div`
  width: 150px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  color: #444343;
  display: flex;
  align-items: center;
  /* background-color: #edaf78; */
`;
const TemplateSelectBox = styled.select`
  width: 100%;
  height: 40px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #c8c5c5;
`;
const TempleteDiv = styled.div`
  margin-bottom: 20px;
  /* background-color: beige; */
`;
const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;
const SelectNameBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const GroupButton = styled.button`
  width: 110px;
  height: 40px;
  color: #000;
  margin-right: 5px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: 'TheJamsil5Bold';
  border: 1px solid #bdbdbd;
  transition: 0.2s;
  :hover {
    background-color: #14b769;
    color: #fff;
  }
`;
const ContnetDataWrap = styled.div`
  border-radius: 15px;
  width: 350px;
  height: 550px;
  padding: 10px;
  font-size: 13px;
  line-height: 1.2;
  border-radius: 50px;
  border: 5px solid #efefef;
  letter-spacing: 2px;
  /* background-color: blueviolet; */
`;
const ButtonBox = styled.button`
  width: 150px;
  font-size: 18px;
  font-weight: 600;
  color: #555555;
  border: 1px solid #e6f8f0;
  border-radius: 10px;
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
  :hover {
    background-color: #e6f8f0;
    color: #14b869;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  background-color: #14b869;
`;

export default Alarmtalk;
