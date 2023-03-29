import React from 'react';
import { Outlet } from 'react-router';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../components/Accordion';
import { Logo } from '../components/Header';

const TopNav = () => {
  const Uploadpage = useMatch('/uploadpage');
  const usergrouplist = useMatch('/usergrouplist');
  const statistics = useMatch('/statistics');
  const Home = useMatch('/');

  const clientCreate = useMatch('/singleusercreate');
  const clientRegistration = useMatch('/clientregistration');
  const groupManageList = useMatch('/groupmanageList');
  const kakaoresultlist = useMatch('/kakaoresultlist');

  // console.log('Uploadpage : ', Uploadpage);
  // console.log('Home : ', Home);
  return (
    <>
      <Wrapper>
        <UserContatiner>
          <div style={{ marginBottom: '40px' }}>
            <Logo>
              <Link to={'/home'}>Logo</Link>
            </Logo>
          </div>
          <UserWrap>
            <CompanyComp>소속회사명</CompanyComp>
            <Display>
              <NameComp>김샌드</NameComp>
              <LevelComp>관리자레벨명</LevelComp>
            </Display>
          </UserWrap>
          <FlexWrap>
            <UserButton>마이페이지</UserButton>
            <UserButton>|</UserButton>
            <UserButton>로그아웃</UserButton>
          </FlexWrap>
        </UserContatiner>
        <Accordion
          title="이용현황"
          contents={
            <div>
              <Ul>
                <Link to={'/KakaoResultList'}>
                  {kakaoresultlist ? (
                    <LiBlue>전송결과</LiBlue>
                  ) : (
                    <Li>전송결과</Li>
                  )}
                </Link>
                <Link to={'/statistics'}>
                  {statistics ? <LiBlue>그래프</LiBlue> : <Li>그래프</Li>}
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
                <Link to={'/uploadpage'}>
                  {Uploadpage ? (
                    <LiBlue>고객등록(다건)</LiBlue>
                  ) : (
                    <Li>고객등록(다건)</Li>
                  )}
                </Link>
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
const NameComp = styled.div`
  color: #555;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
`;
const Display = styled.div`
  display: flex;
  align-items: end;
  margin: 10px 0px 20px;
`;
const CompanyComp = styled.div`
  color: rgb(144, 144, 144);
  font-weight: bold;
`;
const LevelComp = styled(CompanyComp)`
  font-size: 12px;
`;
const UserWrap = styled.div`
  margin-left: 30px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  font-size: 14px;
  font-weight: bold;
`;
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
  width: 250px;
  height: 100vh;
  position: fixed;
  /* left: 0%; */
  background-color: #f2f2f2;
  z-index: 1;
`;
const UserContatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserButton = styled.div`
  color: #909090;
  text-decoration: underline;
  cursor: pointer;
  :nth-of-type(2) {
    font-weight: 100;
  }
`;

export default TopNav;
