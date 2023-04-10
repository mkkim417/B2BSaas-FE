import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedin } from '../util/cookie';
import ListIcon from '../asset/svg/ListIcon';
import KakaoIcon from '../asset/svg/KakaoIcon';
import ListResultIcon from '../asset/svg/ListResultIcon';
import GroupMangeListIcon from '../asset/svg/GroupMangeListIcon';
import CustomerAddIcon from '../asset/svg/CustomerAddIcon';
import { motion } from 'framer-motion';

const TopNav = () => {
  const statistics = useMatch('/statistics');
  const isLoggedIn = isLoggedin();
  const clientRegistration = useMatch('/clientregistration');
  const groupManageList = useMatch('/groupmanageList');
  const alarmtalk = useMatch('/alarmtalk');
  const kakaoresultlist = useMatch('/kakaoresultlist');
  const readyalarmtalk = useMatch('/readyalarmtalk');

  // console.log('Uploadpage : ', Uploadpage);
  // console.log('Home : ', Home);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuBoolean, setMenuBoolean] = useState(false);
  const [isMenuData, setMenuData] = useState<string[]>([]);
  const [isMenuLink, setMenuLink] = useState<string[]>([]);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };
  function sideMenuBar(test: string[], link: string[]) {
    return (
      <FixedWrap
        animate={isMenuBoolean ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {test.map((el, idx) => (
          <>
            <li>
              <LinkComp
                to={`${link[idx]}`}
                onClick={() => setMenuBoolean((prev) => !prev)}
              >
                {el}
              </LinkComp>
            </li>
          </>
        ))}
      </FixedWrap>
    );
  }
  return (
    <TotalWrapper>
      {sideMenuBar(isMenuData, isMenuLink)}
      <Wrapper>
        <UserContatiner>
          <ul style={{ marginTop: '60px' }}>
            <Li>
              <InLi
                active={statistics ? true : false}
                onClick={() => {
                  setMenuOpen((menuOpen) => !menuOpen);
                  setMenuBoolean((prev) => !prev);
                  if (isMenuBoolean === false) {
                    setMenuData(['통계분석']);
                    setMenuLink(['/statistics']);
                  }
                }}
              >
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
                    </>
                  ) : (
                    <>
                      <ListIcon width={'25px'} heigth={'25px'} />
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi
                active={readyalarmtalk ? true : false}
                onClick={() => {
                  setMenuOpen((menuOpen) => !menuOpen);
                  setMenuBoolean((prev) => !prev);
                  if (isMenuBoolean === false) {
                    setMenuData(['알림톡전송']);
                    setMenuLink(['/readyalarmtalk']);
                  }
                }}
              >
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
                    </>
                  ) : (
                    <>
                      <KakaoIcon width={'25px'} heigth={'25px'} />
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi
                active={kakaoresultlist ? true : false}
                onClick={() => {
                  setMenuOpen((menuOpen) => !menuOpen);
                  setMenuBoolean((prev) => !prev);
                  if (isMenuBoolean === false) {
                    setMenuData(['전송결과조회']);
                    setMenuLink(['/kakaoresultlist']);
                  }
                }}
              >
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
                    </>
                  ) : (
                    <>
                      <ListResultIcon width={'25px'} heigth={'25px'} />
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi
                active={groupManageList ? true : false}
                onClick={() => {
                  setMenuOpen((menuOpen) => !menuOpen);
                  setMenuBoolean((prev) => !prev);
                  if (isMenuBoolean === false) {
                    setMenuData(['그룹관리']);
                    setMenuLink(['/groupManageList']);
                  }
                }}
              >
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
                    </>
                  ) : (
                    <>
                      <GroupMangeListIcon width={'25px'} heigth={'25px'} />
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
            <Li>
              <InLi
                active={clientRegistration ? true : false}
                onClick={() => {
                  setMenuOpen((menuOpen) => !menuOpen);
                  setMenuBoolean((prev) => !prev);
                  if (isMenuBoolean === false) {
                    setMenuData(['고객등록']);
                    setMenuLink(['/clientregistration']);
                  }
                }}
              >
                <NavLink to={'/clientregistration'}>
                  {clientRegistration ? (
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
                    </>
                  ) : (
                    <>
                      <CustomerAddIcon width={'25px'} heigth={'25px'} />
                    </>
                  )}
                </NavLink>
              </InLi>
            </Li>
          </ul>
          <FlexWrap></FlexWrap>
        </UserContatiner>
        {/* <Accordion
          title="이용현황"
          contents={
            <div>
              <Ul>
                <Link to={'/statistics'}>
                  
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
                    
                  ) : (
                    <Li>알림톡전송</Li>
                  )}
                </Link>
                <Link to={'/kakaoresultlist'}>
                  {kakaoresultlist ? (
                    
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
                    
                  ) : (
                    <Li>고객등록(다건)</Li>
                  )}
                </Link>
                <Link to={'/clientRegistration'}>
                  {clientRegistration ? (
                    
                  ) : (
                    <Li>고객등록</Li>
                  )}
                </Link>
                <Link to={'/groupmanageList'}>
                  {groupManageList ? (
                    
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
    </TotalWrapper>
  );
};
const LinkComp = styled(Link)``;
const FixedWrap = styled(motion.ul)`
  /* display: none; */
  position: fixed;
  left: 0;
  z-index: 0;
  margin-top: 30px;
  padding-top: 60px;
  padding-left: 66px;
  height: 100vh;
  background: #fff;
  width: 200px;
  border-right: 1px solid #bdbdbd;
  > li {
    margin-bottom: 15px;
    margin-left: 20px;
    font-weight: bold;
    list-style: auto;
    font-family: 'Inter';
    font-size: 14px;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: 1;
  border-radius: 8px;
  bottom: 16px;
  left: 16px;
  right: 0px;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  color: #fff;
  font-size: 7px;
`;
const InLi = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? 'black' : null)};
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
`;
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

//   font-family: 'Inter', sans-serif;
//   font-weight: bold;
//   font-size: 16px;
//   margin-left: 10px;
// `;

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
  width: 55px;
  border-right: 2px solid #000;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0%;
  z-index: 1;
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
  /* background-color: aquamarine; */
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
