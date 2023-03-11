import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { dummyData } from '../constants/products'
import { Pagination } from '@mantine/core'
import * as XLSX from 'xlsx'
interface IData {
  id: number
  name: string
}
function SendMessage() {
  const [isData, setData] = useState<any[]>()
  const [isKeyData, setKeyData] = useState<any>()
  const navigate = useNavigate()
  const onSubmit = () => {
    alert('heelo submit')
  }

  useEffect(() => {
    // setData(dummyData)
  }, [])

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
        console.log('SheetName: ' + sheetName)
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
  console.log(isData)
  console.log(isKeyData)
  return (
    <Wrapper>
      <ContentsWrap>
        <TopContents>
          <Input type="text" placeholder="그룹명" />
          <InputFile
            type="file"
            accept=".csv,.xlsx"
            onChange={readExcel}
          ></InputFile>
          {/* <InputFile
            type="file"
            accept=".csv"
            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
              console.log(e.target.files[0])
            }
          /> */}
        </TopContents>
        {/* <div>
            {isKeyData && isKeyData.map((li: any) => <span>{li}/</span>)}
        </div> */}
        {isData && isData ? (
          <table>
            <thead style={{ fontWeight: 'bold' }}>
              <tr>
                {isKeyData &&
                  isKeyData.map((li: any, idx: number) => (
                    <th key={li + idx}>{li}</th>
                  ))}
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {isData &&
                isData.map((el: any, idx: number) => (
                  <tr key={idx}>
                    {isKeyData.map((li: any) => (
                      <td>{el[li]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          // <div>
          //   {isData.map((el: any, idx: number) => (
          //     <div>
          //       {isKeyData.map((li: any) => (
          //         <span>{el[li]}</span>
          //       ))}
          //     </div>
          //   ))}
          // </div>
          //   <Pagination page={activePage} onChange={setPage} total={total} />
          <BottomContents>
            <div>생성된 고객이 없습니다. CSV 파일을 넣어주세요.</div>
          </BottomContents>
        )}
        <BtnWrap>
          <Button onClick={() => navigate('/')}>취소</Button>
          <Button onClick={onSubmit}>저장</Button>
        </BtnWrap>
      </ContentsWrap>
    </Wrapper>
  )
}

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
const ContentsWrap = styled.div``
const TopContents = styled.div`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  height: 100px;
  background-color: #ededed;
  margin: 30px 0px;
`

const BottomContents = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  font-size: 12px;
  width: 100%;
  height: 250px;
  background-color: #ededed;
`
export default SendMessage
