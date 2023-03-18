import React, { useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post('/api/users/login', data);

      if (response.status === 200) {
        setAlertMessage('Login successful.');
        navigate('/');
      } else {
        setAlertMessage('Login failed.');
      }
    } catch (error) {
      console.error('There was a problem logging in:', error);
      setAlertMessage('Login failed.');
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
