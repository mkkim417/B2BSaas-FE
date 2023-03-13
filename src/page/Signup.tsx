import React, { useRef } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
  confirmPw: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const password = useRef();
  password.current = watch('password');
  const confirmPw = useRef();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  console.log(watch('email'));

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <StEmail>
        <p>이메일</p>
        <Stinput
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          name="email"
        />
        {errors.email && 'email is required'}

        <button>중복확인</button>
      </StEmail>
      <StBrand>
        <h1>소속명</h1>
        <StBrandinput
          type="text"
          {...register('BrandName', {
            required: true,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          placeholder="브랜드(기업)명을 입력하세요"
          name="BrandName"
        />
        {errors.BrandName && 'Brandname is required'}
        <button>중복확인</button>
        <StBrandInfo>
          <StBrandInputWrapper>
            <h1>담당자 이름</h1>
            <StBrandinput
              type="text"
              name="PicName"
              placeholder="담당자를 입력하세요"
            />
          </StBrandInputWrapper>
          <StBrandInputWrapper>
            <h1>담당자 전화번호</h1>
            <StBrandinput
              type="text"
              name="ContactNumber"
              placeholder="담당자 전화번호"
            />
          </StBrandInputWrapper>
        </StBrandInfo>
      </StBrand>
      <StPw>
        <h1>비밀번호</h1>
        <StPwinput
          type="password"
          {...register('password', { required: true, minLength: 4 })}
          name="password"
          placeholder="영문, 숫자 포함 총 8자리"
        />
        {errors.password &&
          errors.password.type === 'required' &&
          'this field is required'}
        {errors.password &&
          errors.password.type === 'minLength' &&
          'your password must contain at least 4 characters'}
        <h1>비밀번호 확인</h1>
        <StPwinput
          type="password"
          {...register('confirmPw', {
            required: true,
            validate: (value) => value === confirmPw.current,
          })}
          name="confirmPw"
          placeholder="영문, 숫자 포함 총 8자리"
        />
        {errors.confirmPw &&
          errors.confirmPw.type === 'required' &&
          'this field is required'}
        {errors.confirmPw &&
          errors.confirmPw.type === 'validate' &&
          'The passwords do not matched'}
      </StPw>
      <StSignupButton type="submit" onClick={() => navigate('/login')}>
        회원가입
      </StSignupButton>
    </Wrapper>
  );
};

export default Signup;

const StEmail = styled.div`
  border: 2px solid;
`;

const Stinput = styled.input`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StBrand = styled.div`
  border: 2px solid;
  text-align: center;
  width: 600px;
`;

const StBrandinput = styled.input`
  background: #d3d3d3;
  border-radius: 40px;
  margin-right: 20px;
`;

const StBrandInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const StBrandInputWrapper = styled.div`
  margin: 10px;
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

const StSignupButton = styled.button`
  background: #d3d3d3;
  border-radius: 40px;
  width: 100px;
  height: 50px;
`;
