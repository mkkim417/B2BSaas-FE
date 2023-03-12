import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Accordion from '../components/Accordion'

const TopNav = () => {
  return (
    <>
      <Header>
        <Link to={'/'}>Logo</Link>
      </Header>
      <Wrapper>
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
      </Wrapper>
      {<Outlet />}
    </>
  )
}
const Li = styled.div`
  margin-left: 30px;
  padding: 10px 0px;
`
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
`
const Wrapper = styled.div`
  padding-top: 80px;
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: black;
`
export default TopNav
