import React from 'react';
import { Link } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';

function ClientHeader() {
  // 단건, 다건 등록 경로
  // 처음 경로
  const clientRegistration = useMatch('/clientregistration');
  const singleCreate = useMatch('/singleusercreate');
  const multieCreate = useMatch('/uploadpage');
  return (
    <HeaderContainer>
      <ButtonContainer>
        <Link to={'/clientregistration'}>
          {clientRegistration ? (
            <ColorButton>단건 생성</ColorButton>
          ) : (
            <DefaultButton>단건 생성</DefaultButton>
          )}
        </Link>
        <Link to={'/uploadpage'}>
          {multieCreate ? (
            <ColorButton>다건 생성</ColorButton>
          ) : (
            <DefaultButton>다건 생성</DefaultButton>
          )}
        </Link>
      </ButtonContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  height: 60px;
  justify-content: end;
  padding-right: 50px;
  gap: 30px;
  right: 0;
  /* margin-top: 30px; */
  /* background-color: salmon; */
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  /* background-color: beige; */
`;
const DefaultButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  color: #909090;
  padding: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #d9d9d9;
`;
const ColorButton = styled(DefaultButton)`
  color: #14b769;
  border-bottom: 1px solid #14b769;
`;
export default ClientHeader;
