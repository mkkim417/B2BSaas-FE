import React, { useEffect, useState } from 'react';
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
import useInput from '../hook/useInput';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [isEmail, onChangeEmail] = useInput();
  const [isPw, onChangePw] = useInput();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const token = getCookie('userToken');

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

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };
  console.log(isEmail, isPw);
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
            value={isEmail}
            onChange={onChangeEmail}
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
            value={isPw}
            onChange={onChangePw}
          />
          {errors.password && (
            <StErrorMsg>
              {errors.password.message || '비밀번호를 입력해주세요'}
            </StErrorMsg>
          )}
        </StPw>
        {isEmail.length > 0 && isPw.length > 0 ? (
          <StLoginButton disable={false} type="submit">
            로그인
          </StLoginButton>
        ) : (
          <StLoginButton2 disable={true} type="submit">
            로그인
          </StLoginButton2>
        )}
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
  display: flex;
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

const StLoginButton = styled.button<{ disable?: boolean }>`
  background: ${(props) => (props.disable === true ? '#eee' : '#14b769')};
  color: ${(props) => (props.disable === true ? '#bdbdbd' : '#fff')};
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 60px 40px 40px 40px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;
const StLoginButton2 = styled(StLoginButton)``;

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
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
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
