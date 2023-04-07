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
      console.log(response);
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
          </TitleContainer>

          <DataContainer>
            <InputBox>성함</InputBox>
            <InputContainer
              name="clientName"
              type="text"
              value={data.clientName}
              onChange={onChangeHandler}
            />
            <InputBox>연락처</InputBox>
            <InputContainer
              name="contact"
              value={data.contact}
              onChange={onChangeHandler}
            />
            <InputBox>이메일</InputBox>
            <InputContainer
              name="clientEmail"
              type="text"
              value={data.clientEmail}
              onChange={onChangeHandler}
            />
          </DataContainer>
          <ButtonContainer>
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>
              확인
            </ButtonBox>
          </ButtonContainer>
        </ModalContainer>
      </ModalBackGround>
    </ModalWrap>
    // <ModalWrap>
    //   <ModalBackGround />
    //   <ModalContainer>
    //     <div>{clientName}</div>
    //     <div>{clientContact}</div>
    //     <InputContainer>
    //       <div>
    //         이름
    //         <input
    //           name="clientName"
    //           type="text"
    //           value={data.clientName}
    //           placeholder="성명"
    //           onChange={onChangeHandler}
    //         />
    //       </div>
    //       <div>
    //         연락처
    //         <input
    //           name="contact"
    //           value={data.contact}
    //           placeholder="연락처"
    //           onChange={onChangeHandler}
    //         />
    //       </div>
    //     </InputContainer>
    //     <ButtonContainer>
    //       <ButtonBox onClick={closeModal}>아니오</ButtonBox>
    //       <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>
    //         네
    //       </ButtonBox>
    //     </ButtonContainer>
    //   </ModalContainer>
    // </ModalWrap>
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
  border-radius: 1rem;
  gap: 1rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 35%;
  top: 20%;
  width: 40%;
  height: 60%;
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
  align-items: center;
  justify-content: center;
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
  border: 1px solid black;
`;
const DataContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  /* margin: 0px 500px 0px 500px; */
  padding: 0px 150px 0px 150px;
  /* overflow: scroll; */
  /* background-color: blueviolet; */
`;
const InputBox = styled.div`
  /* height: 28px; */
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 5px;
`;
const TitleBox = styled.div`
  /* height: 28px; */
  font-weight: 900;
  font-size: 24px;
`;
const InputContainer = styled.input`
  width: 100%;
  height: 35px;
  border: 2px solid #14B869;
  border-radius: 10px;
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
  /* border: 1px solid #14B869; */
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  :hover{
    background-color: #E6F8F0;
    color: #14B869;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  background-color: #14B869;
`
export default UserEditModal;
