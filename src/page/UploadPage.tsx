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
import Dropdown from '../asset/svg/Dropdown';
// import { clentBulkFetch } from '../axios/groupSave';
interface MyParsingOptions extends XLSX.ParsingOptions {
  encoding?: string;
}
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
  const [isGroupIdObj, setGroupIdObj] = useState('');
  // const [isTemplatesList, setTemplatesList] = useState<any>([]);
  const [isReqData, setReqData] = useState([]);
  const [isClientId, setClientId] = useState([]);
  const [isExcelName, setExcelName] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //다음단계버튼1
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
  //다음단계버튼2
  const NextBtnHandler = useCallback(
    async (data: any, isKeyDataServe: any) => {
      if (!isData) {
        console.log(isData);
        alert('파일을 선택해주세요');
        return;
      }
      setGroupComp(true);
      setTimeout(() => {
        onNextClick();
        setClUpload((prev) => !prev);
      }, 1000);
    },
    // [mutation]
    [isData]
  );

  //파일초기화
  const onClearAttachment = () => {
    fileInput.current.value = '';
  };
  //선택취소
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
  //체크박스저장
  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };
  //저장
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
  //초기화더미
  const DummyDeleteFuction = () => {
    onClearAttachment();
    setExcelName('');
    setData(false);
    setOpen(false);
    setKeyData('');
    setCheckedList([]);
    setGroupComp(false);
    setClUpload(false);
  };
  //엑셀 필수값 필터링
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
  //csv저장
  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');
    const array = csvRows.map((i: any) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setData(array);
    setKeyData(Object.keys(Object.assign({}, ...array)));
  };
  //xlsx저장

  function readExcel(event: any) {
    let input = event.target;
    setExcelName(input.value);
    let reader = new FileReader();
    reader.onload = async function () {
      let data = reader.result;
      let workBook: XLSX.WorkBook = XLSX.read(data, {
        type: 'binary',
        cellDates: true,
        cellStyles: true,
        encoding: 'utf-8',
      } as MyParsingOptions);
      if (workBook.Workbook) {
        // 'xlsx' 또는 'xlsm'과 같은 값을 반환합니다.
        // xlsx
        workBook.SheetNames.forEach(function (sheetName: any) {
          let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
          const jsonData = JSON.stringify(rows);
          const pareData = JSON.parse(jsonData);
          const keyData = Object.keys(pareData[0]);
          let requiredData = ['이름', '전화번호', '이메일'];
          if ((refatoringFunc(keyData, requiredData) as any) !== true) return;
          setKeyData(keyData);
          setData(pareData);
        });
      } else {
        // csv
        let file = event.target.files[0];
        if (file) {
          reader.onload = function (event: any) {
            const text = event.target.result;
            csvFileToArray(text);
          };

          reader.readAsText(file);
        }
      }
    };
    reader.readAsBinaryString(input.files[0]);
  }

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
          // setTemplatesList(res.data.data);
          setReqData(JSON.parse(res.data.data[0].reqData));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //클라이언트 대량등록
  const clentBulkFetch = async () => {
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

    if ((refatoringFunc(requiredKeyData, reqKeyArr) as any) !== true) return;

    let data = [] as any;
    //템플릿 필요한데이터를 [reqData] 키값으로 두고
    isData.map((el: any) =>
      data.push({
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
    try {
      await axios
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
          dispatch(clientsIdCreate(res?.data?.clientIds));
          NextBtnHandler(isData, isKeyData);
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
    onSuccess: (response) => {},
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

  const groupSaveFetch = async (groupId: string) => {
    try {
      if (isNewGroupInput) {
        //신규그룹
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
          .then((res) => {});
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
          .then((res) => {});
      }

      alert('그룹저장완료');
      navigate('/groupmanageList');
    } catch (error) {
      console.log(error);
    }
  };
  //selectBox 소통
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
  const handleDrop = (event: any) => {
    const { items } = event.dataTransfer;
    setIsDragging(false);
    console.log(event.target);
    console.log(items);
    event.preventDefault();
    if (items && items.length > 0) {
      const file = items[0].getAsFile();

      let input = event.target;
      console.log(file);

      setExcelName(input.value);
      let reader = new FileReader();
      reader.onload = async function () {
        let data = reader.result;
        let workBook: XLSX.WorkBook = XLSX.read(data, {
          type: 'binary',
          cellDates: true,
          cellStyles: true,
          encoding: 'utf-8',
        } as MyParsingOptions);
        if (workBook.Workbook) {
          // 'xlsx' 또는 'xlsm'과 같은 값을 반환합니다.
          // xlsx
          workBook.SheetNames.forEach(function (sheetName: any) {
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            const jsonData = JSON.stringify(rows);
            const pareData = JSON.parse(jsonData);
            const keyData = Object.keys(pareData[0]);
            let requiredData = ['이름', '전화번호', '이메일'];
            if ((refatoringFunc(keyData, requiredData) as any) !== true) return;
            setKeyData(keyData);
            setData(pareData);
          });
        } else {
          // csv
          let file = event.target.files[0];
          if (file) {
            reader.onload = function (event: any) {
              const text = event.target.result;
              csvFileToArray(text);
            };

            reader.readAsText(file);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  //업로드 마우스 내려놓을때
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  useEffect(() => {
    getGroupData();
    fetchTemplateList();
  }, [getGroupData]);

  // useEffect(() => {
  //   if (currentValue !== null) {
  //     const data = isTemplatesList.filter(
  //       (el: any) => el.talkTemplateName === currentValue
  //     );
  //     setReqData(JSON.parse(data[0].reqData));
  //   }
  // }, [currentValue]);
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
      <Wrapper>
        <Title>고객등록</Title>
        <ClientHeader />
        <ContentsWrap1>
          <SubTitle>고객 정보 등록</SubTitle>
          <SubDiv> 엑셀 템플릿을 다운로드하고, 양식에 맞게 고객 데이터를 작성하여 업로드해주세요.</SubDiv>
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
              {/* <TemplateDown>
                <a href={'/oneTest.xlsx'} download>
                  템플릿다운로드
                </a>
              </TemplateDown> */}
              {/* <span>
                템플릿 파일에 추가할 고객 목록을 작성하여 업로드 해주세요.
              </span> */}
            </TemplateWrap>
            {/* 드롭다운 */}
            <TemplateWrap>
              {/* <select
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
              </select> */}
            </TemplateWrap>
            {/* <DecoText>파일등록</DecoText> */}
            <TemplateDown>
                <a href={'/oneTest.xlsx'} download>
                  템플릿다운로드
                </a>
              </TemplateDown>
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
              <BottomContents
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                isDragging={isDragging}
                onDragLeave={handleDragLeave}
              >
                {!isDragging ? (
                  <>
                    <TextAria>
                      <div>작성한 템플릿을 업로드해주세요.</div>
                    </TextAria>
                    <label htmlFor="fileData">
                      <LabelWrap>파일찾기</LabelWrap>
                    </label>
                  </>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      fontSize: '20px',
                      gap: '10px',
                    }}
                  >
                    <Dropdown />
                    드래그해 넣어주세요.
                  </div>
                )}
              </BottomContents>
            )}
            {/* 파일찾기 */}
            <div
              style={{
                margin: '10px 20px',
                textAlign: 'right',
                fontSize: '13px',
                color: '#909090',
              }}
            >
              <InputFile
                type="file"
                id="fileData"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={readExcel}
                ref={fileInput}
              ></InputFile>
              {isExcelName && isExcelName
                ? `파일명 : ${isExcelName}`
                : '선택된  파일없음'}
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
                      width={'200px'}
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
                    groupSaveFetch(isGroupIdObj);
                  }}
                >
                  그룹저장
                </Button>
              </BtnWrap>
            </BottomWrap>
          ) : null}
        </ContentsWrap1>
      </Wrapper>
    </motion.div>
  );
}

