import React from 'react'
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { deleteGroupData } from '../../axios/api';

type Props = {
  title?: string;
  content?: any;
  closeModal?: () => void;
};
function GroupDeleteModal({ title, content, closeModal }: Props) {

  const { mutate } = useMutation(deleteGroupData, {
    onSuccess: (response) => {
      console.log('success', response);
      alert('삭제 성공')
    },
    onError: (error) => {
      console.log('error', error);
    },
  })
  const onSubmitHandler = async() => {
    mutate(content.groupId)
  }
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <ContentContainer>
            <TitleContainer>
              <div>정말 삭제하시겠습니까?</div>
              <div>해당 그룹 삭제시, 관련 발송내역도 모두 삭제됩니다.</div>
              {/* <div>해당 그룹을 삭제시, 관련 발송내역도 모두 삭제됩니다.</div> */}
            </TitleContainer>
            <DataHeader>
                <div>삭제할 그룹목록</div>
              </DataHeader>
              <DataContainer>
                {content.groupName}
              </DataContainer>
          </ContentContainer>
          <ButtonContainer>
            {/* <ButtonBox>아니오</ButtonBox> */}
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ButtonBox onClick={onSubmitHandler}>확인</ButtonBox>
          </ButtonContainer>
        </ModalContainer>
      </ModalBackGround>
    </ModalWrap>
  )
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
  gap: 1rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 35%;
  top: 10%;
  width: 40%;
  height: 80%;
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
  background-color: beige;
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
  border: 1px solid yellowgreen;
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
`;

export default GroupDeleteModal