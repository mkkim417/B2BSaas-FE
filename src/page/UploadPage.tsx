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
  const nextRef = useRef<HTMLButtonElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientIdData = useSelector((state: any) => {
    return state.clientsId.clientsId[0];
  });
  const onNextClick = () => {
    nextRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      console.log('fileInput : ', fileInput.current.files[0]);
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

    console.log('reqKeyArr :', reqKeyArr);
    console.log('requiredKeyData :', requiredKeyData);

    if ((refatoringFunc(reqKeyArr, requiredKeyData) as any) !== true) return;

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

    // try {
    //   const response = await axios
    //     .post(
    //       `${process.env.REACT_APP_SERVER_URL}/api/clients/contents/bulk`,
    //       { data },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log('api/clients/bulk : ', res.data);
    //       dispatch(clientsIdCreate(res?.data?.newClients));
    //     });
    //   // navigate('/');
    // } catch (error) {
    //   console.log(error);
    //   // alert('다시 시도해주시기 바랍니다.');
    // }
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
      alert('로그인 실패.');
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
        const response = await axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/api/batch/groups`,
            {
              clientIds: clientIdData,
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
              clientIds: clientIdData,
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
          <TopContents>
            <InputFile
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={readExcel}
              ref={fileInput}
            ></InputFile>
          </TopContents>
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
          <select name="" id="" onChange={(e) => handleOnChangeSelectValue(e)}>
            {isTemplatesList &&
              isTemplatesList.map((el: any) => (
                <option key={el.talkTemplateId}>{el.talkTemplateName}</option>
              ))}
          </select>
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
                <thead style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  <tr>
                    {isOpen && isOpen ? <th>선택</th> : null}
                    {isKeyData &&
                      isKeyData.map((li: any, idx: number) => (
                        <Th key={idx}>{li}</Th>
                      ))}
                  </tr>
                </thead>
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
              <div>생성된 고객이 없습니다. CSV 파일을 넣어주세요.</div>
            </BottomContents>
          )}
          <BtnWrap>
            {isData && !isGroupComp ? (
              !isOpen ? (
                <Button onClick={() => setOpen((prev) => !prev) as any}>
                  선택삭제
                </Button>
              ) : (
                <Button onClick={() => setOpen((prev) => !prev) as any}>
                  선택취소
                </Button>
              )
            ) : null}
            {!isGroupComp ? (
              <Button onClick={() => DummyDeleteFuction()}>취소</Button>
            ) : null}
            {isOpen && isOpen ? <Button onClick={onDelete}>삭제</Button> : null}
            {!isOpen ? (
              !isClUpload ? (
                <Button
                  ref={nextRef}
                  onClick={() => {
                    NextBtnHandler(isData, isKeyData);
                    ClientBulkFetch(isData);
                  }}
                >
                  고객업로드 등록
                </Button>
              ) : null
            ) : null}
          </BtnWrap>
          {/* 그룹지정컨텐츠 */}
          {isGroupComp && isGroupComp ? (
            <BottomWrap>
              <H1>고객 정보 그룹 지정</H1>
              <span>
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
                <Button onClick={() => DummyDeleteFuction()}>취소</Button>

                <Button
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

const Th = styled.th`
  vertical-align: middle;
`;
const BottomWrap = styled.div`
  width: 800px;
  margin: 0 auto;
  height: 100vh;
`;
const TemplateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const TemplateDown = styled.div`
  text-align: center;
  border: 1px solid #000;
  padding: 15px;
`;
const Table = styled.table`
  width: 100%;
  border: 1px solid #333333;
`;
const MapWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Td = styled.td`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #333333;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin: 50px auto;
`;
const Button = styled.button`
  border-radius: 15px;
  background-color: #000;
  color: #fff;
  width: 85px;
  padding: 5px;
`;
const InputFile = styled.input`
  border: 1px solid #000;
  background-color: #fff;
  width: 300px;
`;
const Input = styled.input`
  width: 200px;
  border-radius: 8px;
  padding: 5px 10px;
  height: 40px;
`;
const Wrapper = styled.div`
  padding-left: 250px;
  display: flex;
  gap: 30px;
  justify-content: center;
`;
const ContentsWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const TopContents = styled.div`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
  border-radius: 15px;
  height: 100px;
  background-color: #ededed;
  margin: 30px auto;
`;

const BottomContents = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  font-size: 12px;
  width: 800px;
  margin: 0 auto;
  height: 250px;
  background-color: #ededed;
`;
export default UploadPage;
