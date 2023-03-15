import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDetectClose from '../hook/useDetectClose';
const AutoModal = (props: any) => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const [isGorupDesc, setGorupDesc] = useState();
  const navigate = useNavigate();
  const isGorupDescChage = (e: any) => {
    setGorupDesc(e.target.value);
  };
  const ClientListData = useSelector((state: any) => {
    return state.sendList.sendList;
  });
  console.log('ClientListData : ', ClientListData);
  const onSubmit = () => {
    if (isGorupDesc === undefined || null || '') {
      alert('그룹설명을 해주세요');
    }
    navigate('/group');
  };
  console.log(props.currentValue);
  console.log(props.isAllData);
  let body = {
    groupName: props.groupName[0],
    groupDescription: isGorupDesc,
    groupTagName: '신규',
    groupList: ClientListData[0],
  };
  //클라이언트 그룹 생성 post api요청
  const res = axios.post(
    '/api/clients/groups',
    {
      body,
    },
    { withCredentials: true }
  );
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}></XboxWrap>
        <ContentsWrap>
          <BoxMent>그룹 생성</BoxMent>
          <TwiceWrap>
            <Flex width="50%">
              <Strong>
                그룹명<Red>*</Red>
              </Strong>
              <Input type="text" defaultValue={props.groupName} />
            </Flex>
            <Flex width="50%">
              <Strong>유저수</Strong> {props.userNum}
            </Flex>
          </TwiceWrap>
          <Flex width="100%">
            <Strong>그룹설명</Strong>
            <Input
              width="80%"
              type="text"
              placeholder="그룹설명"
              value={isGorupDesc}
              onChange={isGorupDescChage}
            />
          </Flex>
          <TwiceWrap>
            <Flex width="50%" flexDirection="column" alignItems="initial">
              <Strong>미리보기</Strong>
              <KakaoBox>
                <YellowWrap>{props.currentValue}</YellowWrap>
                <WhiteWrap
                  dangerouslySetInnerHTML={{ __html: props.isAllData }}
                ></WhiteWrap>
              </KakaoBox>
            </Flex>
            <Flex width="50%" flexDirection="column" alignItems="initial">
              <Strong>정보</Strong>
              <Flex width="100%" flexDirection="column">
                <Flex width="100%">
                  <Flex width="50%">고객명</Flex>
                  <Flex width="50%">회사명</Flex>
                </Flex>
                <Flex width="100%">
                  <Flex width="50%">운송장번호</Flex>
                  <Flex width="50%">송장번호</Flex>
                </Flex>
              </Flex>
            </Flex>
          </TwiceWrap>
        </ContentsWrap>

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
                onClick={onSubmit}
              >
                그룹저장
              </Button>
            </ButtonGap>
          </ButtonWrap>
        </div>
      </ModalBlock>
    </Container>
  );
};

const Input = styled.input<{
  width?: string;
}>`
  width: 200px;
  width: ${(props) => (props.width ? props.width : '200px')};
  padding: 15px;
  background-color: #ededed;
  border: none;
  border-radius: 10px;
  justify-content: space-between;
`;
const Flex = styled.div<{
  width?: string;
  flexDirection?: string;
  alignItems?: string;
}>`
  align-items: center;
  display: flex;
  margin-top: 10px;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  width: ${(props) => (props.width ? props.width : '50%')};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'initial'};
`;
const Red = styled.span`
  color: red;
`;
const Strong = styled.div`
  margin-right: 30px;
  font-weight: bold;
`;
const TwiceWrap = styled.div`
  margin-top: 10px;
  display: flex;
`;
export const WhiteWrap = styled.div`
  font-size: 14px;
  background-color: #fff;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  padding: 10px;
  height: 130px;
`;
export const KakaoBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: lightblue;
  padding: 15px 30px;
  margin-top: 15px;
`;
export const YellowWrap = styled.div`
  background-color: yellow;
  width: 100%;
  font-size: 14px;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const ButtonGap = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const XboxWrap = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 28px;
  width: 35px;
`;
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
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`;
const ModalBlock = styled.div<{ ref?: any }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 6.5rem;
  border-radius: 10px;
  padding: 3rem 3rem;
  background-color: white;
  color: black;
  width: 750px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 1px 1px gray;
  justify-content: space-between;
`;
const Button = styled.button<{
  width?: string;
  bgColor?: string;
  color?: string;
  border?: string;
  fontWeight?: string;
  height?: string;
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
`;
const BoxMent = styled.div`
  font-weight: bold;
  font-size: 26px;
  text-align: left;
`;
const ContentsWrap = styled.div``;
export default AutoModal;
