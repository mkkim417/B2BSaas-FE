import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to={'/'}>Logo</Link>
      </LogoContainer>
      <SignupContainer>
        <Link to={'login'}>로그인</Link>
        <Link to={'signup'}>회원가입</Link>
      </SignupContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoContainer = styled.div`
  margin-left: 30px;
  padding: 10px;
  margin: 20px;
  background-color: antiquewhite;
  cursor: pointer;
`;

const SignupContainer = styled.div`
  background-color: white;
`;

export default Header;
