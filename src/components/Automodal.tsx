import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDetectClose from '../hook/useDetectClose';
import { kakaoGroupIdCreate } from '../redux/modules/kakaoGroupId';
import { getCookie } from '../util/cookie';
import { GroupButton } from '../page/Alarmtalk';
const AutoModal = (props: any) => {
  const dropDownRef = useRef();
  console.log('isAllData : ', props.isAllData);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const data = [] as any[];
    const token = getCookie('userToken');
    props.isSendModalData.map((el: any) => data.push(el));
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
          navigate('/kakaoresultlist');
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props?.isLinkData);
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}></XboxWrap>
        <ContentsWrap>
          <BoxMent>알림톡전송 미리보기</BoxMent>
          <Flex flexDirection="column">
            <KakaoBox>
              <YellowWrap>{props.currentValue}</YellowWrap>
              <WhiteWrap
              // dangerouslySetInnerHTML={{ __html: props.isAllData }}
              >
                <div>{props.isAllData}</div>
                {props.currentValue === '사용법 안내' ? (
                  <button
                    onClick={() =>
                      window.open(`https://${props.isLinkData}`, '_blank')
                    }
                    style={{
                      border: '1px solid #ecedee',
                      background: '#f6f7f8',
                      width: '100%',
                      fontSize: '14px',
                      marginTop: '30px',
                      padding: '7px',
                      borderRadius: '7px',
                    }}
                  >
                    사용법 바로가기
                  </button>
                ) : null}
              </WhiteWrap>
            </KakaoBox>
          </Flex>
        </ContentsWrap>
        <div>
          <ButtonWrap>
            <div>
              <GroupButton onClick={() => props.closeModal(false)}>
                취소
              </GroupButton>
              <GroupButton onClick={onSubmitHandler}>전송</GroupButton>
            </div>
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
  padding: 15px 10px;
  height: auto;
`;
export const KakaoBoxContainer = styled.div`
  width: 300px;
  height: 450px;
  border-radius: 10px;
  background-color: lightblue;
  padding: 15px 30px;
  margin-top: 40px;
  margin-left: 10px;
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
  margin-top: 20px;
`;
const ButtonGap = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
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

export const KakaoBox = styled.div`
  width: 300px;
  height: auto;
  border-radius: 10px;
  background-color: lightblue;
  padding: 15px 30px;
  margin-top: 40px;
  margin-left: 10px;
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
  width: 600px;
  height: 600px;
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
  font-family: 'TheJamsil5Bold';
`;
const ContentsWrap = styled.div`
  height: 500px;
  /* background-color: red; */
`;
export default AutoModal;