// padding-top: 90px;
//   padding-left: 210px;
//   background: #f2f4f8;
//   padding-right: 30px;
const Title = styled.div`
  color: #002333;
  font-weight: bold;
  font-size: 30px;
  font-weight: 800;
  /* padding-left: 210px; */
  padding-top: 30px;
  padding-left: 30px;
  /* margin-bottom: 30px; */
  /* background-color: red; */
`;

export const Thead = styled.thead`
  > tr > th {
    font-weight: bold;
    border-bottom: 1px solid #bdbdbd;
    background: #16a6a8;
    font-size: 16px;
    color: white;
    font-family: 'TheJamsil5Bold';
    padding: 15px 0px;
    min-width: 94px;
  }
`;
export const DecoText = styled.div`
  font-weight: bold;
  color: #909090;
  font-size: 16px;
  margin-bottom: 10px;
`;
const LabelWrap = styled.div`
  width: 200px;
  height: 60px;
  /* background-color: #fff; */
  display: flex;
  cursor: pointer;
  text-align: center;
  margin-top: 30px;
  color: rgb(255, 255, 255);
  background-color: #179A9C;
  padding: 14px;
  /* border-radius: 8px; */
  font-size: 20px;
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
export const Th = styled.th`
  vertical-align: middle;
`;
export const BottomWrap = styled.div<{ ref?: any }>`
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
  width: 250px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-weight: 800;
  color: #179A9C;
  font-size: 24px;
  margin-bottom: 20px;
  border: 3px solid #179A9C;
  /* padding: 15px; */
