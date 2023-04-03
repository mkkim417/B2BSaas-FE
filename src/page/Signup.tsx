import React, { useRef, useState } from 'react';
// import { Wrapper } from './Home';
import styled from 'styled-components';
import axios from 'axios';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postSignUp } from '../axios/api';

interface FormValues {
  email: string;
  emailProvider: string;
  password: string;
  ConfirmPw: string;
  companyName: string;
  companyNumber: string;
  companyEmail: string;
  companyEmailProvider: string;
  name?: string;
  phoneNumber: string;
  role: number;
}

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '', label: '이메일 공급자를 입력하여 주십시오' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'kakao.com', label: 'kakao.com' },
  { value: 'outlook.com', label: 'outlook.com' },
  { value: 'direct', label: '직접입력' },
];

const companyEmailOptions: Option[] = [
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'kakao.com', label: 'kakao.com' },
  { value: 'outlook.com', label: 'outlook.com' },
  { value: 'direct', label: '직접입력' },
];

interface StInputProps {
  hasError?: boolean;
}

const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [directInput, setDirectInput] = useState(false);
  const [isDupliEmail, setDupliEmail] = useState(false);
  const [companyDirectInput, setCompanyDirectInput] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const [formData, setFormData] = useState<FormValues>({
    email: '',
    emailProvider: 'gmail.com',
    password: '',
    ConfirmPw: '',
    companyName: '',
    companyNumber: '',
    companyEmail: '',
    companyEmailProvider: 'gmail.com',
    name: '',
    phoneNumber: '',
    role: 1,
  });

  const Password = useRef<string>();
  Password.current = watch('password');
  const ConfirmPw = useRef<string>();
  ConfirmPw.current = watch('ConfirmPw');

  const [isEmail, setEmail] = useState();

  const EmailValidation: Validate<string, FormValues> = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fullEmail = value + '@' + formData.emailProvider;
    return emailRegex.test(fullEmail) ? true : '올바른 주소를 입력하세요';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: value,
      }));
    } else if (name === 'emailProvider') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        emailProvider: value,
        email: prevFormData.email + '@' + value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const companyHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'companyEmail') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: value,
      }));
    } else if (name === 'comapnyEmailProvider') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        emailProvider: value,
        email: prevFormData.companyEmail + '@' + value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEmailProviderChange = (emailprovider: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emailProvider: emailprovider,
    }));
    if (emailprovider === 'direct') {
      setDirectInput(true);
    } else {
      setDirectInput(false);
    }
  };

  const handleCompanyEmailProviderChange = (companyEmailProvider: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyEmailProvider: companyEmailProvider,
    }));
    if (companyEmailProvider === 'direct') {
      setCompanyDirectInput(true);
    } else {
      setCompanyDirectInput(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const emailProvider = e.target.value;
    handleEmailProviderChange(emailProvider);
  };

  const handleCompanySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const companyEmailProvider = e.target.value;
    handleCompanyEmailProviderChange(companyEmailProvider);
  };

  const checkEmailDuplication = async (email: string) => {
    console.log('formData.emailProvider : ', formData.emailProvider);
    console.log('isEmail', isEmail);
    console.log('isEmail', isEmail + formData.emailProvider);

    try {
      const response = await axios
        .post('https://dev.sendingo-be.store/api/users/signup/existemail', {
          email: isEmail + '@' + formData.emailProvider,
        })
        .then((res) => {
          alert(res.data.message);
          setDupliEmail(true);
        });
      // alert('중복된 이메일입니다.');
    } catch (error: any) {
      alert(error.response.data.message);
      console.log('error : ', error);
    }
  };

  const PasswordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const PhoneNumberValidation = (value: string) => {
    const phoneRegex = /^\d{10,11}$/;
    return (
      phoneRegex.test(value.toString()) ||
      '10-11자리 숫자를 입력하시기 바랍니다.'
    );
  };
  const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;

  // mutate 선언
  const { mutate } = useMutation(postSignUp, {
    onSuccess: (response) => {
      console.log(response);
      alert('회원가입 완료!');
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
      alert('회원가입 실패');
    },
  });
  const onSubmit = async (data: FormValues) => {
    if (!isDupliEmail) {
      alert('이메일 중복을 확인해주세요');
      return;
    }

    if (!isValid) {
      setAlertMessage('모든 항목을 입력하시길 바랍니다');
      return;
    }

    const email = `${data.email}@${formData.emailProvider}`;
    const email2 = `${data.companyEmail}@${formData.companyEmailProvider}`;

    // const requestBody = {
    //   email: EmailValidation(formData.email, formData),
    //   password: data.password,
    //   name: data.name,
    //   phoneNumber: data.phoneNumber,
    //   companyName: data.companyName,
    //   companyNumber: data.companyNumber,
    //   role: 1,
    // };
    const sendEmail = email + formData.email;
    const sendEmail2 = email2 + formData.companyEmail;
    mutate({
      email: sendEmail,
      password: data.password,
      confirmPassword: data.ConfirmPw,
      name: data.name,
      phoneNumber: data.phoneNumber,
      companyName: data.companyName,
      companyNumber: data.companyNumber,
      companyEmail: sendEmail2,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        {isSubmitted && <p>회원가입이 완료되었습니다.</p>}
        {alertMessage && <p>{alertMessage}</p>}
        <StEmail>
          <StEmailP>Email</StEmailP>
          <StInput
            type="text"
            {...register('email', {
              required: '이 항목은 필수입니다',
              validate: EmailValidation,
            })}
            name="email"
            required
            value={isEmail}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <span>@</span>
          {directInput ? (
            <StInputWrapper>
              {' '}
              <StInput
                type="text"
                {...register('emailProvider', {
                  required: '이 항목은 필수입니다',
                })}
                name="emailProvider"
                value={
                  formData.emailProvider === 'direct'
                    ? ''
                    : formData.emailProvider
                }
                onChange={handleInputChange}
                onBlur={() => {
                  if (!formData.emailProvider) {
                    setDirectInput(false);
                  }
                }}
                required
              />
            </StInputWrapper>
          ) : (
            <StSelect
              name="emailProvider"
              value={formData.emailProvider || 'gmail.com'}
              onChange={handleSelectChange}
            >
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </StSelect>
          )}

          {errors.email || errors.emailProvider ? (
            <StErrorMsg>
              {errors.email?.message ||
                errors.emailProvider?.message ||
                '이메일을 입력해 주십시오.'}
            </StErrorMsg>
          ) : null}
          <div
            onClick={() => {
              checkEmailDuplication(formData.email);
              // checkEmailDuplication(formData.email).then((exists) => {
              //   if (exists) {
              //     alert('이미 존재하는 이메일입니다.');
              //   } else {
              //     alert('사용가능한 이메일입니다.');
              //   }
              // });
            }}
          >
            중복확인
          </div>
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
          <StBrandNumberP>대표 이메일</StBrandNumberP>
          <StInput2
            type="text"
            {...register('companyEmail', {
              required: '이 항목은 필수입니다',
              validate: EmailValidation,
            })}
            name="companyEmail"
            required
          />
          <span>@</span>
          {companyDirectInput ? (
            <StInputWrapper>
              <StInput2
                type="text"
                {...register('companyEmailProvider', {
                  required: '이 항목은 필수입니다',
                  validate: EmailValidation,
                })}
                name="companyEmailProvider"
                value={
                  formData.companyEmailProvider === 'direct'
                    ? ''
                    : formData.companyEmailProvider
                }
                onChange={companyHandleInputChange}
                onBlur={() => {
                  if (!formData.companyEmailProvider) {
                    setCompanyDirectInput(false);
                  }
                }}
                required
              />
            </StInputWrapper>
          ) : (
            <StSelect2
              name="companyEmailProvider"
              value={formData.companyEmailProvider || 'gmail.com'}
              onChange={handleCompanySelectChange}
            >
              {companyEmailOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </StSelect2>
          )}

          {errors.email || errors.emailProvider ? (
            <StErrorMsg>
              {errors.email?.message ||
                errors.emailProvider?.message ||
                '이메일을 입력해 주십시오.'}
            </StErrorMsg>
          ) : null}
          {/* <StPicRole>
            <label>역할:</label>
            <select
              {...register('role')}
              defaultValue="normal"
              onChange={handleSelectChange}
            >
              <option value="normal">일반</option>
              <option value="admin">관리자</option>
            </select>
          </StPicRole> */}
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
            '해당 항목은 필수입니다.'}
          {errors.ConfirmPw &&
            errors.ConfirmPw.type === 'validate' &&
            '비밀번호가 일치하지 않습니다.'}
        </StPw>
        <StSignupButton>회원가입</StSignupButton>
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
  color: red;
  /* visibility: hidden; */
`;

const StInput = styled.input<StInputProps>`
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
  ${({ hasError }: StInputProps) =>
    hasError &&
    `
    border-color: red;
  `}
`;

const StInput2 = styled.input<StInputProps>`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
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
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;
`;

const StSelect2 = styled.select`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
  border: 2px solid rgba(170, 170, 170, 0.26);
  transition: border-color 0.2s ease-in-out;
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

const StPicRole = styled.div``;
