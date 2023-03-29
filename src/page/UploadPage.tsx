import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '@mantine/core';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { sendListCreate } from '../redux/modules/sendList';
import { sendKeyCreate } from '../redux/modules/sendKey';
import { sendGroupNameCreate } from '../redux/modules/sendGroupName';
import { clientsIdCreate } from '../redux/modules/clientsId';
import { motion } from 'framer-motion';
import axios from 'axios';
import ClientHeader from '../components/ClientHeader';
import { H1 } from './KakaoResultList';
import SelectBoxs from '../components/SelectBoxs';

function UploadPage() {
  const [isData, setData] = useState<any>();
  const [isKeyData, setKeyData] = useState<any>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [groupList, setGroupList] = useState([] as any);
  const fileInput = useRef<any>();
  const [isGroupName, setGroupName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log({ e });
  };
  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    readExcel(e);
  };

  const NextBtnHandler = useCallback(
    async (data: any, isKeyDataServe: any) => {
      console.log('fileInput : ', fileInput.current.files[0]);
      // if (isGroupName === '') {
      //   alert('그룹명을 입력해주세요');
      //   return;
      // }
      if (fileInput.current.files[0] === undefined) {
        alert('파일을 선택해주세요');
      }
      // await mutation.mutateAsync(newCart)

      dispatch(sendListCreate(data));
      dispatch(sendKeyCreate(isKeyDataServe));
      dispatch(sendGroupNameCreate([isGroupName]));
      navigate(`/groupmanageList`);
    },
    // [mutation]
    [isGroupName, dispatch]
  );
  //파일초기화함수
  const onClearAttachment = () => {
    fileInput.current.value = '';
  };
  //그룹이름 체인지함수
  const groupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
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
    setGroupName('');
    setOpen(false);
    setKeyData('');
    setCheckedList([]);
  };
  const refatoringFunc = (keyData: string[], name: string) => {
    if (keyData.includes(`${name}`) === false) {
      DummyDeleteFuction();
      alert(`${name} 값은 필수입니다.`);
      return false;
    }
  };
  // const refatoringFunc = (keyData: string[], name: string[]) => {
  //   name.map((el) => {
  //     if (keyData.includes(`${el}`) === false) {
  //       DummyDeleteFuction();
  //       alert(`${el} 값은 필수입니다.`);
  //       return false;
  //     }
  //   });
  // };
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
        // if ((refatoringFunc(keyData, requiredData) as any) !== true) {
        //   return;
        // } else {
        // }
        if (refatoringFunc(keyData, '이름') === false) return;
        if (refatoringFunc(keyData, '전화번호') === false) return;
        if (refatoringFunc(keyData, '이메일') === false) return;

        // console.log('rows : ', rows);
        // console.log('jsonData : ', jsonData);
        // console.log('pareData : ', pareData);
        // console.log('keyData : ', keyData);
        setKeyData(keyData);
        setData(pareData);
        console.log('keyData : ', keyData);
        console.log('pareData : ', pareData);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  }
  const ClentBulkFetch = async () => {
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
        .post(`https://dev.sendingo-be.store/api/clients/bulk`, { data })
        .then((res) => {
          console.log('api/clients/bulk : ', res.data);
          dispatch(clientsIdCreate(res?.data?.newClients));
        });
      console.log(response);
      // navigate('/');
    } catch (error) {
      console.log(error);
      // alert('다시 시도해주시기 바랍니다.');
    }
  };
  const getGroupData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/groups`
    );
    console.log('GroupList API', response.data.data);
    setGroupList(response.data.data);
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ClientHeader />
      <Wrapper>
        <ContentsWrap>
          <TopContents>
            <Input
              type="text"
              placeholder="그룹명"
              value={isGroupName}
              onChange={groupName}
            />
            <InputFile
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={readExcel}
              ref={fileInput}
            ></InputFile>
          </TopContents>
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
          {isData && isData ? (
            <MapWrapper>
              <Table>
                <thead style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  <tr>
                    {isOpen && isOpen ? <th>선택</th> : null}
                    {isKeyData &&
                      isKeyData.map((li: any, idx: number) => (
                        <th key={idx}>{li}</th>
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
            {!isOpen ? (
              <Button onClick={() => setOpen((prev) => !prev) as any}>
                선택삭제
              </Button>
            ) : null}
            <Button
              onClick={() => [
                onClearAttachment(),
                setData(false),
                setGroupName(''),
                setOpen(false),
                setKeyData(''),
                setCheckedList([]),
              ]}
            >
              취소
            </Button>
            {isOpen && isOpen ? <Button onClick={onDelete}>삭제</Button> : null}
            {!isOpen ? (
              <Button
                onClick={() => {
                  NextBtnHandler(isData, isKeyData);
                  ClentBulkFetch();
                }}
              >
                등록
              </Button>
            ) : null}
          </BtnWrap>
          <H1>고객 정보 그룹 지정</H1>
          {/* {groupList && groupList.map((el: any, idx: any) => (
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
            ))} */}
        </ContentsWrap>
      </Wrapper>
    </motion.div>
  );
}

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
  width: 100%;
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
  margin-top: 25px;
`;
const Button = styled.button`
  border-radius: 15px;
  border: 2px solid #000;
  background-color: white;
  color: #000;
  width: 85px;
  padding: 5px 0px;
`;
const InputFile = styled.input`
  border: 1px solid #000;
  background-color: #fff;
  width: 300px;
`;
const Input = styled.input`
  width: 300px;
  border-radius: 15px;
  padding: 5px 10px;
  height: 30px;
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
  width: 400px;
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
  width: 600px;
  margin: 0 auto;
  height: 250px;
  background-color: #ededed;
`;
export default UploadPage;
