import React, { useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getCookie } from '../cookies/cookies';
import jwt_decode from 'jwt-decode';
import { useMutation } from 'react-query';
import { postLogin } from '../axios/api';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutate } = useMutation(postLogin, {
    onSuccess: (data) => {
      console.log(data); //
      alert('로그인 성공.');
      const token = getCookie('userToken'); // 쿠키에서 토큰을 가져옴
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // 토큰을 헤더에 담아서 보내줌

      console.log(token); //
      navigate('/home');
    },
    onError: (error) => {
      console.error(error);
      alert('로그인 실패.');
    },
  });

  const handlelogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      const { response } = await postLogin({ email, password });

      localStorage.setItem('token', response.data.token); // 로컬스토리지에 토큰 저장
      window.location.href = '/home';
    } catch (error) {
      // Handle errors
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alertMessage && <p>{alertMessage}</p>}
        <StEmail>
          <StLogin>Login</StLogin>
          <h1>ID (email)</h1>
          <Stinput
            type="email"
            {...register('email', { required: true })}
            name="email"
            placeholder="sendingo@gmail.com"
          />
        </StEmail>
        <StPw>
          <h1>Password</h1>
          <StPwinput
            type="password"
            {...register('password', { required: true })}
            name="password"
            placeholder="비밀번호는 8~20자리입니다."
          />
        </StPw>
        <StLoginButton type="submit">Log in</StLoginButton>
        <Link to="/signup">계정이 없으신가요? 여기서 가입하세요.</Link>
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
