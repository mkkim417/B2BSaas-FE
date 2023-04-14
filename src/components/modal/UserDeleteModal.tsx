import axios from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { deleteClientData } from '../../axios/api';
import { getCookie } from '../../util/cookie';

type Props = {
  title?: string;
  checkValue?: any;
  closeModal: () => void;
};
function UserDeleteModal({ title, checkValue, closeModal }: Props) {
  // const token = getCookie('userToken')
  // mutate 선언
  const { mutate } = useMutation(deleteClientData, {
    onSuccess: (response) => {
      alert('삭제가 완료되었습니다');
      closeModal();
    },
    onError: (error) => {
      console.log(error);
      alert('삭제를 실패하였습니다.');
    },
  });
  const deleteDataHandler = (e: any) => {
    e.preventDefault();
    // 확인 눌렀을 때
    mutate(checkValue);
    // const urls = checkValue.map(
    //   (item: any) =>
    //     `${process.env.REACT_APP_SERVER_URL}/api/clients/${item.clientId}`
    // );
    // console.log(urls);
    // axios
    //   .all(
    //     urls.map((url: any) =>
    //       axios.delete(url, { headers: { authorization: `Bearer ${token}` } })
    //     )
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     alert('삭제가 완료되었습니다');
    //     closeModal();
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     alert('삭제를 실패하였습니다.');
    //   });
  };
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <ContentContainer>
            <TitleContainer>
              <div>{title}</div>
            </TitleContainer>
            <DataHeader>
              <HeaderPercent width="20%">이름</HeaderPercent>
              <HeaderPercent width="30%">연락처</HeaderPercent>
              <HeaderPercent width="50%">이메일</HeaderPercent>
            </DataHeader>
            <DataContainer>
              {checkValue.map((item: any) => {
                return (
                  <DataRow>
                    <RowPercent width="20%">{item.clientName}</RowPercent>
                    <RowPercent width="30%">{item.contact}</RowPercent>
                    <RowPercent width="50%">{item.clientEmail}</RowPercent>
                  </DataRow>
                );
              })}
            </DataContainer>
          </ContentContainer>
          {/* <FootContainer>
            <div>해당 고객을 삭제시, 관련 발송내역이 모두 삭제됩니다.</div>
          </FootContainer> */}
          <ButtonContainer>
            {/* <ButtonBox>아니오</ButtonBox> */}
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ConfirmButton onClick={deleteDataHandler}>확인</ConfirmButton>
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
  gap: 0.5rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 35%;
  top: 10%;
  width: 40%;
  height: 70%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* gap: 10px; */
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
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: beige; */
`;
const DataHeader = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  /* background-color: darkgreen; */
`;
const DataRow = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
`;
const HeaderPercent = styled.div<{ width: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${(item: any) => item.width};
  border: 1px solid #bdbdbd;
  border-left: 1ch;
  border-right: 1ch;
  /* background-color: aqua; */
`;
const RowPercent = styled.div<{ width: any }>`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${(item: any) => item.width};
  border: 1px solid #f3f3f3;
  border-left: 1ch;
  border-right: 1ch;
  border-top: 1ch;
  /* background-color: aqua; */
`;
const DataContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  /* background-color: blueviolet; */
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
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
  :hover {
    background-color: #e6f8f0;
    color: #14b869;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  background-color: #14b869;
`;

export default UserDeleteModal;
