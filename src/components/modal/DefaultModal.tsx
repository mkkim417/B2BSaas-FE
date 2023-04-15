import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

export type DefaultModalProps = {
  children?: React.ReactNode;
  modalFooter?: React.ReactNode;
  isOpen: boolean;
  content?: any;
  closeModal: () => void;
};
function DefaultModal({
  isOpen,
  modalFooter,
  children,
  closeModal,
}: DefaultModalProps) {
  return isOpen ? (
    createPortal(
      <ModalWrap>
        <ModalBackGround>
          <ModalContainer>
            {children}
            <ButtonContainer>
              {modalFooter ? (
                modalFooter
              ) : (
                <ButtonBox onClick={closeModal}>닫기</ButtonBox>
              )}
            </ButtonContainer>
          </ModalContainer>
        </ModalBackGround>
      </ModalWrap>,
      document.getElementById('root-modal')!
    )
  ) : (
    <></>
  );
}

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
  /* border-radius: 1rem; */
  gap: 1rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 2px solid #b4bec9;
  background-color: white;
  position: absolute;
  left: 35%;
  top: 10%;
  width: 40%;
  height: 80%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  /* margin-right: 20px; */
  gap: 20px;
  /* background-color: aqua; */
`;
const ButtonBox = styled.button`
  width: 100px;
  height: 40px;
  color: #0a2332;
  border: 2px solid #0a2332;
  /* border-radius: 10px; */
  padding: 5px;
  font-size: 18px;
  :hover {
    background-color: #c1cbd6;
    border: none;
  }
`;

export default DefaultModal;
