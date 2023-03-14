import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SelectBoxs from '../components/SelectBoxs'
import { ALAERMTALK_TEMPLATE } from '../constants/alarmtalk'
import AutoModal from '../components/Automodal'
function Alarmtalk() {
  const navigate = useNavigate()
  const sendKeyData = useSelector((state: any) => {
    return state.sendKey.sendKey
  })
  const sendListData = useSelector((state: any) => {
    return state.sendList.sendList
  })
  const sendGroupNameData = useSelector((state: any) => {
    return state.sendGroupName.sendGroupName
  })
  // console.log(ALAERMTALK_TEMPLATE['배송완료 안내'])
  const TemplatesNameDummy = () => {
    let Arr = []
    for (const element in ALAERMTALK_TEMPLATE) {
      Arr.push(element)
    }
    return Arr
  }
  const [isAutoModal, setAutoModal] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState(null)
  // const [isReqLength, setReqLength] = useState<any>(
  //   ALAERMTALK_TEMPLATE['택배번호 안내'].reqData.length
  // )
  const [isAllData, setAllData] = useState<any>(
    ALAERMTALK_TEMPLATE['택배번호 안내']
  )
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.value)
  }
  // onChange setState비동기
  useEffect(() => {
    if (currentValue !== null) {
      //초기값을 지켜주면서 onChange로 바뀔경우에만 setState
      setAllData(ALAERMTALK_TEMPLATE[currentValue])
    }
  }, [currentValue])
  console.log('sendListData : ', sendListData[0].length)
  // ALAERMTALK_TEMPLATES.map((el: any) => el.reqData)
  return (
    <Wrapper>
      <LeftContents>
        <>
          <H1>알림톡 대량발송하기</H1>
          {/* {TemplatesReqDataDummy()} */}
          <select name="" id="" onChange={(e) => handleOnChangeSelectValue(e)}>
            {TemplatesNameDummy().map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))}
          </select>
          {isAllData.reqData.map(
            (el: any, idx: any) => (
              <>
                <div>
                  <div>{el}</div>
                  <SelectBoxs
                    optionData={
                      (sendKeyData && sendKeyData[0]) || ['빈값입니다.']
                    }
                  ></SelectBoxs>
                </div>
              </>
            )
            // .map((el2: any, idx2: any) => (
            //   <SelectBoxs optionData={TemplatesNameDummy()}>{}</SelectBoxs>
            // ))
          )}

          {/* {sendKeyData.map((el: any, idx: number) => {
            return (
              <SelectBoxs optionData={Object.values(el)} key={idx}></SelectBoxs>
            )
          })} */}
        </>
      </LeftContents>
      <RightContents>
        <ContnetDataWrap>{isAllData.text}</ContnetDataWrap>
        <ButtonWrap>
          <Button onClick={() => navigate(-1)}>취소</Button>
          <Button onClick={() => setAutoModal((prev) => !prev)}>다음</Button>
        </ButtonWrap>
      </RightContents>
      {isAutoModal && isAutoModal ? (
        <AutoModal
          closeModal={setAutoModal}
          userNum={sendListData && sendListData[0]?.length}
          groupName={sendGroupNameData && sendGroupNameData[0]}
        />
      ) : null}
    </Wrapper>
  )
}

const H1 = styled.h1`
  font-weight: bold;
  font-size: 25px;
`
const RightContents = styled.div``
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`
const Button = styled.button`
  border-radius: 15px;
  border: 2px solid #000;
  background-color: white;
  color: #000;
  width: 85px;
  padding: 5px 0px;
`
const Wrapper = styled.div`
  padding-left: 200px;
  margin-top: 60px;
  display: flex;
  gap: 30px;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const LeftContents = styled.div`
  width: 200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ContnetDataWrap = styled.div`
  background-color: #ededed;
  border-radius: 15px;
  width: 300px;
  height: 250px;
  padding: 10px;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 2px;
`

export default Alarmtalk
