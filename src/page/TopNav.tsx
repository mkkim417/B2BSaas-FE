import React from 'react';
import { Outlet } from 'react-router';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../components/Accordion';
import { Logo } from '../components/Header';
import { handleLogout, isLoggedin } from '../util/cookie';
import ListIcon from '../asset/svg/ListIcon';
import KakaoIcon from '../asset/svg/KakaoIcon';
import ListResultIcon from '../asset/svg/ListResultIcon';
import GroupMangeListIcon from '../asset/svg/GroupMangeListIcon';
import CustomerAddIcon from '../asset/svg/CustomerAddIcon';

const TopNav = () => {
  const Uploadpage = useMatch('/uploadpage');
  const usergrouplist = useMatch('/usergrouplist');
  const statistics = useMatch('/statistics');
  const Home = useMatch('/');

  const isLoggedIn = isLoggedin();

  const clientCreate = useMatch('/singleusercreate');
  const clientRegistration = useMatch('/clientregistration');
  const groupManageList = useMatch('/groupmanageList');
  const kakaoresultlist = useMatch('/kakaoresultlist');
  const readyalarmtalk = useMatch('/readyalarmtalk');

  // console.log('Uploadpage : ', Uploadpage);
  // console.log('Home : ', Home);
  return (
    <>
      <Wrapper>
        <UserContatiner>
          <div style={{ marginBottom: '40px' }}>
            <Logo>
              <Link to={'/'}>Logo</Link>
            </Logo>
          </div>
          <UserWrap>
            <Box width="35px" height="35px" />
            <div>
              <div>소속회사명</div>
              <Username>김샌드</Username>
            </div>
          </UserWrap>
          <ul>
            <Li>
              <NavLink to={'/statistics'}>
                {statistics ? (
                  <>
                    <ListIcon width={'35px'} heigth={'35px'} fill={'#14b769'} />
                    <LiBlue>이용현황</LiBlue>
                  </>
                ) : (
                  <>
                    <ListIcon width={'35px'} heigth={'35px'} />
                    <NotLiBlue>이용현황</NotLiBlue>
                  </>
                )}
              </NavLink>
            </Li>
            <Li>
              <NavLink to={'/readyalarmtalk'}>
                {readyalarmtalk ? (
                  <>
                    <KakaoIcon
                      width={'35px'}
                      heigth={'35px'}
                      fill={'#14b769'}
                    />
                    <LiBlue>알림톡전송</LiBlue>
                  </>
                ) : (
                  <>
                    <KakaoIcon width={'35px'} heigth={'35px'} />
                    <NotLiBlue>알림톡전송</NotLiBlue>
                  </>
                )}
              </NavLink>
            </Li>
            <Li>
              <NavLink to={'/kakaoresultlist'}>
                {kakaoresultlist ? (
                  <>
                    <ListResultIcon
                      width={'35px'}
                      heigth={'35px'}
                      fill={'#14b769'}
                    />
                    <LiBlue>전송결과조회</LiBlue>
                  </>
                ) : (
                  <>
                    <ListResultIcon width={'35px'} heigth={'35px'} />
                    <NotLiBlue>전송결과조회</NotLiBlue>
                  </>
                )}
              </NavLink>
            </Li>
            <Li>
              <NavLink to={'/groupManageList'}>
                {groupManageList ? (
                  <>
                    <GroupMangeListIcon
                      width={'35px'}
                      heigth={'35px'}
                      fill={'#14b769'}
                    />
                    <LiBlue>고객관리</LiBlue>
                  </>
                ) : (
                  <>
                    <GroupMangeListIcon width={'35px'} heigth={'35px'} />
                    <NotLiBlue>고객관리</NotLiBlue>
                  </>
                )}
              </NavLink>
            </Li>
            <Li>
              <NavLink to={'/uploadpage'}>
                {Uploadpage ? (
                  <>
                    <CustomerAddIcon
                      width={'35px'}
                      heigth={'35px'}
                      fill={'#14b769'}
                    />
                    <LiBlue>고객등록</LiBlue>
                  </>
                ) : (
                  <>
                    <CustomerAddIcon width={'35px'} heigth={'35px'} />
                    <NotLiBlue>고객등록</NotLiBlue>
                  </>
                )}
              </NavLink>
            </Li>
          </ul>
          <FlexWrap>
            {isLoggedIn ? (
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
            ) : null}
          </FlexWrap>
        </UserContatiner>

        {/* <Accordion
          title="이용현황"
          contents={
            <div>
              <Ul>
                <Link to={'/statistics'}>
                  {statistics ? <LiBlue>그래프</LiBlue> : <Li>그래프</Li>}
                </Link>
              </Ul>
            </div>
          }
        />
        <Accordion
          title="알림톡전송"
          contents={
            <div>
              <Ul>
                <Link to={'/readyalarmtalk'}>
                  {readyalarmtalk ? (
                    <LiBlue>알림톡전송</LiBlue>
                  ) : (
                    <Li>알림톡전송</Li>
                  )}
                </Link>
                <Link to={'/kakaoresultlist'}>
                  {kakaoresultlist ? (
                    <LiBlue>전송결과</LiBlue>
                  ) : (
                    <Li>전송결과</Li>
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
                </Link>
              </Ul>
            </div>
          }
        />
        <Link to={'/uploadpage'}>
          <Accordion title="대량발송" />
        </Link> */}
      </Wrapper>
      {<Outlet />}
    </>
  );
};
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
`;
const Li = styled.li`
  margin: 30px 40px;
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
const Flex = styled.div<{
  flexDirection?: string;
}>`
  align-items: center;
  display: flex;
  margin-top: 10px;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'initial'};
`;
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
  display: flex;
  margin: 30px 40px;
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
const NotLiBlue = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;
const LiBlue = styled(NotLiBlue)`
  margin-left: 10px;
  color: #14b769;
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
  width: 280px;
  height: 100vh;
  position: fixed;
  /* left: 0%; */
  background-color: #f8f8f8;
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

export default React.memo(TopNav);
