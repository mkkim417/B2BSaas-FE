import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { postSingleClient } from '../axios/api';
import ClientHeader from '../components/ClientHeader';
import AlertModal from '../components/modal/AlertModal';

function SingleUserCreate() {
  // Modal 변수들

  // 성공 모달
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const clickSuccessModal = () => {
    setIsSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setIsSuccessModal(false);
  };

  // 실패 모달
  const [isFailModal, setIsFailModal] = useState(false);
  const clickOpenModal = () => {
    setIsFailModal(true);
  };
  const closeModal = () => {
    setIsFailModal(false);
  };

  // input 기본 state
  const initialInput = {
    clientName: '',
    clientEmail: '',
    clientContact: '',
  };

  // input 상태변화값
  const [inputData, setInputData] = useState(initialInput);

  // input change 핸들러
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // mutate 선언
  const { mutate } = useMutation(postSingleClient, {
    onSuccess : (response) => {
      console.log(response);
      clickSuccessModal();
    },
    onError: (error) => {
      console.log(error);
    }
  });
  // submit 핸들러
  const submitHandler = async (e: any) => {
    e.preventDefault();

    // 연락처는 '-'제거 후 api 보내기
    const _contact = inputData.clientContact.replace(/-/g, '');

    // 빈칸 유효성 처리
    if (
      !(
        inputData.clientName === '' ||
        inputData.clientEmail === '' ||
        inputData.clientContact === ''
      )
    ) {
      //  이름, 이메일, 연락처 빈칸 없으면 등록
      mutate({
        clientName : inputData.clientName,
        clientEmail : inputData.clientEmail,
        contact : _contact
        })
    } else {
      // 실패 모달
      clickOpenModal();
    }
  };
  return (
    <Container>
      <ContentContainer onSubmit={submitHandler}>
        <RowContatiner>
          <NameContainer>성함</NameContainer>
          <InputContainer
            name="clientName"
            type="text"
            value={inputData.clientName}
            placeholder="성함"
            onChange={onInputChange}
          />
        </RowContatiner>
        <RowContatiner>
          <NameContainer>연락처</NameContainer>
          <InputContainer
            name="clientContact"
            type="text"
            value={inputData.clientContact}
            placeholder="연락처"
            onChange={onInputChange}
          />
        </RowContatiner>
        <RowContatiner>
          <NameContainer>이메일</NameContainer>
          <InputContainer
            name="clientEmail"
            type="text"
            value={inputData.clientEmail}
            placeholder="이메일"
            onChange={onInputChange}
          />
        </RowContatiner>
        <ButtonContainer>
          <SubmitButton type="submit" onClick={submitHandler}>
            등록
          </SubmitButton>
        </ButtonContainer>
      </ContentContainer>
      {isSuccessModal && (
        <AlertModal closeModal={closeSuccessModal} content="등록 성공!" />
      )}
      {isFailModal && (
        <AlertModal closeModal={closeModal} content="빈칸을 확인해주세요." />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ContentContainer = styled.form`
  width: 50%;
  height: 40%;
  margin: 100px 300px;
  /* background-color: red; */
`;

const RowContatiner = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* background-color: beige; */
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  border: 1px solid black;
`;
const InputContainer = styled.input`
  display: flex;

  width: 80%;
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: right;
`;
const FormContainer = styled.form``;
const SubmitContatiner = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: right;
  height: 10%;
  margin: 0px 10px 10px 0px;
`;
const SubmitButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: blanchedalmond;
`;
const InputBox = styled.input`
  width: 500px;
  height: 40px;
`;

export default SingleUserCreate;
