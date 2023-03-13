import React from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <StEmail>
        <p>아이디(이메일)</p>
        <Stinput type="email" name="email" placeholder="sendingo@gmail.com" />
      </StEmail>
      <StPw>
        <h1>비밀번호</h1>
        <StPwinput
          type="password"
          name="password"
          placeholder="영문, 숫자 포함 총 8자리"
        />
      </StPw>

      <StLoginButton onClick={() => navigate('/')}>로그인</StLoginButton>
    </Wrapper>
  );
}

export default Login;

const StEmail = styled.div`
  border: 2px solid;
`;
const Stinput = styled.input`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StPw = styled.div`
  border: 2px solid;
`;

const StPwinput = styled.input`
  background: #d3d3d3;
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StLoginButton = styled.button`
  background: #d3d3d3;
  border-radius: 40px;
  width: 100px;
  height: 50px;
`;