`;
const Table = styled.table`
  width: 1000px;
  border-collapse: separate;
  border-spacing: 0px 10px;
`;
export const MapWrapper = styled.div<{ ref?: any }>`
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  padding: 20px 30px;
  overflow: auto;
  margin: 10px auto;
  width: 100%;
  @media screen and (min-width: 1300px) {
    width: 1000px;
  }
`;
export const Td = styled.td`
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

  word-break: keep-all;
  color: #14b769;
  width: ${(props) => (props.width ? props.width : '100px')};
  padding: ${(props) => (props.padding ? props.padding : '15px 20px')};
  border: 1px solid #14b769;
  font-weight: bold;
  font-size: 14px;
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
  /* border-radius: 8px; */
  cursor: not-allowed;
  color: #bdbdbd;
  width: ${(props) => (props.width ? props.width : '100px')};
  padding: 15px 20px;
  background-color: #eee;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
`;
const InputFile = styled.input`
  background-color: #fff;
  width: 150px;
  padding: 5px;
  border-radius: 7px;
  display: none;
`;
const Input = styled.input`
  margin-top: 20px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px 10px;
  height: 45px;
`;
export const Wrapper = styled.div`
  width: 100vw;
  padding-left: 180px;
  display: block;
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  @media screen and (min-width: 1300px) {
    /* display: flex; */
    background-color: #f2f4f8;
  }
`;

export const ContentsWrap1 = styled.div`
  width: 100%;
  display: flex;
  margin: 0px auto;
  padding-left: 100px;
  padding-right: 100px;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  @media screen and (min-width: 1300px) {
    width: 1400px;
  }
`;
export const ContentsWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 0px auto;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 1300px) {
    width: 1000px;
  }
`;
const SubTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  padding-top: 30px;
  color: #002333;
  padding-bottom: 20px;
`
const SubDiv = styled.div`
  font-size: 18px;
  font-weight: 500;
  /* padding-top: 30px; */
  color: #002333;
  padding-bottom: 20px;
`
const TopContents = styled.div``;

const BottomContents = styled.div<{ isDragging?: boolean }>`
  background-color: ${(props) => (props.isDragging ? 'lightskyblue' : '#fff')};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  font-size: 12px;
  height: 250px;
  opacity: ${(props) => (props.isDragging ? 0.3 : null)};
  border: ${(props) =>
    props.isDragging ? '3px bold #000' : '3px dashed #bdbdbd'};
`;
export default UploadPage;
