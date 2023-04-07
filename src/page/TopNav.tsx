import React, { useState } from 'react';
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
import { motion } from 'framer-motion';

const TopNav = () => {
  const Uploadpage = useMatch('/uploadpage');
  const usergrouplist = useMatch('/usergrouplist');
  const statistics = useMatch('/statistics');
  const Home = useMatch('/');

  const isLoggedIn = isLoggedin();

  const clientCreate = useMatch('/singleusercreate');
  const clientRegistration = useMatch('/clientregistration');
  const groupManageList = useMatch('/groupmanageList');
  const alarmtalk = useMatch('/alarmtalk');
  const kakaoresultlist = useMatch('/kakaoresultlist');
  const readyalarmtalk = useMatch('/readyalarmtalk');

  // console.log('Uploadpage : ', Uploadpage);
  // console.log('Home : ', Home);
  const [ menuOpen, setMenuOpen ] = useState(false);
  return (
    <TotalWrapper>
      <Wrapper>
        <UserContatiner>
          <ul style={{ marginTop: '60px' }}>
            <Li>
              <InLi 
                active={statistics ? true : false}
                onClick={() => {setMenuOpen(menuOpen => !menuOpen)}}>
                <NavLink to={'/statistics'}>
                  {statistics ? (
                    <>
                      <ListIcon width={'25px'} heigth={'25px'} fill={'#fff'} />
                      <Circle
                        animate={{
                          backgroundColor: ['lime'],
                        }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>이용현황</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <ListIcon width={'25px'} heigth={'25px'} />
                      {/* <NotLiBlue>이용현황</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi active={readyalarmtalk ? true : false}
                onClick={() => {setMenuOpen(menuOpen => !menuOpen)}}>
                <NavLink to={'/readyalarmtalk'}>
                  {readyalarmtalk ? (
                    <>
                      <KakaoIcon width={'25px'} heigth={'25px'} fill={'#fff'} />
                      <Circle
                        animate={{
                          backgroundColor: ['lime'],
                        }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>알림톡전송</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <KakaoIcon width={'25px'} heigth={'25px'} />
                      {/* <NotLiBlue>알림톡전송</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi active={kakaoresultlist ? true : false}
                onClick={() => {setMenuOpen(menuOpen => !menuOpen)}}>
                <NavLink to={'/kakaoresultlist'}>
                  {kakaoresultlist ? (
                    <>
                      <ListResultIcon
                        width={'25px'}
                        heigth={'25px'}
                        fill={'#fff'}
                      />
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>전송결과조회</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <ListResultIcon width={'25px'} heigth={'25px'} />
                      {/* <NotLiBlue>전송결과조회</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi active={groupManageList ? true : false}
                onClick={() => {setMenuOpen(menuOpen => !menuOpen)}}>
                <NavLink to={'/groupManageList'}>
                  {groupManageList ? (
                    <>
                      <GroupMangeListIcon
                        width={'25px'}
                        heigth={'25px'}
                        fill={'#fff'}
                      />
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>고객관리</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <GroupMangeListIcon width={'25px'} heigth={'25px'} />
                      {/* <NotLiBlue>고객관리</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi active={Uploadpage ? true : false}
                onClick={() => {setMenuOpen(menuOpen => !menuOpen)}}>
                <NavLink to={'/uploadpage'}>
                  {Uploadpage ? (
                    <>
                      <CustomerAddIcon
                        width={'25px'}
                        heigth={'25px'}
                        fill={'#fff'}
                      />
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>고객등록</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <CustomerAddIcon width={'25px'} heigth={'25px'} />
                      {/* <NotLiBlue>고객등록</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
          </ul>
          <FlexWrap>
            {/* {isLoggedIn ? (
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
            ) : (
              <Link to="/login">
                <UserButton>로그인</UserButton>
              </Link>
            )} */}
          </FlexWrap>
        </UserContatiner>

        {/* <Accordion
          title="이용현황"
          contents={
            <div>
              <Ul>
                <Link to={'/statistics'}>
                  // {statistics ? <LiBlue>그래프</LiBlue> : <Li>그래프</Li>}
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
                    // <LiBlue>알림톡전송</LiBlue>
                  ) : (
                    <Li>알림톡전송</Li>
                  )}
                </Link>
                <Link to={'/kakaoresultlist'}>
                  {kakaoresultlist ? (
                    // <LiBlue>전송결과</LiBlue>
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
                    // <LiBlue>고객등록(다건)</LiBlue>
                  ) : (
                    <Li>고객등록(다건)</Li>
                  )}
                </Link>
                <Link to={'/clientRegistration'}>
                  {clientRegistration ? (
                    // <LiBlue>고객등록</LiBlue>
                  ) : (
                    <Li>고객등록</Li>
                  )}
                </Link>
                <Link to={'/groupmanageList'}>
                  {groupManageList ? (
                    // <LiBlue>그룹관리</LiBlue>
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
      { menuOpen ? (
      <SlideWrapper>
      <UserContatiner>
          <ul style={{ marginTop: '60px' }}>
            <Li>
              <Test active={statistics ? true : false}>
                <NavLink to={'/statistics'}>
                  {statistics ? (
                    <>
                      <div>통계와 그래프</div>
                      {/* <ListIcon width={'25px'} heigth={'25px'} fill={'#fff'} /> */}
                      <Circle
                        animate={{
                          backgroundColor: ['lime'],
                        }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>이용현황</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <div>통계와 그래프</div>
                      {/* <ListIcon width={'25px'} heigth={'25px'} /> */}
                      {/* <NotLiBlue>이용현황</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </Test>
            </Li>
            <Li>
              <Test active={readyalarmtalk ? true : false}>
                <NavLink to={'/readyalarmtalk'}>
                  {readyalarmtalk ? (
                    <>
                      <div>알림톡전송</div>
                      {/* <KakaoIcon width={'25px'} heigth={'25px'} fill={'#fff'} /> */}
                      <Circle
                        animate={{
                          backgroundColor: ['lime'],
                        }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>알림톡전송</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <div>알림톡전송</div>
                      {/* <KakaoIcon width={'25px'} heigth={'25px'} /> */}
                      {/* <NotLiBlue>알림톡전송</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </Test>
            </Li>
            <Li>
              <Test active={kakaoresultlist ? true : false}>
                <NavLink to={'/kakaoresultlist'}>
                  {kakaoresultlist ? (
                    <>
                      <div>전송결과조회</div>
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>전송결과조회</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <div>전송결과조회</div>
                      {/* <ListResultIcon width={'25px'} heigth={'25px'} /> */}
                      {/* <NotLiBlue>전송결과조회</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </Test>
            </Li>
            <Li>
              <Test active={groupManageList ? true : false}>
                <NavLink to={'/groupManageList'}>
                  {groupManageList ? (
                    <>
                      <div>고객관리</div>
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>고객관리</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <div>고객관리</div>
                      {/* <GroupMangeListIcon width={'25px'} heigth={'25px'} /> */}
                      {/* <NotLiBlue>고객관리</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </Test>
            </Li>
            <Li>
              <Test active={Uploadpage ? true : false}>
                <NavLink to={'/uploadpage'}>
                  {Uploadpage ? (
                    <>
                      <div>고객등록</div>
                      {/* <CustomerAddIcon width={'25px'} heigth={'25px'} fill={'#fff'} /> */}
                      <Circle
                        animate={{ backgroundColor: ['lime'] }}
                        layoutId="circle"
                      />
                      {/* <LiBlue>고객등록</LiBlue> */}
                    </>
                  ) : (
                    <>
                      <div>고객등록</div>
                      {/* <CustomerAddIcon width={'25px'} heigth={'25px'} /> */}
                      {/* <NotLiBlue>고객등록</NotLiBlue> */}
                    </>
                  )}
                </NavLink>
              </Test>
            </Li>
          </ul>
          <FlexWrap>
            {/* {isLoggedIn ? (
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
            ) : (
              <Link to="/login">
                <UserButton>로그인</UserButton>
              </Link>
            )} */}
          </FlexWrap>
        </UserContatiner>
      </SlideWrapper>) : null}
      {<Outlet />}
    </TotalWrapper>
  );
};
const Circle = styled(motion.span)`
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: 1;
  border-radius: 8px;
  bottom: 23px;
  left: 21px;
  right: 0px;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const InLi = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? 'black' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 15px;
  transition: 0.3s;
`;

const Test = styled.div<{ active?: boolean }>`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 45px;
  box-shadow: 0px 0px 10px ${(props) => (props.active ? '#14B869' : '')};
  border-radius: 15px;
  transition: 0.3s;
`
const Li = styled.li<{ active?: boolean }>`
  height: 50px;
  margin: 30px 0px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${(props) => (props.active ? 'palegreen' : null)};
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
// const NotLiBlue = styled.div`
//   font-family: 'Inter', sans-serif;
//   font-weight: bold;
//   font-size: 16px;
//   margin-left: 10px;
// `;
// const LiBlue = styled(NotLiBlue)`
//   margin-left: 10px;
//   color: #14b769;
// `;
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
  width: 80px;
  border-right: 1px solid #bdbdbd;
  height: 100vh;
  position: fixed;
  top: 0%;
  z-index: 1;
  /* background-color: red; */
`;
const SlideWrapper = styled.div`
  width: 200px;
  border-right: 1px solid #bdbdbd;
  height: 100vh;
  position: absolute;
  left: 80px;
  top: 0%;
  z-index: 1;
  background-color: white;
  transition: 2s;
`;
const TotalWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: fi;
  /* background-color: aquamarine; */
`
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
