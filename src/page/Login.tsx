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
      <StForm onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && (
            <StErrorMsg>
              {errors.email.message || '이메일을 입력해주세요'}
            </StErrorMsg>
          )}
        </StEmail>
        <StPw>
          <h1>비밀번호</h1>
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
        <Stsignup>
          <Link to="/signup">계정이 없으신가요? 여기서 가입하세요.</Link>
        </Stsignup>
      </StForm>
    </Wrapper>
  );
}

export default Login;

const StEmail = styled.div`
  margin: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const StLogin = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const Stinput = styled.input`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 8px;
  width: 350px;
  margin: 10px auto;
`;

const StPw = styled.div`
  margin: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const StPwinput = styled.input`
  background: #d3d3d3;
  border-radius: 8px;
  width: 350px;
  margin: 10px auto;
`;

const StLoginButton = styled.button`
  background: #14b769;
  border-radius: 8px;
  width: 350px;
  height: 30px;
  margin: 10px auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;

const StErrorMsg = styled.span`
  color: red;
  /* visibility: hidden; */
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Stsignup = styled.div`
  margin: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;
