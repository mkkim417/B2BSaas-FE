import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '@mantine/core';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { sendListCreate } from '../redux/modules/sendList';
import { sendKeyCreate } from '../redux/modules/sendKey';
import { sendGroupNameCreate } from '../redux/modules/sendGroupName';
import { clientsIdCreate } from '../redux/modules/clientsId';
import { motion } from 'framer-motion';
import axios from 'axios';
import ClientHeader from '../components/ClientHeader';
import { H1 } from './KakaoResultList';
import SelectBoxs from '../components/SelectBoxs';
import useInput from '../hook/useInput';
import { postLogin } from '../axios/api';
import { useMutation } from 'react-query';
import { getCookie } from '../util/cookie';
// import { clentBulkFetch } from '../axios/groupSave';
function UploadPage() {
  const token = getCookie('userToken');
  const [isData, setData] = useState<any>();
  const [isKeyData, setKeyData] = useState<any>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isGroupComp, setGroupComp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGroupList, setGroupList] = useState([] as any);
  const fileInput = useRef<any>();
  const [currentValue, setCurrentValue] = useState(null);
  const [isNewGroupInput, setNewGroupInput] = useState(false);
  const [groupName, onChangeGroupName] = useInput();
  const [descName, onChangeDescName] = useInput();
  const [isClUpload, setClUpload] = useState(false);
  const [isTmpId, setTmpId] = useState<string>();
  const [isGroupIdObj, setGroupIdObj] = useState('');
  const [isTemplatesList, setTemplatesList] = useState<any>([]);
  const [isReqData, setReqData] = useState([]);
  const [isClientId, setClientId] = useState([]);

  const nextRef = useRef<HTMLButtonElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientIdData = useSelector((state: any) => {
    return state.clientsId.clientsId[0];
  });
  const onNextClick = () => {
    nextRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value);
  };
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    readExcel(e);
  };
  //다음단계버튼
  const NextBtnHandler = useCallback(
    async (data: any, isKeyDataServe: any) => {
      if (fileInput.current.files[0] === undefined) {
        alert('파일을 선택해주세요');
        return;
      }
      dispatch(sendListCreate(data));
      dispatch(sendKeyCreate(isKeyDataServe));
      setGroupComp(true);
      setTimeout(() => {
        onNextClick();
        setClUpload((prev) => !prev);
      }, 1000);
    },
    // [mutation]
    [dispatch]
  );

  //파일초기화함수
  const onClearAttachment = () => {
    fileInput.current.value = '';
  };
  //선택취소함수
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };
  //체크박스저장함수
  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };
  //저장함수
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // console.log('checkedList:', checkedList)
      // isData && isData.filter((x: any) => !checkedList.includes(x))
      setData(isData.filter((x: any) => !checkedList.includes(x)));
      setOpen(false);
    },
    [checkedList]
  );
  //초기화더미함수
  const DummyDeleteFuction = () => {
    onClearAttachment();
    setData(false);
    setOpen(false);
    setKeyData('');
    setCheckedList([]);
    setGroupComp(false);
    setClUpload(false);
  };
  //엑셀 필수값 필터링함수
  const refatoringFunc = (keyData: string[], name: string[]) => {
    console.log(keyData, name);
    for (let i = 0; i < name.length; i++) {
      if (keyData.includes(name[i]) === false) {
        DummyDeleteFuction();
        alert(`${name[i]}값은 필수입니다.`);
        return false;
      }
    }
    return true;
  };
  //csv저장함수
  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');
    const array = csvRows.map((i: any) => {
      const values = i.split(',');
      console.log(values);
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setData(array);
    setKeyData(Object.keys(Object.assign({}, ...array)));
  };
  //xlsx저장함수
  function readExcel(event: any) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = async function () {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      console.log(data);
      console.log(workBook);
      if (workBook.bookType !== 'xlsx') {
        // csv
        let file = event.target.files[0];
        if (file) {
          reader.onload = function (event: any) {
            const text = event.target.result;
            console.log(text);
            csvFileToArray(text);
          };

          reader.readAsText(file);
        }
        return;
      }
      workBook.SheetNames.forEach(function (sheetName) {
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        const jsonData = JSON.stringify(rows);
        const pareData = JSON.parse(jsonData);
        const keyData = Object.keys(pareData[0]);
        let requiredData = ['이름', '전화번호', '이메일'];
        if ((refatoringFunc(keyData, requiredData) as any) !== true) return;
        setKeyData(keyData);
        setData(pareData);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  }
  //템플릿전체조회fn
  const fetchTemplateList = useCallback(async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/talk/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setTemplatesList(res.data.data);
          setTmpId(res.data.data[0].talkTemplateId);
          setReqData(JSON.parse(res.data.data[0].reqData));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //클라이언트 대량등록fn
  const clentBulkFetch = async () => {
    console.log(isReqData); //키값 ['#{회사명}', '#{주문번호}', '#{구/면}', '#{동/리}', '#{월일}', '#{결제금액}']

    console.log(isData); // 결제금액: 33000,구/면: "처인구"동/리: "왕곡동"배송예정일: "2일뒤"송장번호: 2901248912이름: "김영현"이메일: "djdjdjk2006@naver.com"전화번호: "01041096590"주문번호: 912399택배배송시간: 0.5416666666666666택배회사명: "CJ택배"회사명: "센딩고"

    //1.key: isReqData , value : isData.결제금액 ?  : undefined
    //2.검증처리 엑셀에 키값이 없으면 return;

    // //console.log(matchData['구/면']);

    // //key matchData 치환

    // console.log('reqKeyArr : ', reqKeyArr);
    //customerName","deliveryCompany","deliveryTime","deliveryNumber"

    // const transArray = csvRows.map((i: any) => {
    //   const values = i.split(',');
    //   console.log(values);
    //   const obj = reqKeyArr.reduce((object: any, header: any, index: any) => {
    //     object[header] = values[index];
    //     return object;
    //   }, {});
    //   return obj;
    // });
    // console.log("transArray : ",transArray)
    const matchData = {
      '#{회사명}': '회사명',
      '#{고객명}': '고객명',
      '#{주문번호}': '주문번호',
      '#{구/면}': '구/면',
      '#{동/리}': '동/리',
      '#{월일}': '월일',
      '#{결제금액}': '결제금액',
      '#{택배회사명}': '택배회사명',
      '#{택배배송시간}': '택배배송시간',
      '#{송장번호}': '송장번호',
    };
    let reqKeyArr = [] as string[];
    for (let key of isReqData) {
      reqKeyArr.push(matchData[key]);
    }
    let requiredKeyData = Object.keys(Object.assign({}, ...isData));

    console.log('isReqData :', isReqData);
    console.log('필수값 :', reqKeyArr);
    console.log('존재하는값 :', requiredKeyData);

    if ((refatoringFunc(requiredKeyData, reqKeyArr) as any) !== true) return;

    let data = [] as any;
    //템플릿 필요한데이터를 [reqData] 키값으로 두고
    isData.map((el: any) =>
      data.push({
        talkTemplateId: isTmpId,
        clientName: `${el.이름}`,
        contact: `${el.전화번호.replace(/-/gi, '')}`,
        clientEmail: `${el.이메일}`,

        organizationName: el.회사명 ? `${el.회사명}` : null,
        customerName: el.고객명 ? `${el.고객명}` : null,
        orderNumber: el.주문번호 ? `${el.주문번호}` : null,
        region: el['구/면'] ? `${el['구/면']}` : null,
        regionDetail: el['동/리'] ? `${el['동/리']}` : null,
        deliveryDate: el.월일 ? `${el.월일}` : null,
        paymentPrice: el.결제금액 ? `${el.결제금액}` : null,
        deliveryCompany: el.택배회사명 ? `${el.택배회사명}` : null,
        deliveryTime: el.택배배송시간 ? `${el.택배배송시간}` : null,
        deliveryNumber: el.송장번호 ? `${el.송장번호}` : null,
      })
    );
    console.log(data);
    console.log(isOpen);
    console.log(isClUpload);
    try {
      const response = await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/clients/contents/bulk`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log('api/clients/bulk : ', res.data.clientIds);
          dispatch(clientsIdCreate(res?.data?.clientIds));
          NextBtnHandler(isData, isKeyData);
          console.log(res.data.clientIds);
          setClientId(res.data.clientIds);
        });
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  //그룹리스트
  const getGroupData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/groups`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGroupList(response.data.data);
  }, []);

  //그룹저장
  const mutation = useMutation(clentBulkFetch, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.error(error);
      alert('파일을 선택해주세요.');
    },
  });
  const ClientBulkFetch = useCallback(
    async (isData: any) => {
      await mutation.mutateAsync(isData);
    },
    [mutation]
  );
  // const excelDataKakaoSend = async () => {
  //   //카카오전송내용저장api
  //   const data = [
  //     {
  //       //       groupId: 1, (*),
  //       // clientId: 2, (*)
  //       // organizationName: “회사명”,
  //       // orderNumber: “10230192393”,
  //       // region: “지역구 또는 면”,
  //       // regionDetail: “동 또는 리”,
  //       // deliveryDate: “배송월일”,
  //       // paymentPrice: 100000,
  //       // deliveryCompany: “택배회사명”,
  //       // deliveryTime: “택배배송시간”,
  //       // deliveryNumber: “송장번호”,
  //       // templateCode: “TM_2216” (템플릿 Id로 바뀔 수도)
  //     },
  //   ];
  //   try {
  //     const response = await axios
  //       .post(
  //         `${process.env.REACT_APP_SERVER_URL}/api/talk/contents`,
  //         {
  //           data,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const groupSaveFetch = async (groupId: string) => {
    // if (descName === '') {
    //   alert('그룹설명을 해주세요');
    //   return;
    // }
    try {
      if (isNewGroupInput) {
        //신규그룹
        console.log('isClientId : ', isClientId);
        const response = await axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/api/batch/groups`,
            {
              clientIds: isClientId,
              groupName,
              groupDescription: descName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      } else {
        //기존그룹
        const response = await axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/api/batch/groups/${groupId}`,
            {
              clientIds: isClientId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
      alert('그룹저장완료');
      navigate('/groupmanageList');
    } catch (error) {
      console.log(error);
    }
  };
  //selectBox 소통함수
  const messagePreviewFunc = useCallback(
    (text: string, target: string, isGroupId: any) => {
      setGroupIdObj(isGroupId);
      if (text === '+ 새로운그룹추가') {
        setNewGroupInput(true);
        setTimeout(() => {
          InputRef.current?.focus();
        }, 500);
      } else {
        setNewGroupInput(false);
      }
      return;
    },
    []
  );
  useEffect(() => {
    getGroupData();
    fetchTemplateList();
  }, [getGroupData]);

  useEffect(() => {
    if (currentValue !== null) {
      const data = isTemplatesList.filter(
        (el: any) => el.talkTemplateName === currentValue
      );
      setTmpId(data[0].talkTemplateId);
      setReqData(JSON.parse(data[0].reqData));
    }
  }, [currentValue]);
  // console.log('csv넣은대상', isData)
  // console.log('취소된대상:', checkedList)
  // console.log(
  //   '차집합 :',
  //   isData && isData.filter((x: any) => !checkedList.includes(x))
  // )
  console.log('nextRef : ', nextRef);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ClientHeader />
      <Wrapper>
        <ContentsWrap>
          {/* 상단 파일선택 */}
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <TopContents></TopContents>
            {/* 템플릿다운로드 */}
            <TemplateWrap>
              <TemplateDown>
                <a href={'/oneTest.xlsx'} download>
                  템플릿다운로드
                </a>
              </TemplateDown>
              <span>
                템플릿 파일에 추가할 고객 목록을 작성하여 업로드 해주세요.
              </span>
            </TemplateWrap>
            {/* 드롭다운 */}
            <TemplateWrap>
              <select
                name=""
                id=""
                onChange={(e) => handleOnChangeSelectValue(e)}
              >
                {isTemplatesList &&
                  isTemplatesList.map((el: any) => (
                    <option key={el.talkTemplateId}>
                      {el.talkTemplateName}
                    </option>
                  ))}
              </select>
            </TemplateWrap>
            <DecoText>파일등록</DecoText>
            {/* {isReqData &&
            isReqData.map((el: any, idx: any) => (
              <div key={idx}>
                <div id={`obj_${idx}`}>{el}</div>
                <SelectBoxs
                  // currentCategoryValue={currentValue}
                  // className={`obj_${idx}`}
                  // propFunction={messagePreviewFunc}
                  optionData={
                    (sendKeyData && sendKeyData[0]) || ['빈값입니다.']
                  }
                ></SelectBoxs>
              </div>
            ))} */}
            {/* 테이블 */}
            {isData && isData ? (
              <MapWrapper>
                <Table>
                  <Thead>
                    <tr>
                      {isOpen && isOpen ? <th>선택</th> : null}
                      {isKeyData &&
                        isKeyData.map((li: any, idx: number) => (
                          <Th key={idx}>{li}</Th>
                        ))}
                    </tr>
                  </Thead>
                  <tbody style={{ textAlign: 'center' }}>
                    {isData &&
                      isData.map((el: any, idx: number) => (
                        <tr key={idx}>
                          {isOpen && isOpen ? (
                            <Td>
                              <input
                                type="checkbox"
                                key={idx}
                                checked={checkedList.includes(el)}
                                onChange={(e) => checkHandler(e, el)}
                              />
                            </Td>
                          ) : null}
                          {isKeyData &&
                            isKeyData.map((li: any, idx: number) =>
                              li === '전화번호' && el[li].includes('-') ? (
                                <Td>{el[li].replace(/-/gi, '')}</Td>
                              ) : (
                                <Td key={idx}>{el[li]}</Td>
                              )
                            )}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </MapWrapper>
            ) : (
              //   <Pagination page={activePage} onChange={setPage} total={total} />
              <BottomContents onDrop={onDropFiles} onDragOver={dragOver}>
                <TextAria>
                  <div>신규추가할 고객목록을 작성한</div>
                  <div>양식 파일을 업로드해주세요</div>
                </TextAria>
                <label htmlFor="fileData">
                  <LabelWrap>파일찾기</LabelWrap>
                </label>
              </BottomContents>
            )}
            <div style={{ margin: '10px 20px', textAlign: 'right' }}>
              <InputFile
                type="file"
                id="fileData"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={readExcel}
                ref={fileInput}
              ></InputFile>
            </div>
            <BtnWrap>
              {isData && !isGroupComp ? (
                !isOpen ? (
                  <Button
                    width={'150px'}
                    onClick={() => setOpen((prev) => !prev) as any}
                  >
                    선택삭제
                  </Button>
                ) : (
                  <Button onClick={() => setOpen((prev) => !prev) as any}>
                    선택취소
                  </Button>
                )
              ) : null}
              {isData && !isGroupComp ? (
                <>
                  <Button onClick={() => DummyDeleteFuction()}>취소</Button>
                  <Button
                    onClick={() => {
                      ClientBulkFetch(isData);
                    }}
                    width={'180px'}
                  >
                    고객업로드 등록
                  </Button>
                </>
              ) : null}

              {isOpen && isOpen ? (
                <Button onClick={onDelete}>삭제</Button>
              ) : null}
              {!isOpen ? (
                !isClUpload && !isData ? (
                  <>
                    <DisButton
                      onClick={() => alert('파일을 업로드해주세요')}
                      width={'180px'}
                    >
                      고객업로드 등록
                    </DisButton>
                  </>
                ) : null
              ) : null}
            </BtnWrap>
          </div>
          {/* 그룹지정컨텐츠 */}
          {isGroupComp && isGroupComp ? (
            <BottomWrap ref={nextRef}>
              <H1>고객 정보 그룹 지정</H1>
              <span style={{ margin: '15px 0px 30px' }}>
                그룹 선택을 하지 않으면, 미지정 그룹에 자동으로 들어갑니다.
              </span>
              <SelectBoxs
                placeholder={'---그룹선택---'}
                className={[
                  '0',
                  '1',
                  ...isGroupList.map((el: any) => el.groupId),
                ]}
                currentCategoryValue={currentValue}
                propFunction={messagePreviewFunc}
                optionData={
                  [
                    '---그룹선택---',
                    '+ 새로운그룹추가',
                    ...isGroupList.map((x: any) => x.groupName),
                  ] || '빈값입니다'
                }
              ></SelectBoxs>
              {isNewGroupInput && isNewGroupInput ? (
                <>
                  <div>
                    <Input
                      type="text"
                      name="groupName"
                      value={groupName}
                      onChange={onChangeGroupName}
                      ref={InputRef}
                      placeholder="새로운 그룹명"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="descName"
                      value={descName}
                      onChange={onChangeDescName}
                      placeholder="그룹설명을 추가하세요"
                    />
                  </div>
                </>
              ) : null}
              <BtnWrap>
                <Button
                  width={'90px'}
                  padding={'10px'}
                  onClick={() => DummyDeleteFuction()}
                >
                  취소
                </Button>

                <Button
                  width={'90px'}
                  padding={'10px'}
                  onClick={() => {
                    // mutationGroupSaveQuery(
                    //   mutation && mutation.variables,
                    //   groupName,
                    //   descName
                    // );
                    groupSaveFetch(isGroupIdObj);
                    // excelDataKakaoSend();
                  }}
                >
                  그룹저장
                </Button>
              </BtnWrap>
            </BottomWrap>
          ) : null}
        </ContentsWrap>
      </Wrapper>
    </motion.div>
  );
}

export const Thead = styled.thead`
  > tr > th {
    font-weight: bold;
    border-bottom: 1px solid #bdbdbd;
    border-top: 1px solid #bdbdbd;
    font-size: 16px;
    color: #828282;
    font-family: 'Inter', sans-serif;
    padding: 15px 0px;
  }
`;
const DecoText = styled.div`
  font-weight: bold;
  color: #909090;
  font-size: 16px;
  margin-bottom: 10px;
`;
const LabelWrap = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  cursor: pointer;
  text-align: center;
  margin-top: 30px;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 183, 105);
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const TextAria = styled.div`
  color: #909090;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  line-height: 1.3;
`;
const Th = styled.th`
  vertical-align: middle;
`;
const BottomWrap = styled.div<{ ref: any }>`
  width: 100%;
  display: flex;
  margin: 0px auto;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1300px) {
    width: 1000px;
  }
`;
const TemplateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const TemplateDown = styled.div`
  text-align: center;
  border: 1px solid #000;
  padding: 15px;
`;
const Table = styled.table`
  width: 1000px;
  border-collapse: separate;
  border-spacing: 0px 10px;
`;
export const MapWrapper = styled.div<{ ref?: any }>`
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 20px 30px;
  overflow: auto;
  margin: 10px auto;
  width: 100%;
  @media screen and (min-width: 1300px) {
    width: 1000px;
  }
`;
const Td = styled.td`
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #333333;
  box-sizing: border-box;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-top: 50px;
`;
export const Button = styled.button<{
  width?: string;
  padding?: string;
}>`
  border-radius: 8px;
  color: #14b769;
  width: ${(props) => (props.width ? props.width : '100px')};
  padding: ${(props) => (props.padding ? props.padding : '15px 20px')};
  border: 2px solid #14b769;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  &:hover {
    background-color: #14b769;
    color: white;
    transition: 0.2s;
  }
`;
const DisButton = styled.button<{
  width?: string;
}>`
  border-radius: 8px;
  cursor: not-allowed;
  color: #bdbdbd;
  width: ${(props) => (props.width ? props.width : '100px')};
  padding: 15px 20px;
  background-color: #eee;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
`;
const InputFile = styled.input`
  background-color: #fff;
  width: 150px;
  padding: 5px;
  border-radius: 7px;
`;
const Input = styled.input`
  margin-top: 20px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px 10px;
  height: 45px;
`;
const Wrapper = styled.div`
  padding-left: 280px;
  display: block;
  gap: 30px;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1300px) {
    display: flex;
  }
`;
const ContentsWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 0px auto;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 1300px) {
    width: 1000px;
  }
`;
const TopContents = styled.div``;

const BottomContents = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  font-size: 12px;
  height: 250px;
  background-color: #fbfbfb;
  border: 2px dashed #9f9f9f;
`;
export default UploadPage;
