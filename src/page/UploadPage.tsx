import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '@mantine/core'
import * as XLSX from 'xlsx'
import { useDispatch } from 'react-redux'
import { sendListCreate } from '../redux/modules/sendList'
import { sendKeyCreate } from '../redux/modules/sendKey'
import { sendGroupNameCreate } from '../redux/modules/sendGroupName'
interface IData {
  id: number
  name: string
}
function UploadPage() {
  const [isData, setData] = useState<any>()
  const [isKeyData, setKeyData] = useState<any>()
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [isOpen, setOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const fileInput = useRef<any>()
  const [isGroupName, setGroupName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const mutation = useMutation(addTodos)
  const NextBtnHandler = useCallback(
    async (data: any, isKeyDataServe: any) => {
      if (isGroupName === '') {
        alert('그룹명을 입력해주세요')
        return
      }
      // await mutation.mutateAsync(newCart)

      dispatch(sendListCreate(data))
      dispatch(sendKeyCreate(isKeyDataServe))
      dispatch(sendGroupNameCreate([isGroupName]))
      navigate('/alarmtalk')
    },
    // [mutation]
    [isGroupName, dispatch]
  )
  //파일초기화함수
  const onClearAttachment = () => {
    fileInput.current.value = ''
  }
  //그룹이름 체인지함수
  const groupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }
  //선택취소함수
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value])
      return
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value))
      return
    }
    return
  }
  //체크박스저장함수
  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked)
    checkedItemHandler(value, e.target.checked)
  }
  //저장함수
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      //   console.log('checkedList:', checkedList)
      // isData && isData.filter((x: any) => !checkedList.includes(x))
      setData(isData.filter((x: any) => !checkedList.includes(x)))
      setOpen(false)
    },
    [checkedList]
  )
  //엑셀읽는함수
  function readExcel(event: any) {
    let input = event.target
    let reader = new FileReader()
    reader.onload = function () {
      let data = reader.result
      let workBook = XLSX.read(data, { type: 'binary' })
      if (workBook.bookType !== 'xlsx' && workBook.bookType !== 'csv') {
        alert('csv, xlsx형식을 넣어주세요.')
        return
      }
      workBook.SheetNames.forEach(function (sheetName) {
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
        const jsonData = JSON.stringify(rows)
        const pareData = JSON.parse(jsonData)
        const keyData = Object.keys(pareData[0])
        setKeyData(keyData)
        setData(pareData)
      })
    }
    reader.readAsBinaryString(input.files[0])
  }
  // console.log('csv넣은대상', isData)
  // console.log('취소된대상:', checkedList)
  // console.log(
  //   '차집합 :',
  //   isData && isData.filter((x: any) => !checkedList.includes(x))
  // )
  return (
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
            <table>
              <thead style={{ fontWeight: 'bold', fontSize: '13px' }}>
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
                      {isKeyData.map((li: any, idx: number) => (
                        <Td key={idx}>{el[li]}</Td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
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
            <Button onClick={() => NextBtnHandler(isData, isKeyData)}>
              다음
            </Button>
          ) : null}
        </BtnWrap>
      </ContentsWrap>
    </Wrapper>
  )
}
const MapWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Td = styled.td`
  font-size: 12px;
`
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-top: 25px;
`
const Button = styled.button`
  border-radius: 15px;
  border: 2px solid #000;
  background-color: white;
  color: #000;
  width: 85px;
  padding: 5px 0px;
`
const InputFile = styled.input`
  border: 1px solid #000;
  background-color: #fff;
  width: 300px;
`
const Input = styled.input`
  width: 300px;
  border-radius: 15px;
  padding: 5px 10px;
  height: 30px;
`
const Wrapper = styled.div`
  padding-left: 200px;
  margin-top: 60px;
  display: flex;
  gap: 30px;
  justify-content: center;
`
const ContentsWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`
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
`

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
`
export default UploadPage
