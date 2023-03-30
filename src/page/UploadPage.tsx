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
import { getGroupData, postLogin } from '../axios/api';
import { useMutation } from 'react-query';
import { getTokens } from '../cookies/cookies';
// import { clentBulkFetch } from '../axios/groupSave';
function UploadPage() {
  const [isData, setData] = useState<any>();
  const [isKeyData, setKeyData] = useState<any>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isGroupComp, setGroupComp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGroupList, setGroupList] = useState([] as any);
  const fileInput = useRef<any>();
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [isNewGroupInput, setNewGroupInput] = useState(false);
  const [groupName, onChangeGroupName] = useInput();
  const [descName, onChangeDescName] = useInput();
  const [isClUpload, setClUpload] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientIdData = useSelector((state: any) => {
    return state.clientsId.clientsId;
  });
  const onNextClick = () => {
    nextRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  // const refatoringFunc = (keyData: string[], name: string) => {
  //   if (keyData.includes(`${name}`) === false) {
  //     DummyDeleteFuction();
  //     alert(`${name} 값은 필수입니다.`);
  //     return false;
  //   }
  // };
  const refatoringFunc = (keyData: string[], name: string[]) => {
    // name.map((el) => {
    //   if (keyData.includes(`${el}`) === false) {
    //     DummyDeleteFuction();
    //     alert(`${el} 값은 필수입니다.`);
    //     return false;
    //   }
    // });
    for (let el of name) {
      if (keyData.includes(`${el}`) === false) {
        DummyDeleteFuction();
        alert(`${el} 값은 필수입니다.`);
        return false;
      }
    }
  };
  const { accessToken, userToken } = getTokens();
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
        if ((refatoringFunc(keyData, requiredData) as any) === false) {
          return;
        }
        setKeyData(keyData);
        setData(pareData);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  }

  //클라이언트 대량등록
  //들어갈값 isData,
  const clentBulkFetch = async () => {
    let data = [] as any;
    isData.map((el: any) =>
      data.push({
        clientName: `${el.이름}`,
        contact: `${el.전화번호.replace(/-/gi, '')}`,
        clientEmail: `${el.이메일}`,
      })
    );
    console.log(data);
    try {
      const response = await axios
        .post(
          `https://dev.sendingo-be.store/api/clients/bulk`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          console.log('api/clients/bulk : ', res.data);
          dispatch(clientsIdCreate(res?.data?.newClients));
        });
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  //그룹리스트

  const getGroupData = useCallback(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/groups`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setGroupList(res.data.data);
      });
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
  //그룹저장
  // const mutationGroupSave = useMutation(groupSaveFetch as any, {
  //   onSuccess: (response) => {
  //     console.log(response);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     alert('로그인 실패.');
  //   },
  // });
  // const mutationGroupSaveQuery = useCallback(
  //   async (isData: any, isData2: any, isData3: any) => {
  //     await mutationGroupSave.mutateAsync({ isData, isData2, isData3 } as any);
  //   },
  //   [mutation]
  // );
  const groupSaveFetch = async () => {
    if (descName === '') {
      alert('그룹설명을 해주세요');
      return;
    }
    try {
      const response = await axios
        .post(
          `https://dev.sendingo-be.store/api/batch/groups`,
          {
            clientIds: clientIdData,
            groupName: isNewGroupInput === true ? groupName : currentValue,
            groupDescription: descName,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          navigate('/groupmanageList');
        });
    } catch (error) {
      console.log(error);
    }
  };
  //selectBox 소통함수
  const messagePreviewFunc = useCallback((text: string, target: string) => {
    setCurrentValue(text);
    if (text === '+ 새로운그룹추가' || text === '---그룹선택---') {
      setNewGroupInput(true);
      setTimeout(() => {
        InputRef.current?.focus();
      }, 500);
    } else {
      setNewGroupInput(false);
    }
    return;
  }, []);
  useEffect(() => {
    getGroupData();
  }, [getGroupData]);
  // console.log('csv넣은대상', isData)
  // console.log('취소된대상:', checkedList)
  // console.log(
  //   '차집합 :',
  //   isData && isData.filter((x: any) => !checkedList.includes(x))
  // )
  console.log(currentValue);
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
                </>
              ) : null}
              <div>
                <Input
                  type="text"
                  name="descName"
                  value={descName}
                  onChange={onChangeDescName}
                  placeholder="그룹설명을 추가하세요"
                />
              </div>
              <BtnWrap>
                <Button onClick={() => DummyDeleteFuction()}>취소</Button>

                <Button
                  onClick={() => {
                    // mutationGroupSaveQuery(
                    //   mutation && mutation.variables,
                    //   groupName,
                    //   descName
                    // );
                    groupSaveFetch();
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
