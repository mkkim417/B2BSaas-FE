import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '../../util/cookie';
import { SubTitleBox, TitleBox } from './GroupCreateModal';

type Props = {
  group?: any;
  content?: any;
  closeModal: () => void;
};
function UserMoveModal({ group, content, closeModal }: Props) {
  const token = getCookie('userToken');
  // Select 그룹이름 담는 변수
  const groupArr = [] as any;
  // Select 선택값 변수 = newGroupId
  const [selectedGroupId, setSelectedGroupId] = useState('');
  // Select Change Handler
  const selectHandler = (e: any) => {
    setSelectedGroupId(e.target.value);
  };
  useEffect(() => {
    group.map((item: any) => {
      groupArr.push(item.groupName);
    });
  });

  const submitButtonHandler = (e: any) => {
    e.preventDefault();
    const existGroupId = content[0].groupId;
    const urls = content.map(
      (item: any) =>
        `${process.env.REACT_APP_SERVER_URL}/api/batch/clients/${item.clientId}/groups/${existGroupId}/move/${selectedGroupId}`
    );
    if (selectedGroupId === '') {
      alert('이동할 그룹을 선택해주세요.');
    } else {
      axios
        .all(
          urls.map((url: any) =>
            axios.post(
              url,
              {},
              { headers: { authorization: `Bearer ${token}` } }
            )
          )
        )
        .then((response) => {
          alert('이동 완료!');
          closeModal();
        })
        .catch((error) => {
          if (error.response.data.message === '이미 존재하는 그룹입니다.') {
            alert('이미 등록된 고객입니다.');
            closeModal();
          } else if (
            error.response.data.message === '존재하지 않는 그룹입니다.'
          ) {
            alert('존재하지 않는 그룹입니다.');
            closeModal();
          } else {
            alert('복사에 실패하였습니다. 관리자에게 문의해주세요.');
            closeModal();
          }
        });
    }
    // window.location.reload();
  };
  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <ContentContainer>
            <TitleContainer>
              <TitleBox>그룹 이동</TitleBox>
              <SubTitleBox>고객들을 이동할 그룹을 선택해주세요.</SubTitleBox>
            </TitleContainer>
            <SelectHeader>
              <GroupDiv>그룹</GroupDiv>
              <SelectBox onChange={selectHandler}>
                <option value="none">그룹을 선택해주세요.</option>
                {group.map((item: any) => (
                  <option value={item.groupId} key={item.groupId}>
                    {item.groupName}
                  </option>
                ))}
              </SelectBox>
            </SelectHeader>
            <DataHeader>
              <HeaderPercent width="20%">이름</HeaderPercent>
              <HeaderPercent width="30%">연락처</HeaderPercent>
              <HeaderPercent width="50%">이메일</HeaderPercent>
            </DataHeader>
            <DataContainer>
              {content.map((item: any) => {
                return (
                  <DataRow key={item.clientId}>
                    <RowPercent width="20%">{item.clientName}</RowPercent>
                    <RowPercent width="30%">{item.contact}</RowPercent>
                    <RowPercent width="50%">{item.clientEmail}</RowPercent>
                  </DataRow>
                );
              })}
            </DataContainer>
          </ContentContainer>
          <ButtonContainer>
            <ButtonBox onClick={closeModal}>취소</ButtonBox>
            <ConfirmButton onClick={submitButtonHandler}>확인</ConfirmButton>
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
  /* border-radius: 1rem; */
  gap: 1rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 2px solid #B4BEC9;
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
  height: 15%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 24px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  /* background-color: beige; */
`;
const SelectHeader = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  font-size: 18px;
  align-items: center;
  flex-direction: row;
  /* background-color: pink; */
`;
const DataHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 20px;
  font-weight: 800;
  color: white;
  /* align-items: center; */
  flex-direction: row;
  background-color: #48989B;
`;
const DataRow = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
`;
const GroupDiv = styled.div`
  height: 35px;
  width: 50px;
  color: #48989B;
  text-align: center;
  line-height: 35px;
  font-weight: 800;
  /* background-color: #48989B;; */
  border: 2px solid #48989B;
`
const SelectBox = styled.select`
  width: 200px;
  height: 35px;
  color: #002333;
  font-weight: 700;
  font-size: 16px;
  margin-left: 10px;
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${(item: any) => item.width};
  border: 1px solid #f3f3f3;
  border-left: 1ch;
  border-right: 1ch;
  border-top: 1ch;
`;
const DataContainer = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  /* background-color: blueviolet; */
  box-shadow: 0 2px 4px 0 #a4bde2;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  /* margin-right: 20px; */
  gap: 20px;
  /* background-color: aqua; */
`;
const ButtonBox = styled.button`
  width: 100px;
  height: 40px;
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
export default UserMoveModal;
