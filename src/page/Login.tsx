import React, { useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { setCookie } from '../util/cookie';
import jwt_decode from 'jwt-decode';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post(
        `https://dev.sendingo-be.store/api/users/login`,
        data
      );
      console.log(response);
      let token = response.data.token;
      setCookie('accessToken', token); // 쿠키에저장
      const decodedUserInfo = jwt_decode(token);
      console.log('decode', decodedUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));
      alert('로그인완료');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('다시 시도해주시기 바랍니다.');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleLogin)}>
        {alertMessage && <p>{alertMessage}</p>}
        <StEmail>
          <StLogin>로그인</StLogin>
          <h1>아이디(이메일)</h1>
          <Stinput
            type="email"
            {...register('email', { required: true })}
            name="email"
            placeholder="sendingo@gmail.com"
          />
        </StEmail>
        <StPw>
          <h1>비밀번호</h1>
          <StPwinput
            type="password"
            {...register('password', { required: true })}
            name="password"
            placeholder="암호는 대문자 1자리 이상 포함 영문, 숫자 포함 8~20 자리"
          />
        </StPw>
        <StLoginButton type="submit">로그인</StLoginButton>
        <Link to="/signup">계정이 없으신가요? 여기서 회원가입 하세요</Link>
      </form>
    </Wrapper>
  );
}

export default Login;

const StEmail = styled.div`
  margin: 10px;
`;

const StLogin = styled.h1`
  margin: 20px;
`;

const Stinput = styled.input`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StPw = styled.div`
  margin: 10px;
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
  width: 80px;
  height: 30px;
`;
