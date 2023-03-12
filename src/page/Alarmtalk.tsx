import React from 'react'
import styled from 'styled-components'
import SelectBoxs from '../components/SelectBoxs'
import { ALAERMTALK_TEMPLATES } from '../constants/alarmtalk'

function Alarmtalk() {
  console.log(ALAERMTALK_TEMPLATES)
  return (
    <Wrapper>
      <LeftContents>
        <>
          {ALAERMTALK_TEMPLATES.map((el: any, idx) => {
            return (
              <SelectBoxs optionData={Object.values(el)} key={idx}></SelectBoxs>
            )
          })}
        </>
      </LeftContents>
      <RgghtContents></RgghtContents>
    </Wrapper>
  )
}

const LeftContents = styled.div`
  width: 200px;
  height: 100px;
`
const RgghtContents = styled.div`
  width: 200px;
  height: 100px;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Alarmtalk
