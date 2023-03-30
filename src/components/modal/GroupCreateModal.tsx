import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import { PaginationBox } from '../NotUsedPages/UserList';

type Props = {
  closeModal?: () => void;
};
const GroupCreateModal = ({ closeModal }: Props) => {
  const token = localStorage.getItem('Token');
  // group input 변수들
  const initialData = {
    groupName: '',
    groupDescription: '',
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

  // submit button handler
  const submitHandler = async (e: any, closeModal: any) => {
    alert(`groupName : ${data.groupName}, groupDes : ${data.groupDescription}`);
    // e.preventDefault();
    // alert('저장!')
    if (!(data.groupName === '' && data.groupDescription === '')) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/groups`, data, {
        headers: { authorization: `Bearer ${token}` },
      });

      alert('저장 성공!');
      closeModal();
    } else {
      alert('빈칸을 채워주세요.');
    }
  };

  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <TitleContainer>
            <TitleBox>빈 그룹 생성</TitleBox>
          </TitleContainer>
          {/* <DataHeader>
            여긴어디
          </DataHeader> */}
          <DataContainer>
            <InputBox>그룹명</InputBox>
            <InputContainer
              name="groupName"
              type="text"
              value={data.groupName}
              placeholder="그룹명을 입력해주세요"
              onChange={onChangeHandler}
            />
            <InputBox>그룹설명</InputBox>
            <InputContainer
              name="groupDescription"
              type="text"
              value={data.groupDescription}
              placeholder="그룹설명을 입력해주세요"
              onChange={onChangeHandler}
            />
          </DataContainer>
          <ButtonContainer>
            {/* <ButtonBox>아니오</ButtonBox> */}
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>
              확인
            </ButtonBox>
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
`;
const TitleBox = styled.div`
  /* height: 28px; */
  font-weight: 900;
  font-size: 24px;
`;
const InputContainer = styled.input`
  height: 32px;
  border: 2px solid #4a72ff;
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
  border: 2px solid #4a72ff;
  border-radius: 10px;
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
`;

export default GroupCreateModal;
