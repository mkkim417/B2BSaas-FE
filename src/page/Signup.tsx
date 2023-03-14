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

  const handleSignup = () => {
    const data = getValues();
    console.log(data);
    localStorage.setItem('email', data.Email);
    localStorage.setItem('Password', data.Password);
    console.log(handleSignup);
    navigate('/login');
  };

  const Password = useRef<string>();
  Password.current = watch('Password');
  const ConfirmPw = useRef<string>();
  ConfirmPw.current = watch('ConfirmPw');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!isValid) {
      setAlertMessage('Please enter all fields correctly.');
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
  };

  const EmailValidation: Validate<string, FormValues> = (value) => {
    const EmailRegex = /^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (EmailRegex.test(value)) {
      return true;
    } else {
      return 'This is not a valid email format';
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
      return 'Please enter only numbers and hyphens (-)';
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleSignup)}>
      {isSubmitted && <p>Your subscription has been completed.</p>}
      {alertMessage && <p>{alertMessage}</p>}
      <StEmail>
        <p>Email</p>
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
        <button>중복확인</button>
      </StEmail>
      <StBrand>
        <h1>Affiliation Name</h1>
        <StBrandInput
          type="text"
          {...register('BrandName', {
            required: true,
            pattern: /^[A-Za-z0-9\s]+$/i,
          })}
          name="BrandName"
          required
          placeholder="Enter the brand (company) name"
        />
        {errors.BrandName && (
          <StErrorMsg>
            {errors.BrandName.message || 'Brandname is required'}
          </StErrorMsg>
        )}
        <StBrandNumberInput
          type="text"
          placeholder="Enter representative number"
          {...register('BrandNumber', {
            required: true,
            validate: PhoneNumberValidation,
          })}
          name="BrandNumber"
          required
        />
        {errors.BrandNumber && (
          <StErrorMsg>
            {errors.BrandNumber.message || 'BrandNumber is required'}
          </StErrorMsg>
        )}
        <button>중복확인</button>
        <StBrandInfo>
          <StBrandInputWrapper>
            <h1>Contact Name</h1>
            <StBrandInput
              type="text"
              {...register('PicName', {
                required: true,
              })}
              name="PicName"
              placeholder="Please enter a contact person"
              required
            />
            {errors.PicName && (
              <StErrorMsg>
                {errors.PicName.message || 'Picname is required'}
              </StErrorMsg>
            )}
          </StBrandInputWrapper>
          <StContectNumberInputWrapper>
            <h1>Contact Phone Number</h1>
            <StBrandInput
              type="text"
              placeholder="Enter contact phone number"
              {...register('PicNumber', {
                required: true,
                validate: PhoneNumberValidation,
              })}
              name="PicNumber"
              required
            />
            {errors.PicNumber && (
              <StErrorMsg>
                {errors.PicNumber.message ||
                  'Please enter contact phone number'}
              </StErrorMsg>
            )}
          </StContectNumberInputWrapper>
        </StBrandInfo>
      </StBrand>
      <StPw>
        <h1>Password</h1>
        <StPwinput
          type="password"
          {...register('Password', {
            required: true,
            pattern: PasswordRegex,
          })}
          name="Password"
          placeholder="A total of 10 digits, including English and numbers"
          required
        />
        {errors.Password && (
          <StErrorMsg>
            {errors.Password.message ||
              'Your password must contain at least one letter, one number, and be at least 10 characters'}
          </StErrorMsg>
        )}
        <h1>Confirm password</h1>
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
      <StSignupButton type="submit" onClick={handleSignup}>
        회원가입
      </StSignupButton>
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
  visibility: hidden;
`;

const Stinput = styled.input<StInputProps>`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;
  &:focus + ${StErrorMsg} {
    visibility: visible;
  }
  &:focus {
    border-color: #333;
  }

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}

  &:focus + ${StErrorMsg} {
    visibility: visible;
  }
`;

const StEmail = styled(StInputWrapper)`
  border: 2px solid;
`;

const StBrand = styled.div`
  border: 2px solid;
  text-align: center;
  width: 600px;
`;

const StBrandInput = styled.input<StInputProps>`
  background: #d3d3d3;
  margin-right: 20px;
`;

const StBrandNumberInput = styled.input<StInputProps>`
  background: #d3d3d3;
  margin-right: 20px;
`;

const StContectNumberInputWrapper = styled.div<StInputProps>`
  background: #d3d3d3;
  margin-right: 20px;
`;

const StBrandInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const StBrandInputWrapper = styled.div`
  margin: 10px;
`;

const StPw = styled(StInputWrapper)`
  border: 2px solid;
`;

const StPwinput = styled.input<StInputProps>`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;
  &:focus + ${StErrorMsg} {
    visibility: visible;
  }
  &:focus {
    border-color: #333;
  }

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}

  &:focus + ${StErrorMsg} {
    visibility: visible;
  }
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
