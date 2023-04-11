import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { handleLogout, isLoggedin } from '../util/cookie';

function Header() {
  const isLoggedIn = isLoggedin();
  const navagate = useNavigate();
  return (
    <HeaderContainer>
      <ContentsWrapper>
        <TwiceWraper>
          <Logo>
            <Link to={'/'}>
              <LogoInamge></LogoInamge>
            </Link>
          </Logo>
          <LeftContainer>
            <Li>소개</Li>
            <Li>
              <Link to={'/pricepolicy'}>요금제</Link>
            </Li>
            <Li>가이드</Li>
            <Li>
              <a href="http://pf.kakao.com/_NsTkxj/chat">문의하기</a>
            </Li>
          </LeftContainer>
        </TwiceWraper>
        <SignupContainer>
          {isLoggedIn ? (
            <>
              <div
                style={{ fontSize: '14px', cursor: 'pointer', color: '#000' }}
                onClick={() => {
                  const isConfirmed =
                    window.confirm('정말 로그아웃 하시겠습니까?');
                  if (isConfirmed) {
                    handleLogout();
                  }
                }}
              >
                로그아웃
              </div>
              <BlackBox>
                <Link to={'/groupManageList'}>서비스 시작하기</Link>
              </BlackBox>
            </>
          ) : (
            <>
              <Link to={'/login'}>로그인</Link>
              <BlackBox>
                <Link to={'/signup'}>무료로 시작하기</Link>
              </BlackBox>
            </>
          )}
        </SignupContainer>
      </ContentsWrapper>
    </HeaderContainer>
  );
}

export const LogoInamge = styled.div`
  width: 140px;
  height: 40px;
  background-image: url(/MainLogo_resize.jpg);
  background-repeat: no-repeat;
  background-size: contain;
`;
const BlackBox = styled.div`
  background-color: black;
  color: white;
  padding: 10px 24px;
`;
const TwiceWraper = styled.div`
  display: flex;
`;
export const Logo = styled.li<{ border?: string; borderBottom?: string }>`
  margin: 0 auto;
  border: ${(props) => (props.border ? props.border : null)};
  border-bottom: ${(props) => (props.borderBottom ? props.borderBottom : null)};
  height: 60px;
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
  border-bottom: 2px solid #000;
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
  color: #000;
`;

const SignupContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  color: #909090;
`;

export default Header;
