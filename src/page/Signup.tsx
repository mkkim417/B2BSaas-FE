import React, { useRef, useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';

interface FormValues {
  Email: string;
  Password: string;
  ConfirmPw: string;
  BrandName: string;
  BrandNumber: string;
  PicName: string;
  PicNumber: string;
}

type StInputProps = {
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const handleSignup: SubmitHandler<FormValues> = (data) => {
    if (!isValid) {
      setAlertMessage('Please fill in all fields.');
      return;
    }

    const formValues = Object.values(data);
    const isFormEmpty = formValues.every((value) => value === '');

    if (isFormEmpty) {
      setAlertMessage('Please fill in all fields.');
      return;
    }

    console.log(data);
    localStorage.setItem('email', data.Email);
    localStorage.setItem('Password', data.Password);
    setIsSubmitted(true);
    setAlertMessage('Your registration is complete.');
    navigate('/login');
  };

  const Password = useRef<string>();
  Password.current = watch('Password');
  const ConfirmPw = useRef<string>();
  ConfirmPw.current = watch('ConfirmPw');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!isValid) {
      setAlertMessage('모든 영역을 기입하여 주십시오.');
      return;
    }

    const formValues = Object.values(data);
    const isFormEmpty = formValues.every((value) => value === '');

    if (isFormEmpty) {
      setAlertMessage('모든 영역을 기입하여 주십시오.');
      return;
    }

    console.log(data);
    localStorage.setItem('email', data.Email);
    localStorage.setItem('Password', data.Password);
    setIsSubmitted(true);
    setAlertMessage('회원 가입이 완료되었습니다.');
  };

  const EmailValidation: Validate<string, FormValues> = (value) => {
    const EmailRegex = /^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (EmailRegex.test(value)) {
      return true;
    } else {
      return '올바른 이메일 형식이 아닙니다.';
    }
  };

  const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{10,})/;

  const PhoneNumberValidation: Validate<string, FormValues> = (
    value,
    values
  ) => {
    const PhoneRegex = /^[0-9-]*$/;
    const isValid = PhoneRegex.test(value.toString());

    if (isValid) {
      return true;
    } else {
      return '숫자와 -(하이픈)만 입력하여 주십시오.';
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleSignup)}>
      {isSubmitted && <p>Your subscription has been completed.</p>}
      {alertMessage && <p>{alertMessage}</p>}
      <StEmail>
        <StEmailP>이메일</StEmailP>
        <Stinput
          type="email"
          {...register('Email', {
            required: true,
            validate: EmailValidation,
          })}
          name="Email"
          required
        />
        {errors.Email && (
          <StErrorMsg>
            {errors.Email.message || 'Please enter your e-mail.'}
          </StErrorMsg>
        )}
        <StEmailCheckButton>중복확인</StEmailCheckButton>
      </StEmail>

      <StBrand>
        <StBrandP>소속명</StBrandP>
        <StBrandCheckButton>중복확인</StBrandCheckButton>
        <StBrandInput
          type="text"
          {...register('BrandName', {
            required: true,
            pattern: /^[A-Za-z0-9\s]+$/i,
          })}
          name="BrandName"
          required
          placeholder="브랜드(기업)명을 입력해주세요"
        />
        {errors.BrandName && (
          <StErrorMsg>
            {errors.BrandName.message || '브랜드(기업)명을 입력해주세요'}
          </StErrorMsg>
        )}
        <StBrandNumberP>소속대표전화</StBrandNumberP>
        <StBrandNumberInput
          type="text"
          placeholder="대표 번호를 입력해주세요"
          {...register('BrandNumber', {
            required: true,
            validate: PhoneNumberValidation,
          })}
          name="BrandNumber"
          required
          hasError={!!errors.BrandNumber}
        />
        {errors.BrandNumber && (
          <StErrorMsg>
            {errors.BrandNumber.message || '대표 번호가 필요합니다'}
          </StErrorMsg>
        )}
        <StEmailCheckButton>중복확인</StEmailCheckButton>
      </StBrand>

      <StPicInfo>
        <h1>담당자 이름</h1>
        <StBrandInput
          type="text"
          {...register('PicName', {
            required: true,
          })}
          name="PicName"
          placeholder="담당자를 입력해주세요"
          required
        />
        {errors.PicName && (
          <StErrorMsg>
            {errors.PicName.message || '담당자 이름이 필요합니다'}
          </StErrorMsg>
        )}

        <StContectNumberInputWrapper>
          <h1>담당자 번호</h1>
          <StBrandInput
            type="text"
            placeholder="담당자 번호를 입력해주세요"
            {...register('PicNumber', {
              required: true,
              validate: PhoneNumberValidation,
            })}
            name="PicNumber"
            required
            hasError={!!errors.PicNumber}
          />
          {errors.PicNumber && (
            <StErrorMsg>
              {errors.PicNumber.message || '담당자 번호를 입력해주세요'}
            </StErrorMsg>
          )}
        </StContectNumberInputWrapper>
      </StPicInfo>

      <StPw>
        <StPwP>비밀번호</StPwP>
        <StPwinput
          type="password"
          {...register('Password', {
            required: true,
            pattern: PasswordRegex,
          })}
          name="Password"
          placeholder="영문, 숫자를 포함한 10글자를 입력해주세요"
          required
        />
        {errors.Password && (
          <StErrorMsg>
            {errors.Password.message ||
              '암호는 영문, 숫자를 포함하여 총 10자리가 되어야 합니다'}
          </StErrorMsg>
        )}
        <StPwP>비밀번호 확인</StPwP>
        <StPwinput
          type="password"
          {...register('ConfirmPw', {
            required: true,
            validate: (value: string) => {
              if (value === undefined || Password.current === undefined) {
                return false;
              }
              return value === Password.current;
            },
          })}
          name="ConfirmPw"
          placeholder="영문, 숫자 포함 총 10자리"
          required
        />
        {errors.ConfirmPw &&
          errors.ConfirmPw.type === 'required' &&
          'this field is required'}
        {errors.ConfirmPw &&
          errors.ConfirmPw.type === 'validate' &&
          'The Passwords do not matched'}
      </StPw>
      <StSignupButton type="submit">회원가입</StSignupButton>
    </Wrapper>
  );
};

