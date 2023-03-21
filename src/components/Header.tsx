import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderContainer>
      <ContentsWrapper>
        <TwiceWraper>
          <Logo>
            <Link to={'/'}>Logo</Link>
          </Logo>
          <LeftContainer>
            <Li>소개</Li>
            <Li>요금제</Li>
            <Li>가이드</Li>
          </LeftContainer>
        </TwiceWraper>
        <SignupContainer>
          <Link to={'login'}>로그인</Link>
          <BlackBox>
            <Link to={'signup'}>무료로 시작하기</Link>
          </BlackBox>
        </SignupContainer>
      </ContentsWrapper>
    </HeaderContainer>
  );
}

const BlackBox = styled.div`
  background-color: black;
  color: white;
  padding: 10px 24px;
`;
const TwiceWraper = styled.div`
  display: flex;
`;
const Logo = styled.li`
  width: 150px;
  border: 1px solid #909090;
  color: #909090;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentsWrapper = styled.div`
  max-width: 1080px;
  align-items: center;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const HeaderContainer = styled.div`
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  position: fixed;
  top: 0;
  align-items: center;
  z-index: 2;
`;
const LeftContainer = styled.ul`
  display: flex;
  height: 60px;
  cursor: pointer;
  align-items: center;
`;
const Li = styled.li`
  margin: 0 20px;
  color: #909090;
`;

const SignupContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  color: #909090;
`;

export default Header;
