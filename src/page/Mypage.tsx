import React, { useState, useEffect } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';

function Mypage() {
  return (
    <Wrapper>
      <StMyinfo>내 정보</StMyinfo>
      <StBrandName>소속명</StBrandName>
      <StBrandNumber>소속 대표 전화번호</StBrandNumber>
      <StPicName>담당자 이름</StPicName>
      <StPicNumber>담당자 전화번호</StPicNumber>
      <StEmail>아이디(이메일)</StEmail>

      <StEditbutton>정보 수정</StEditbutton>
      <StSubscribeButton>구독 관리</StSubscribeButton>

      <StUserList>사용자 목록</StUserList>
      <div>
        <Stp1>선택</Stp1>
        <Stp2>사용자 권한</Stp2>
        <Stp3>가입일</Stp3>
        <Stp4>사용자 이름</Stp4>
        <Stp5>이메일</Stp5>
        <StBox></StBox>
        <StBox2>
          <input type="checkbox"></input>
        </StBox2>
      </div>
    </Wrapper>
  );
}

export default Mypage;

const StEditbutton = styled.button`
  /* Rectangle 67 */

  box-sizing: border-box;

  position: absolute;
  left: 64.2%;
  right: 23.72%;
  top: 11.26%;
  bottom: 83.16%;

  background: #ededed;
  border: 3px solid #000000;
  border-radius: 40px;
`;
const StSubscribeButton = styled.button`
  /* Rectangle 66 */

  box-sizing: border-box;

  position: absolute;
  left: 77.4%;
  right: 10.52%;
  top: 11.26%;
  bottom: 83.16%;

  background: #ededed;
  border: 3px solid #000000;
  border-radius: 40px;
`;

const StMyinfo = styled.p`
  /* 내 정보 */

  position: absolute;
  left: 19.99%;
  right: 59.53%;
  top: 10.14%;
  bottom: 85.58%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StBrandName = styled.p`
  /* 소속명 */

  position: absolute;
  left: 19.99%;
  right: 59.53%;
  top: 17.86%;
  bottom: 77.86%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StPicName = styled.p`
  /* 담당자 이름 */

  position: absolute;
  left: 20.17%;
  right: 59.34%;
  top: 27.72%;
  bottom: 68%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StBrandNumber = styled.p`
  /* 소속 대표 전화번호 */

  position: absolute;
  left: 47.63%;
  right: 31.88%;
  top: 18.05%;
  bottom: 77.67%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StPicNumber = styled.p`
  /* 담당자 전화번호 */

  position: absolute;
  left: 47.7%;
  right: 31.82%;
  top: 28.65%;
  bottom: 67.07%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StEmail = styled.p`
  /* 아이디 (이메일) */

  position: absolute;
  left: 72.79%;
  right: 6.72%;
  top: 27.72%;
  bottom: 68%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StUserList = styled.p`
  /* 사용자 목록 */

  position: absolute;
  left: 24.6%;
  right: 64.13%;
  top: 47.07%;
  bottom: 49.58%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const StRow = styled.p`
  position: absolute;
  left: 30.64%;
  right: 56.54%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  /* 선택 */

  position: absolute;
  left: 23.72%;
  right: 63.45%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  /* 가입일 */

  position: absolute;
  left: 41.1%;
  right: 47.88%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  /* 사용자 이름 */

  position: absolute;
  left: 56.72%;
  right: 29.2%;
  top: 53.4%;
  bottom: 42.7%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  /* 이메일 */

  position: absolute;
  left: 76.71%;
  right: 9.22%;
  top: 53.4%;
  bottom: 42.7%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const Stp1 = styled.p`
  /* 선택 */

  position: absolute;
  left: 23.72%;
  right: 63.45%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;
const Stp2 = styled.p`
  /* 사용자 권한 */

  position: absolute;
  left: 33.19%;
  right: 58.72%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;
const Stp3 = styled.p`
  /* 가입일 */

  position: absolute;
  left: 44.33%;
  right: 49.63%;
  top: 54.05%;
  bottom: 43.35%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;
const Stp4 = styled.p`
  /* 사용자 이름 */

  position: absolute;
  left: 56.72%;
  right: 29.2%;
  top: 53.4%;
  bottom: 42.7%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;
const Stp5 = styled.p`
  /* 이메일 */

  position: absolute;
  left: 76.71%;
  right: 9.22%;
  top: 53.4%;
  bottom: 42.7%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const StBox = styled.div`
  /* Rectangle 40 */

  position: absolute;
  left: 26.28%;
  right: 6.72%;
  top: 57.95%;
  bottom: 37.02%;

  background: #939393;
  border-radius: 40px;
`;

const StBox2 = styled.div`
  /* Rectangle 39 */

  position: absolute;
  left: 26.28%;
  right: 6.72%;
  top: 65.77%;
  bottom: 29.3%;

  background: #ededed;
  border-radius: 40px;
`;
