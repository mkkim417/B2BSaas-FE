import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { eidtClientData } from '../../axios/api';

type Props = {
  clientId?: any;
  clientName?: string;
  clientContact?: any;
  clientEmail?: string;
  closeModal: () => void;
};
const UserEditModal = ({
  clientId,
  clientName,
  clientContact,
  clientEmail,
  closeModal,
}: Props) => {
  // input 추가를 위한 변수들
  // const token = localStorage.getItem('Token');
  const initialData = {
    clientName: clientName,
    contact: clientContact,
    clientEmail: clientEmail,
  };
  const [data, setData] = useState(initialData);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  // mutate 선언
  const { mutate } = useMutation(eidtClientData, {
    onSuccess: (response) => {
      closeModal();
    },
    onError: (error) => {
      console.log(error);
      alert('저장 실패!');
    },
  });

  // submit button handler
  const submitHandler = async (e: any, closeModal: any) => {
    // 연락처에서 '-' 제거
    const _contact = data.contact.replace(/-/g, '');

    // 빈칸 확인 조건처리
    if (
      !(
        data.clientName === '' ||
        data.contact === '' ||
        data.clientEmail === ''
      )
    ) {
      // 빈칸 없으면 수정 patch
      mutate({
        clientId: clientId,
        clientName: data.clientName,
        contact: _contact,
        clientEmail: data.clientEmail,
      });
    } else {
      alert('빈칸을 채워주세요!');
    }
  };
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <TitleContainer>
            <TitleBox>고객 정보 수정</TitleBox>
            <SubTitleBox>빈칸없이 작성해주세요.</SubTitleBox>
          </TitleContainer>

          <DataContainer>
            <div>
            <InputBox>
              성함
              <RequiredDiv>*</RequiredDiv>
            </InputBox>
            <InputContainer
              name="clientName"
              type="text"
              value={data.clientName}
              onChange={onChangeHandler}
            />
            </div>
            <div>
            <InputBox>
              연락처
              <RequiredDiv>*</RequiredDiv>
            </InputBox>
            <InputContainer
              name="contact"
              value={data.contact}
              onChange={onChangeHandler}
            />
            </div>
            <div>
            <InputBox>
              이메일
              <RequiredDiv>*</RequiredDiv>
            </InputBox>
            <InputContainer
              name="clientEmail"
              type="text"
              value={data.clientEmail}
              onChange={onChangeHandler}
            />
            </div>
          </DataContainer>
          <ButtonContainer>
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ConfirmButton onClick={(e) => submitHandler(e, closeModal)}>
              확인
            </ConfirmButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalBackGround>
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
  /* border-radius: 1rem; */
  gap: 1rem;
  padding: 3rem 2rem 2rem 2rem;
  border: 2px solid #B4BEC9;
  background-color: white;
  position: absolute;
  left: 35%;
  top: 10%;
  width: 550px;
  height: 600px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  /* justify-content: center; */
  /* align-items: center; */
  /* margin-top: 30px; */
  /* padding: 30px 10px 10px 10px; */
  flex-direction: column;
  font-size: 24px;
  /* background-color: red; */
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-color: beige; */
`;
const DataHeader = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: row;
  /* background-color: darkgreen; */
`;
const RowPercent = styled.div<{ width: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(item: any) => item.width};
  border: 1px solid #bdbdbd;
`;
const DataContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 30px;
  /* padding-left: 50px; */
  /* margin: 0px 500px 0px 500px; */
  padding: 0px 150px 0px 150px;
  /* overflow: scroll; */
  /* background-color: blueviolet; */
`;
const InputBox = styled.div`
  height: 28px;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10x;
`;
const RequiredDiv = styled.div`
  color: #FBA94C;
  font-size: 24px;
`

const TitleBox = styled.div`
  /* height: 28px; */
  font-weight: 900;
  font-size: 36px;
`;
const SubTitleBox = styled.div`
  /* font-weight: 900; */
  font-size: 18px;
`
const InputContainer = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  background-color: #F3F4F8;
  border: 1px solid #C7CCD2;
  border-left: none;
  border-right: none;
  border-top: none;
  :focus {
    border: 2px solid #FBA94C;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  margin-right: 20px;
  gap: 20px;
  /* background-color: aqua; */
`;
const ButtonBox = styled.button`
  width: 100px;
  color: #0A2332;
  border: 2px solid #0A2332;
  /* border-radius: 10px; */
  padding: 5px;
  font-size: 18px;
  :hover {
    background-color: #C1CBD6;
    border: none;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  background-color: #0A2332;
  :hover {
    color: white;
    background-color: #FBA94C;
    border: #FBA94C;
  }
`
export default UserEditModal;
