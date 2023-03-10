import React from 'react'
import styled from 'styled-components'
import Accordion from '../components/Accordion'

function TopNav() {
  return (
    <>
      <Header></Header>
      <Wrapper>
        <Accordion
          title="항해99"
          contents={
            <div>
              <ul>
                <li>아코디언1</li>
                <li>아코디언2</li>
                <li>아코디언3</li>
              </ul>
            </div>
          }
        />
        <Accordion
          title="다이렉트메시지"
          contents={
            <div>
              <ul>
                <li>아코디언1</li>
                <li>아코디언2</li>
                <li>아코디언3</li>
              </ul>
            </div>
          }
        />
        <Accordion
          title="글쎄요"
          contents={
            <div>
              <ul>
                <li>아코디언1</li>
                <li>아코디언2</li>
                <li>아코디언3</li>
              </ul>
            </div>
          }
        />
      </Wrapper>
    </>
  )
}
const Header = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: blueviolet;
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
