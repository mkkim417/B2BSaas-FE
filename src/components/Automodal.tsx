import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDetectClose from '../hook/useDetectClose';
import { kakaoGroupIdCreate } from '../redux/modules/kakaoGroupId';
import { getCookie } from '../util/cookie';
const AutoModal = (props: any) => {
  console.log('props.isSendModalData : ', props.isSendModalData);
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = [] as any[];
    const token = getCookie('userToken');
    props.isSendModalData.map((el: any) => data.push(el));
    console.log(data);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/talk/sends`,
          {
            data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          //navigate('/groupmanageList');
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}></XboxWrap>
        <ContentsWrap>
          <BoxMent>알림톡전송</BoxMent>
          {/* <TwiceWrap>
            <Flex width="50%">
              <Strong>
                그룹명<Red>*</Red>
              </Strong>
              <Input
                type="text"
                defaultValue={props.groupName}
                onChange={(e) => {
                  setGorupName(e.target.value);
                }}
              />
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
          <TwiceWrap> */}
          <Flex flexDirection="column">
            <Strong>미리보기</Strong>
            <KakaoBox>
              <YellowWrap>{props.currentValue}</YellowWrap>
              <WhiteWrap
                dangerouslySetInnerHTML={{ __html: props.isAllData }}
              ></WhiteWrap>
            </KakaoBox>
          </Flex>
          {/* <Flex width="50%" flexDirection="column" alignItems="initial">
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
          </Flex> */}
          {/* </TwiceWrap> */}
        </ContentsWrap>

        <div>
          <ButtonWrap>
            <div>
              <Button
                width="100px"
                height="40px"
                bgColor="#000"
                border="3px solid #fff"
                color="#fff"
                onClick={() => props.closeModal(false)}
              >
                취소
              </Button>
            </div>
            <ButtonGap>
              <Button
                width="100px"
                height="40px"
                bgColor="#000"
                border="3px solid #fff"
                color="#fff"
                onClick={onSubmit}
              >
                전송
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
  flexDirection?: string;
}>`
  align-items: center;
  display: flex;
  margin-top: 10px;
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
  border-radius: 10px;
  padding: 3rem;
  background-color: white;
  color: black;
  width: 750px;
  height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: gray 1px 1px 1px 1px;
  -webkit-box-pack: justify;
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
