import React from 'react';
import styled from 'styled-components';

type Props = {
  title?: string;
  content?: string;
  closeModal: () => void;
};
function AlertModal({ title, content, closeModal }: Props) {
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <InputContainer>{content}</InputContainer>
          <ButtonContainer>
            {/* <ButtonBox>아니오</ButtonBox> */}
            <ButtonBox onClick={closeModal}>확인</ButtonBox>
          </ButtonContainer>
        </ModalContainer>
      </ModalBackGround>
    </ModalWrap>
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
  border-radius: 1rem;
  gap: 2rem;
  padding: 1rem 0;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 40%;
  top: 30%;
  width: 30%;
  height: 30%;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  flex-direction: row;
  font-size: 24px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  margin-right: 20px;
  gap: 30px;
`;
const ButtonBox = styled.button`
  border: 1px solid yellowgreen;
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
`;

export default AlertModal;
