import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { postSingleClient } from '../axios/api';
import ClientHeader from '../components/ClientHeader';
import AlertModal from '../components/modal/AlertModal';

function SingleUserCreate() {
  const navigate = useNavigate();
  // Modal 변수들

  // 성공 모달
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const clickSuccessModal = () => {
    setIsSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setIsSuccessModal(false);
    window.location.reload();
  };

  // 실패 모달
  const [isFailModal, setIsFailModal] = useState(false);
  const clickOpenModal = () => {
    setIsFailModal(true);
  };
  const closeModal = () => {
    setIsFailModal(false);
  };
  // 이메일형식 유효성 모달
  const [emailValModal, setEmailValModal] = useState(false);
  const clickEmailModal = () => {
    setEmailValModal(true);
  };
  const closeEmailModal = () => {
    setEmailValModal(false);
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
    onSuccess: (response) => {
      // clickSuccessModal();
      // console.log(response)
      navigate('/clientRegistration');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {}, [clickSuccessModal]);
  // submit 핸들러
  const submitHandler = async (e: any) => {
    e.preventDefault();

    // 연락처는 '-'제거 후 api 보내기
    const _contact = inputData.clientContact.replace(/-/g, '');
    // 이메일 유효성
    const _email =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // 빈칸 유효성 처리
    if (
      !(
        inputData.clientName === '' ||
        inputData.clientEmail === '' ||
        inputData.clientContact === ''
      )
    ) {
      // 이메일 형식 유효성 검사
      if (_email.test(inputData.clientEmail) === true) {
        // 연락처 유효성 검사
        if (_contact.length > 11 || _contact.length < 11) {
          alert('연락처를 다시 한번 확인해주세요.');
        } else {
          mutate({
            clientName: inputData.clientName,
            clientEmail: inputData.clientEmail,
            contact: _contact,
          });
        }
      } else {
        // 이메일유효성이 올바르지 않을 경우
        clickEmailModal();
      }
    } else {
      // 실패 모달
      clickOpenModal();
    }
  };
  return (
    <Container>
      <ContentContainer onSubmit={submitHandler}>
        <div>
          <BigText>단건생성</BigText>
          <SmallText>
            동일한 성함, 연락처, 이메일은 그룹당 1명씩만 등록 가능합니다.
          </SmallText>
        </div>
        <RowContatiner>
          <NameContainer>성함</NameContainer>
          <InputContainer
            name="clientName"
            type="text"
            value={inputData.clientName}
            placeholder="성함을 입력해주세요."
            onChange={onInputChange}
          />
        </RowContatiner>
        <RowContatiner>
          <NameContainer>연락처</NameContainer>
          <InputContainer
            name="clientContact"
            type="text"
            value={inputData.clientContact}
            placeholder="고객의연락처를 입력해주세요."
            onChange={onInputChange}
          />
        </RowContatiner>
        <RowContatiner>
          <NameContainer>이메일</NameContainer>
          <InputContainer
            name="clientEmail"
            type="text"
            value={inputData.clientEmail}
            placeholder="고객의이메일를 입력해주세요."
            onChange={onInputChange}
          />
        </RowContatiner>
        <ButtonContainer>
          <ConfirmButton type="submit" onClick={submitHandler}>
            등록
          </ConfirmButton>
        </ButtonContainer>
      </ContentContainer>
      {isSuccessModal && (
        <AlertModal closeModal={closeSuccessModal} content="등록 성공!" />
      )}
      {isFailModal && (
        <AlertModal closeModal={closeModal} content="빈칸을 확인해주세요." />
      )}
      {/* 이메일 유효성 실패 모달 */}
      {emailValModal && (
        <AlertModal
          closeModal={closeEmailModal}
          content="이메일 형식이 맞지않습니다."
        />
      )}
    </Container>
  );
}

const SmallText = styled.div`
  color: #002333;
  font-weight: normal;
  margin: 20px 0px 50px;
`;
const BigText = styled.div`
  font-size: 25px;
  font-weight: bold;

  color: #002333;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const ContentContainer = styled.form`
  /* min-width: 450px; */
  height: 40%;
  padding: 48px;
  width: 600px;
  height: auto;
  /* margin: 100px 300px; */
  background-color: #fff;
`;

const RowContatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  /* background-color: beige; */
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  font-family: 'TheJamsil5Bold';
  height: 40px;
  /* border: 1px solid #bdbdbd; */
`;
const InputContainer = styled.input`
  display: flex;
  height: 55px;
  width: 100%;
  padding-left: 15px;
  border: 1px solid #bdbdbd;
  font-family: 'TheJamsil5Bold';
  :focus {
    outline: auto;
  }
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
const ButtonBox = styled.button`
  color: aliceblue;
  font-family: TheJamsil5Bold;
  background-color: rgb(20, 184, 105);
  font-size: 14px;
  height: 40px;
  width: 120px;
  :hover {
    background-color: white;
    border: 1px solid black;
    color: black;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  font-family: 'TheJamsil5Bold';
  background-color: #159a9c;
  font-size: 14px;
`;

export default SingleUserCreate;
