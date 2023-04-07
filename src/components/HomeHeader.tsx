import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { handleLogout, isLoggedin } from '../util/cookie';
function HomeHeader() {
  const isLoggedIn = isLoggedin();
  return (
    <HeaderContainer>
      <ContentsWrapper>
        <Logo>
          <Link to={'/'}>Logo</Link>
        </Logo>
        <TwiceWraper>
          <LeftContainer></LeftContainer>
        </TwiceWraper>
        <FlexWrap>
          {isLoggedIn ? (
            <>
              <UserWrap>
                <Box width="25px" height="25px" />
                <div>
                  <div>소속회사명</div>
                  <Username>김샌드</Username>
                </div>
              </UserWrap>
              <UserButton
                onClick={() => {
                  const isConfirmed =
                    window.confirm('정말 로그아웃 하시겠습니까?');
                  if (isConfirmed) {
                    handleLogout();
                  }
                }}
              >
                로그아웃
              </UserButton>
            </>
          ) : (
            <Link to="/login">
              <UserButton>로그인</UserButton>
            </Link>
          )}
        </FlexWrap>
        {/* <SignupContainer>
          <Link to={'/login'}>로그인</Link>
          <BlackBox>
            <Link to={'/signup'}>무료로 시작하기</Link>
          </BlackBox>
        </SignupContainer> */}
      </ContentsWrapper>
    </HeaderContainer>
  );
}
const UserButton = styled.div`
  color: #909090;
  text-decoration: underline;
  cursor: pointer;
  :nth-of-type(2) {
    font-weight: 100;
  }
`;
const Username = styled.div`
  font-weight: bold;
  font-family: 'Inter';
  font-size: 18px;
  margin-top: 4px;
`;
const Box = styled.div<{
  width?: string;
  height?: string;
}>`
  margin-right: 10px;
  width: ${(props) => (props.width ? props.width : '32px')};
  height: ${(props) => (props.height ? props.height : '32px')};
  border-radius: 8px;
  background: #d9d9d9;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  font-weight: bold;
`;
const UserWrap = styled.div`
  display: flex;
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
  border: ${(props) => (props.border ? props.border : null)};
  height: 60px;
  color: #909090;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentsWrapper = styled.div`
  width: 100%;
  align-items: center;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const HeaderContainer = styled.div`
  border-bottom: 1px solid #e1e1e1;
  padding: 0px 20px;
  width: 100%;
  top: 0;
  align-items: center;
  z-index: 2;
  position: fixed;
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

export default HomeHeader;