export default Signup;

const StInputWrapper = styled.div`
  position: relative;
  margin: 10px;
`;

const StErrorMsg = styled.span`
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 14px;
  color: red;
`;

const Stinput = styled.input<StInputProps>`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #333;
  }

  &:focus + ${StErrorMsg} {
    visibility: visible;
  }

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}
`;

const StEmailP = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  mix-blend-mode: darken;
`;

const StEmail = styled(StInputWrapper)``;

const StEmailCheckButton = styled.button`
  background: #d3d3d3;
  border-radius: 40px;
  margin: 10px;
`;

const StBrandP = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  display: flex;
  justify-content: left
  align-items: center;
  color: #000000;
  mix-blend-mode: darken;
`;

const StBrand = styled.div`
  border: 2px solid;
  text-align: center;
  width: 600px;
`;

const StBrandInput = styled.input<StInputProps>`
  background: #d3d3d3;
  border-radius: 40px;
  margin: 10px;
  display: flex;
  justify-content: left;
  width: 500px;
`;

const StBrandNumberInput = styled.input<StInputProps>`
  background: #d3d3d3;
  border-radius: 40px;
  border-color: ${({ hasError }) => (hasError ? 'red' : 'inherit')};
`;

const StContectNumberInputWrapper = styled.div<StInputProps>`
  background: #d3d3d3;
  margin-right: 20px;
  border-color: ${({ hasError }) => (hasError ? 'red' : 'inherit')};
`;

const StBrandNumberP = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  display: flex;

  align-items: center;
  text-align: center;
  color: #000000;
`;

const StBrandCheckButton = styled.button`
  background: #d3d3d3;
  border-radius: 40px;
`;

const StPw = styled(StInputWrapper)`
  width: 600px;

  border: 2px solid;
`;

const StPwP = styled.p`
  /* 비밀번호* */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #000000;

  mix-blend-mode: darken;
`;

const StPwinput = styled.input<StInputProps>`
  background: #d3d3d3;
  border-radius: 40px;
  width: 500px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;

  &:focus {
    border-color: #333;
  }

  &:focus + ${StErrorMsg} {
    visibility: visible;
  }

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}
`;

const StSignupButton = styled.button`
  background-color: #f57c00;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e65100;
  }
`;

const StPicInfo = styled.div`
  width: 600px;
  border: 2px solid;
`;
