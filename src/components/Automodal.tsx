import React, { useRef } from 'react'
import styled from 'styled-components'
import useDetectClose from '../hook/useDetectClose'
const AutoModal = (props: any) => {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅
  console.log('props.userNum : ', props.userNum)
  console.log('props.groupName : ', props.groupName)
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}></XboxWrap>
        <ImageWrap>
          <BoxMent>그룹 생성</BoxMent>
          <BoxMent>그룹명 {props.groupName}</BoxMent>
          <BoxMent>유저수 {props.userNum}</BoxMent>
          <BoxMent>
            그룹설명 <input type="text" placeholder="그룹설명"></input>
          </BoxMent>
          <div>대량발송정보</div>미리보기
          <div>고객명 회사명 운송장번호 송장번호</div>
        </ImageWrap>

        <div>
          <ButtonWrap>
            <div>
              <Button
                width="100px"
                height="40px"
                bgColor="#fff"
                border="3px solid #000"
                color="#000"
                onClick={() => props.closeModal(false)}
              >
                닫기
              </Button>
            </div>
            <ButtonGap>
              <Button
                width="100px"
                height="40px"
                bgColor="#fff"
                border="3px solid #000"
                color="#000"
              >
                임시저장
              </Button>
              <Button
                width="100px"
                height="40px"
                bgColor="#fff"
                border="3px solid #000"
                color="#000"
              >
                보내기
              </Button>
            </ButtonGap>
          </ButtonWrap>
        </div>
      </ModalBlock>
    </Container>
  )
}
const ButtonGap = styled.div`
  display: flex;
  gap: 10px;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const XboxWrap = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 28px;
  width: 35px;
`
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`
const ModalBlock = styled.div<{ ref?: any }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 6.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  width: 800px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 1px 1px gray;
  justify-content: space-between;
`
const Button = styled.button<{
  width?: string
  bgColor?: string
  color?: string
  border?: string
  fontWeight?: string
  height?: string
}>`
  border: ${(props) => (props.border ? props.border : null)};
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};
  color: ${({ color }) => (color ? color : '#000')};
  height: ${(props) => (props.height ? props.height : '45px')};
  padding: 1px 6px;

  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : null)};
  width: ${(props) => (props.width ? props.width : '110px')};
  &:active {
    filter: brightness(50%);
  }
`
const BoxMent = styled.div`
  margin: 35px 0 40px;
  font-weight: bold;
  font-size: 26px;
  font-family: 'KCC-DodamdodamR';
`
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export default AutoModal
