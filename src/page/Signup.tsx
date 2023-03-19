import React, { useRef, useState } from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  ConfirmPw: string;
  companyName: string;
  companyNumber: string;
  name?: string;
  phoneNumber: string;
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
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const Password = useRef<string>();
  Password.current = watch('password');
  const ConfirmPw = useRef<string>();
  ConfirmPw.current = watch('ConfirmPw');

  const EmailValidation: Validate<string, FormValues> = (value) => {
    const emailRegex = /^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(value) || '올바른 이메일 형식이 아닙니다';
  };

  const PasswordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  const PhoneNumberValidation = (value: string) => {
    const phoneRegex = /^\d{10,11}$/;
    return (
      phoneRegex.test(value.toString()) || 'Please enter a 10-11 digit number.'
    );
  };

  const nameRegex = /^[a-zA-Z ]+$/;

  const onSubmit = async (data: any) => {
    console.log(data);
    // let {
    //   companyName : data,
    //   companyNumber : data.BrandNumber,
    //   email : data.Email,
    //   password : data.Password,
    //   userName : data.PicName,
    //   phoneNumber : data.PicNumber,
    // } = newData;

    // console.log(newData);
    if (!isValid) {
      setAlertMessage('모든 항목을 입력하세요');
      return;
    }

    try {
      const response = await axios
        .post('https://dev.sendingo-be.store/api/users/signup', data)
        .then((res) => {
          console.log(res);
        });
      console.log(response);
      // if (response.status === 200) {
      //   setIsSubmitted(true);
      //   setAlertMessage('Your registration is complete.');
      //   alert('Your registration is complete.');
      //   navigate('/login');
      // } else {
      //   setAlertMessage('Registration failed.');
      //   alert('Login failed.');
      // }
    } catch (error: any) {
      // console.error('Error during axios call', error);
      // if (error.response) {
      //   console.error('API Response Error:', error.response);
      // } else if (error.request) {
      //   console.error('No API Response:', error.request);
      // } else {
      //   console.error('API Request Error:', error.message);
      // }
      // setAlertMessage('Registration failed.');
      // alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        {isSubmitted && <p>회원가입이 완료되었습니다.</p>}
        {alertMessage && <p>{alertMessage}</p>}
        <StEmail>
          <StEmailP>이메일</StEmailP>
          <Stinput
            type="email"
            {...register('email', {
              required: '해당 항목은 필수입니다',
              validate: EmailValidation,
            })}
            name="email"
            required
          />

          {errors.email && (
            <StErrorMsg>
              {errors.email.message || '이메일을 입력해주시기 바랍니다.'}
            </StErrorMsg>
          )}
          <StEmailCheckButton>중복확인</StEmailCheckButton>
        </StEmail>

        <StBrand>
          <StBrandP>소속명</StBrandP>

          <StBrandInput
            type="text"
            {...register('companyName', {
              required: true,
              pattern: /^[A-Za-z0-9\s]+$/i,
            })}
            name="companyName"
            required
            placeholder="브랜드(기업)명을 입력해주세요"
          />
          {errors.companyName && (
            <StErrorMsg>
              {errors.companyName.message || '브랜드(기업)명을 입력해주세요'}
            </StErrorMsg>
          )}
          <StBrandNumberP>소속대표전화</StBrandNumberP>
          <StBrandNumberInput
            type="text"
            placeholder="대표 번호를 입력해주세요"
            {...register('companyNumber', {
              required: true,
              validate: PhoneNumberValidation,
            })}
            name="companyNumber"
            required
            hasError={!!errors.companyNumber}
          />
          {errors.companyNumber && (
            <StErrorMsg>
              {errors.companyNumber.message || '대표 번호가 필요합니다'}
            </StErrorMsg>
          )}
          <StBrandNumberP>대표 이메일</StBrandNumberP>
          {/* <StBrandEmailInput
            type="text"
            placeholder="대표 이메일(발신용 이메일)을 입력해주세요"
            {...register('BrandNumber', {
              required: true,
              validate: PhoneNumberValidation,
            })}
            name="BrandNumber"
            required
          /> */}
        </StBrand>

        <StPicInfo>
          <h1>담당자 이름</h1>
          <StBrandInput
            type="text"
            {...register('name', {
              required: true,
              pattern: {
                value: nameRegex,
                message: '담당자 이름은 문자만 허용됩니다',
              },
            })}
            name="name"
            placeholder="담당자를 입력해주세요"
            required
          />
          {errors.name && (
            <StErrorMsg>
              {errors.name.message || '담당자 이름이 필요합니다'}
            </StErrorMsg>
          )}

          <StContectNumberInputWrapper>
            <h1>담당자 번호</h1>
            <StBrandInput
              type="text"
              placeholder="담당자 번호를 입력해주세요"
              {...register('phoneNumber', {
                required: true,
                validate: PhoneNumberValidation,
              })}
              name="phoneNumber"
              required
              hasError={!!errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <StErrorMsg>
                {errors.phoneNumber.message || '담당자 번호를 입력해주세요'}
              </StErrorMsg>
            )}
          </StContectNumberInputWrapper>
        </StPicInfo>

        <StPw>
          <StPwP>비밀번호</StPwP>
          <StPwinput
            type="password"
            {...register('password', {
              required: true,
              pattern: PasswordRegex,
            })}
            name="password"
            placeholder="암호는 대문자 1자리 이상 포함 영문, 숫자 포함 8~20 자리"
            required
          />
          {errors.password && (
            <StErrorMsg>
              {errors.password.message ||
                '암호는 대문자 1자리 이상 포함 영문, 숫자 포함 8~20 자리'}
            </StErrorMsg>
          )}
          <StPwP>비밀번호 확인</StPwP>
          <StPwinput
            type="password"
            {...register('ConfirmPw', {
              required: true,
              validate: (value: string) => {
                return value === Password.current;
              },
            })}
            name="ConfirmPw"
            placeholder="암호는 대문자 1자리 이상 포함 영문, 숫자 포함 8~20 자리"
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
        <Link to="/login">이미 계정이 있으신가요? 여기서 로그인 하세요</Link>
      </Wrapper>
    </form>
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
  justify-content: left;
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
  margin: 10px;
  display: flex;
  border: 2px solid;
  justify-content: left;
  width: 500px;
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

const StPw = styled(StInputWrapper)`
  width: 600px;
  border: 2px solid;
`;

const StPwP = styled.p`
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

const StSelect = styled.select`
  width: 43%;
  font-size: 15px;
`;

const StBrandEmailInput = styled.input`
  background: #d3d3d3;
  border-radius: 40px;
  margin: 10px;
  display: flex;
  border: 2px solid;
  justify-content: left;
  width: 500px;
`;
