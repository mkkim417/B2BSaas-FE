import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { postSingleClient } from '../../axios/api';

type Props = {
  title?: string;
  memo?: string;
  coin?: number | string;
  closeModal?: () => void;
};
const UserCreateModal = ({ title, memo, closeModal }: Props) => {
  // input 추가를 위한 변수들

  const initialData = {
    clientName: '',
    clientEmail: '',
    contact: '',
  };
  const [data, setData] = useState(initialData);

  // 입력변화 상태값
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // mutate 선언
  const { mutate } = useMutation(postSingleClient, {
    onSuccess: (response:any) => {
      console.log('나 왜 안떠?')
      console.log('성공', response);
      alert('성공')
    },
    onError: (response) => {
      console.log('error', response);
      alert('실패!')
    },
  });
  // submit button handler
  const submitHandler = async (e: any, closeModal: any) => {
    e.preventDefault();

    // 연락처에서 '-' 제거
    const _contact = data.contact.replace(/-/g, '');
    alert(`name: ${data.clientName}, contact : ${_contact}`);

    // 이메일 형식 정규식
    const _email =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // 빈칸 확인 조건처리
    if (!(data.clientName === '' && data.contact === '')) {
      mutate({
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        contact: _contact,
      });
      alert('저장 성공!');
      closeModal();
    } else {
      alert('빈칸을 채워주세요!');
    }
  };
  return (
    <ModalWrap>
      <ModalBackGround />
      <ModalContainer>
        <div>{title}</div>
        <div>{memo}</div>
        <InputContainer>
          <div>
            이름
            <input
              name="clientName"
              type="text"
              value={data.clientName}
              placeholder="성명"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            연락처
            <input
              name="contact"
              value={data.contact}
              placeholder="연락처"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            이메일
            <input
              name="clientEmail"
              value={data.clientEmail}
              placeholder="이메일"
              onChange={onChangeHandler}
            />
          </div>
        </InputContainer>
        <ButtonContainer>
          <ButtonBox onClick={closeModal}>아니오</ButtonBox>
          <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>
            네
          </ButtonBox>
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
  gap: 2rem;
  padding: 3.6rem 0;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
`;
const InputContainer = styled.div`
  width: auto;
  display: flex;
  /* justify-content: space-around; */
  flex-direction: row;
  background-color: yellow;
  /* padding: 50px; */
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  /* background-color: yellow; */
  /* padding: 50px; */
  /* margin: 50px; */
  gap: 100px;
`;
const ButtonBox = styled.button`
  background-color: yellowgreen;
  padding: 10px;
  font-size: 24px;
`;

export default UserCreateModal;
