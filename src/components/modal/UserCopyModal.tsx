import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  group?: any;
  content?: any;
  closeModal: () => void;
};
function UserCopyModal({ group, content, closeModal }: Props) {
  const token = localStorage.getItem('Token');
  // Select 그룹이름 담는 변수
  const groupArr = [] as any;
  // Select 선택값 변수 = newGroupId
  const [selectedGroupId, setSelectedGroupId] = useState('');
  // Select Change Handler
  const selectHandler = (e: any) => {
    setSelectedGroupId(e.target.value);
    console.log('select선택값 핸들러', e.target.value);
  };
  useEffect(() => {
    group.map((item: any) => {
      groupArr.push(item.groupName);
    });
  });

  // 제출 버튼 핸들러
  const submitButtonHandler = (e: any) => {
    e.preventDefault();
    // /api/batch/clients/:clientId/groups/:existGroupId/copy/:newGroupId
    const existGroupId = content[0].groupId;
    const urls = content.map(
      (item: any) =>
        `${process.env.REACT_APP_SERVER_URL}/api/batch/clients/${item.clientId}/groups/${existGroupId}/copy/${selectedGroupId}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (selectedGroupId === '') {
      alert('복사할 그룹을 선택해주세요.');
    } else {
      axios
        .all(urls.map((url: any) => axios.post(url)))
        .then((response) => {
          console.log(response);
          alert('복사 완료!');
          closeModal();
        })
        .catch((error) => {
          console.log(error.response);
          alert('복사 실패!ㅠㅠ');
        });
    }
  };
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <ContentContainer>
            <TitleContainer>복사시킬 그룹명을 선택해주세요!🌼</TitleContainer>
            <DataHeader>
              선택 :
              <select onChange={selectHandler}>
                {group.map((item: any) => (
                  <option value={item.groupId} key={item.groupId}>
                    {item.groupName}
                  </option>
                ))}
              </select>
            </DataHeader>
            <DataContainer>
              {content.map((item: any) => {
                return (
                  <DataHeader>
                    <RowPercent width="20%">{item.clientName}</RowPercent>
                    <RowPercent width="30%">{item.contact}</RowPercent>
                    <RowPercent width="50%">{item.clientEmail}</RowPercent>
                  </DataHeader>
                );
              })}
            </DataContainer>
          </ContentContainer>
          <ButtonContainer>
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ButtonBox onClick={submitButtonHandler}>확인</ButtonBox>
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

export default UserCopyModal;
