import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../components/Accordion';

const TopNav = () => {
  return (
    <>
      {/* <Header>
        <Link to={'/'}>Logo</Link>
      </Header> */}
      <Wrapper>
        <UserContatiner>
          <UserButton>마이페이지</UserButton>
          <UserButton>로그아웃</UserButton>
        </UserContatiner>
        <Accordion
          title="SendingGo"
          contents={
            <div>
              <ul>
                <Li>Mneu1</Li>
                <Li>Mneu2</Li>
                <Li>Mneu3</Li>
              </ul>
            </div>
          }
        />
        <Link to={'/'}>
          <Accordion title="Home" />
        </Link>
        <Link to={'/usergrouplist'}>
          <Accordion title="usergrouplist" />
        </Link>
        <Link to={'/userlist'}>
          <Accordion title="User" />
        </Link>
        <Accordion
          title="Message"
          contents={
            <div>
              <ul>
                <Link to={'/uploadpage'}>
                  <Li>Send</Li>
                </Link>
              </ul>
            </div>
          }
        />
        <Link to={'/statistics'}>
          <Accordion title="Statistic" />
        </Link>
        <Link to={'/group'}>
          <Accordion title="Group" />
        </Link>
      </Wrapper>
      {<Outlet />}
    </>
  );
};
const Li = styled.div`
  margin-left: 30px;
  padding: 10px 0px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: white;
  width: 100vw;
  height: 60px;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: black;
  z-index: 1;
`;
const Wrapper = styled.div`
  padding-top: 80px;
  width: 200px;
  height: 100vh;
  position: fixed;
  /* left: 0%; */
  top: 70px;
  background-color: black;
`;
const UserContatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;
const UserButton = styled.button`
  background-color: beige;
  cursor: pointer;
`;

export default TopNav;
