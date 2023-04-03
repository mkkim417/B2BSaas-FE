import React, { useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useMutation } from 'react-query';
import { postLogin } from '../axios/api';
import { getCookie, setCookie } from '../util/cookie';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const token = getCookie('userToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }


  const { mutate } = useMutation(postLogin, {
    onSuccess: (response) => {
      alert('로그인 성공.');
      const token = response.token;
      console.log(jwt_decode(token));
      setCookie('userToken', token);

      navigate(-1);
    },
    onError: (error) => {
      console.error(error);
      alert('로그인 실패.');
    },
  });

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
          {errors.email && (
            <StErrorMsg>
              {errors.email.message || '이메일을 입력해주세요'}
            </StErrorMsg>
          )}
        </StEmail>
        <StPw>
          <h1>Password</h1>
          <StPwinput
            type="password"
            {...register('password', { required: true })}
            name="password"
            placeholder="비밀번호는 8~20자리입니다."
          />
          {errors.password && (
            <StErrorMsg>
              {errors.password.message || '비밀번호를 입력해주세요'}
            </StErrorMsg>
          )}
        </StPw>
        <StLoginButton type="submit">로그인</StLoginButton>
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

const StErrorMsg = styled.span`
  color: red;
  /* visibility: hidden; */
`;
