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
      alert(response.data.message);
      const token = response.token;
      setCookie('userToken', token);
      navigate(-1);
    },
    onError: async (error: any) => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  return (
    <LoginWrapper>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        {alertMessage && <p>{alertMessage}</p>}
        <StEmail>
          <StLogin>로그인</StLogin>
          <Sth1>이메일ID</Sth1>
          <Stinput
            type="email"
            {...register('email', { required: true })}
            name="email"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <StErrorMsg>
              {errors.email.message || '이메일을 입력해주세요'}
            </StErrorMsg>
          )}
        </StEmail>
        <StPw>
          <Sth1>비밀번호</Sth1>
          <StPwinput
            type="password"
            {...register('password', { required: true })}
            name="password"
            placeholder="비밀번호를 입력해주세요."
          />
          {errors.password && (
            <StErrorMsg>
              {errors.password.message || '비밀번호를 입력해주세요'}
            </StErrorMsg>
          )}
        </StPw>
        <StLoginButton type="submit">로그인</StLoginButton>
      </StForm>
      <Stsignup>
        <Link to="/signup">
          계정이 없으신가요? 여기서 <Stspan>회원가입</Stspan>하세요.
        </Link>
      </Stsignup>
    </LoginWrapper>
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
  margin: 40px 0 40px 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
`;

const Stinput = styled.input`
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  padding: 15px 0 15px 20px;
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
  display: block;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  padding: 15px 0 15px 20px;
`;

const StLoginButton = styled.button`
  background: #14b769;
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 60px 40px 40px 40px;
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
  justify-content: center;
  /* border: 1px solid black; */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Stsignup = styled.div`
  margin-top: 30px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #909090;
`;

const Sth1 = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #909090;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Inter';
  font-style: normal;
`;

const Stspan = styled.span`
  text-decoration: underline;
`;
