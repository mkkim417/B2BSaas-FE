import React from 'react';
import { Outlet } from 'react-router';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../components/Accordion';

const TopNav = () => {
  const Uploadpage = useMatch('/uploadpage');
  const usergrouplist = useMatch('/usergrouplist');
  const statistics = useMatch('/statistics');
  const Home = useMatch('/');

  const clientCreate = useMatch('/singleusercreate');
  const clientRegistration = useMatch('/clientregistration')
  const groupManageList = useMatch('/groupmanageList')

  console.log('Uploadpage : ', Uploadpage);
  console.log('Home : ', Home);
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
        <Link to={'/'}>
          <Accordion title="이용현황" />
        </Link>
        <Accordion
          title="이메일전송"
          contents={
            <div>
              <Ul>
                <Link to={'/uploadpage'}>
                  {Uploadpage ? (
                    <LiBlue>이메일작성</LiBlue>
                  ) : (
                    <Li>이메일 작성</Li>
                  )}
                </Link>
                <Link to={'/statistics'}>
                  {statistics ? (
                    <LiBlue>전송결과조회</LiBlue>
                  ) : (
                    <Li>전송결과조회</Li>
                  )}
                </Link>
              </Ul>
            </div>
          }
        />
        <Accordion
          title="고객관리"
          contents={
            <div>
              <Ul>
                <Link to={'/clientRegistration'}>
                  {clientRegistration ? (
                    <LiBlue>고객등록</LiBlue>
                  ) : (
                    <Li>고객등록</Li>
                  )}
                </Link>
                <Link to={'/groupmanageList'}>
                  {groupManageList ? (
                    <LiBlue>그룹관리</LiBlue>
                  ) : (
                    <Li>그룹관리</Li>
                  )}
                  {/* <Li>그룹관리</Li> */}
                </Link>
              </Ul>
            </div>
          }
        />
        <Link to={'/uploadpage'}>
          <Accordion title="대량발송" />
        </Link>
        <Link to={'/statistics'}>
          <Accordion title="Statistic" />
        </Link>
        <Link to={'/group'}>
          <Accordion title="Group" />
        </Link>
        <Link to={'userdatacreate'}>
          <Accordion title="Create" />
        </Link>
      </Wrapper>
      {<Outlet />}
    </>
  );
};
const Ul = styled.ul`
  border-top: 1px solid #909090;
  background-color: #fbfbfb;
`;
const Li = styled.li`
  margin-left: 30px;
  padding: 10px 0px;
  color: #909090;
`;
const LiBlue = styled(Li)`
  color: #007bff;
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
  width: 250px;
  height: 100vh;
  position: fixed;
  /* left: 0%; */
  background-color: #f2f2f2;
  z-index: 1;
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
