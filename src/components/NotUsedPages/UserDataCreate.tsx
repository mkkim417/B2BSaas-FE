import React, { useState } from 'react';
import styled from 'styled-components';
import GroupCreateModal from '../modal/GroupCreateModal';
import UserCreateModal from './UserCreateModal';

function UserDataCreate() {
  // Modal 변수들

  // 클라이언트 모달
  const [clientOpenModal, setClientOpenModal] = useState(false);
  const clickClientModal = () => {
    setClientOpenModal(true);
  };
  const closeClientModal = () => {
    setClientOpenModal(false);
  };

  // 그룹 모달
  const [groupOpenModal, setGroupModal] = useState(false);
  const clickGroupModal = () => {
    setGroupModal(true);
  };
  const closeGroupModal = () => {
    setGroupModal(false);
  };

  return (
    <Wrapper>
      <ButtonBox onClick={clickClientModal}>클라이언트 생성</ButtonBox>
      <ButtonBox onClick={clickGroupModal}>그룹 생성</ButtonBox>
      {clientOpenModal && (
        <UserCreateModal
          closeModal={closeClientModal}
          title="클라이언트 생성"
          memo="클라이언트 생성하는 모달"
        />
      )}
      {groupOpenModal && <GroupCreateModal closeModal={closeGroupModal} />}
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 200px;
  gap: 30px;
`;
const ButtonBox = styled.button`
  background-color: beige;
  font-size: 28px;
  padding: 10px;
`;

export default UserDataCreate;
