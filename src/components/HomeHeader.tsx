import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie, handleLogout, isLoggedin } from '../util/cookie';
import { LogoInamge } from './Header';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
function HomeHeader() {
  const [isUserData, setUserData] = useState();
  const isLoggedIn = isLoggedin();
  const token = getCookie('userToken');
  const userReadFn = useCallback(async (userId: number) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('fetchTemplateDetail : ', res.data.data);
          setUserData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn && isLoggedIn) {
      const decoded = jwt_decode(token) as any;
      userReadFn(decoded.userId);
    }
  }, [userReadFn]);
  return (
    <HeaderContainer>
      <ContentsWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoInamge />
          </Link>
        </Logo>
        <TwiceWraper>
          <LeftContainer></LeftContainer>
        </TwiceWraper>
        <FlexWrap>
          <UserButton>
            <a href="http://pf.kakao.com/_NsTkxj/chat">문의하기</a>
          </UserButton>
          {isLoggedIn ? (
            <>
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
              <UserWrap>
                <Box width="25px" height="25px" />
                <div>
                  <div>
                    {isUserData && isUserData
                      ? (isUserData['company']['companyName'] as any)
                      : null}
                  </div>
                  <Username>
                    {' '}
                    {isUserData && isUserData
                      ? (isUserData['user']['name'] as any)
                      : null}
                  </Username>
                </div>
              </UserWrap>
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
  color: #000;
  text-decoration: underline;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  :nth-of-type(2) {
    /* font-weight: 100; */
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
  align-items: center;
  gap: 30px;
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
  border-bottom: 2px solid #000;
  padding: 0px 20px;
  width: 100%;
  background-color: #fff;
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
