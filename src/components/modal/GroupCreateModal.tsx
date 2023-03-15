import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  title?: string;
  memo?: string;
  coin?: number | string;
  closeModal?: () => void;
};
const GroupCreateModal = ({ title, memo, coin, closeModal }: Props) => {

  // submit button handler
  const submitHandler = async (e:any, closeModal : any) => {
    e.preventDefault();
  }

  return (
    <ModalWrap>
      <ModalBackGround/>
      <ModalContainer>
        <ContentContainer>
          <div>
            {title}
          </div>
          <div>
            {memo}
          </div>
        </ContentContainer>
        <PagingContainer>
          <div>페이징</div>
        </PagingContainer>
        <ButtonContainer>
          <ButtonBox onClick={closeModal}>아니오</ButtonBox>
          <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>네</ButtonBox>
        </ButtonContainer>
      </ModalContainer>
    </ModalWrap>
  );
};

// 전체 모달 감싸주는 컴포넌틑
const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

// 모달 외의 뒷배경은 어둡게 처리
const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute; 
  bottom: 0;
  left: 0;
`;

// 모달 컴포넌트 페이지 CSS
const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  /* gap: 2rem; */
  padding: 2rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 25%;
  top: -0%;
  width: 50%;
  height: 100%;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 90%;
  background-color: yellow;
  /* padding: 50px; */
`
const PagingContainer = styled.div`
  width: 100%;
  height: 5%;
  background-color: blueviolet;
`
const ButtonContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: antiquewhite;
  /* background-color: yellow; */
  /* padding: 50px; */
  /* margin: 50px; */
  gap: 100px;
`
const ButtonBox = styled.button`
  background-color: yellowgreen;
  /* padding: 10px; */
  font-size: 24px;
`

export default GroupCreateModal;