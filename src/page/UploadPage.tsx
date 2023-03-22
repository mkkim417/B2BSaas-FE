import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '@mantine/core';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { sendListCreate } from '../redux/modules/sendList';
import { sendKeyCreate } from '../redux/modules/sendKey';
import { sendGroupNameCreate } from '../redux/modules/sendGroupName';
import { motion } from 'framer-motion';
import axios from 'axios';
import ClientHeader from '../components/ClientHeader';
interface IData {
  id: number;
  name: string;
}
function UploadPage() {
  const [isData, setData] = useState<any>();
  const [isKeyData, setKeyData] = useState<any>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const fileInput = useRef<any>();
  const [isGroupName, setGroupName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const mutation = useMutation(addTodos)
  const NextBtnHandler = useCallback(
    async (data: any, isKeyDataServe: any) => {
      console.log('fileInput : ', fileInput.current.files[0]);
      if (isGroupName === '') {
        alert('그룹명을 입력해주세요');
        return;
      }
      if (fileInput.current.files[0] === undefined) {
        alert('파일을 선택해주세요');
      }
      // await mutation.mutateAsync(newCart)

      dispatch(sendListCreate(data));
      dispatch(sendKeyCreate(isKeyDataServe));
      dispatch(sendGroupNameCreate([isGroupName]));
      navigate(`/splitservicepage`);
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
  //엑셀읽는함수
  function readExcel(event: any) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      if (workBook.bookType !== 'xlsx' && workBook.bookType !== 'csv') {
        alert('csv, xlsx형식을 넣어주세요.');
        return;
      }
      workBook.SheetNames.forEach(function (sheetName) {
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        const jsonData = JSON.stringify(rows);
        const pareData = JSON.parse(jsonData);
        const keyData = Object.keys(pareData[0]);
        if (refatoringFunc(keyData, '이름') === false) return;
        if (refatoringFunc(keyData, '전화번호') === false) return;
        if (refatoringFunc(keyData, '이메일') === false) return;
        // console.log('rows : ', rows);
        // console.log('jsonData : ', jsonData);
        // console.log('pareData : ', pareData);
        // console.log('keyData : ', keyData);
        setKeyData(keyData);
        setData(pareData);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  }
  const ClentBulkFetch = async () => {
    let totalData = [] as any;
    isData.map((el: any) =>
      totalData.push({
        clientName: `${el.이름}`,
        contact: `${el.전화번호.replace(/-/gi, '')}`,
        clientEmail: `${el.이메일}`,
      })
    );
    console.log(totalData);
    try {
      const response = await axios
        .post(`https://dev.sendingo-be.store/api/clients/bulk`, totalData)
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
              accept=".csv,.xlsx"
              onChange={readExcel}
              ref={fileInput}
            ></InputFile>
          </TopContents>
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
                        {isKeyData.map((li: any, idx: number) =>
                          el[li].includes('-') && li === '전화번호' ? (
                            el[li].replace(/-/gi, '')
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
            <BottomContents>
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
                  // NextBtnHandler(isData, isKeyData);
                  ClentBulkFetch();
                }}
              >
                다음
              </Button>
            ) : null}
          </BtnWrap>
        </ContentsWrap>
      </Wrapper>
    </motion.div>
  );
}

const Table = styled.table`
  width: 800px;
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
  padding-left: 200px;
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
