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

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await axios
        .post('https://dev.sendingo-be.store/api/users/signup/existemail', {
          email: isEmail + '@' + formData.emailProvider,
        })
        .then((res) => {
          console.log(res.data);
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
      navigate('/login');
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
        <StForm>
          {isSubmitted && <p>회원가입이 완료되었습니다.</p>}
          {alertMessage && <p>{alertMessage}</p>}
          <StP>회원가입</StP>
          <StEmail>
            <StEmailP>이메일ID</StEmailP>
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
              placeholder="ID로 사용할 이메일을 입력해주세요"
            />
            {/* <span>@</span>
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
            <button
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
            </button> */}
            {/* selectbox~중복확인버튼 주석처리 */}
          </StEmail>

          <StBrand>
            <StBrandP>기업명</StBrandP>
            <StBrandInput
              type="text"
              {...register('companyName', {
                required: true,
                pattern: /^[A-Za-z0-9\s]+$/i,
              })}
              name="companyName"
              required
              placeholder="기업명을 입력해주세요"
            />
            {errors.companyName && (
              <StErrorMsg>
                {errors.companyName.message || '기업명을 입력해주세요'}
              </StErrorMsg>
            )}
            {/* <StBrandNumberP>휴대폰번호</StBrandNumberP>
            <Stdiv>
              <StBrandNumberInput
                type="text"
                placeholder="예시 01012345678"
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
              <Stbutton>인증번호 받기</Stbutton>
            </Stdiv>
            <StInput3 type="text" placeholder="인증번호를 입력해주세요" /> */}
          </StBrand>
          <StPicInfo>
            {/* <StPicP>담당자 이름</StPicP>
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
              <StPicP>담당자 번호</StPicP>
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
            </StContectNumberInputWrapper> */}
            <StBrandNumberP>기업 이메일</StBrandNumberP>
            <StInput2
              type="text"
              {...register('companyEmail', {
                required: '이 항목은 필수입니다',
                validate: EmailValidation,
              })}
              name="companyEmail"
              required
              placeholder="기업 이메일을 입력해주세요"
            />
            <StBrandNumberP>휴대폰번호</StBrandNumberP>
            <Stdiv>
              <StBrandNumberInput
                type="text"
                placeholder="예시 01012345678"
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
              <Stbutton>인증번호 받기</Stbutton>
            </Stdiv>
            <StInput3 type="text" placeholder="인증번호를 입력해주세요" />
            {/* <span>@</span>
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
            ) : null} */}
            {/* @~기업이메일 selectbox 주석처리 */}

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
              placeholder="비밀번호를 입력해주세요"
              required
            />
            {errors.password && (
              <StErrorMsg>
                {errors.password.message ||
                  '암호는 대문자 1자리 이상 포함 영문, 숫자 포함 8~20 자리'}
              </StErrorMsg>
            )}
            {/* <StPwP>비밀번호 확인</StPwP> */}
            <StPwinput2
              type="password"
              {...register('ConfirmPw', {
                required: true,
                validate: (value: string) => {
                  return value === Password.current;
                },
              })}
              name="ConfirmPw"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              required
            />
            {errors.ConfirmPw &&
              errors.ConfirmPw.type === 'required' &&
              '해당 항목은 필수입니다.'}
            {errors.ConfirmPw &&
              errors.ConfirmPw.type === 'validate' &&
              '비밀번호가 일치하지 않습니다.'}
          </StPw>
          <StSignupButton>가입하기</StSignupButton>
        </StForm>
        <StLogin>
          <Link to="/login">
            이미 계정이 있으신가요? 여기서 <Stspan>로그인</Stspan> 하세요
          </Link>
        </StLogin>
      </Wrapper>
    </form>
  );
};
export default Signup;

const StP = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #000000;
  margin-top: 40px;
`;

const StInputWrapper = styled.div`
  position: relative;
  margin: 10px;
`;
const StErrorMsg = styled.span`
  color: red;
  /* visibility: hidden; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 30px;
  font-family: 'Inter';
  font-style: normal;
`;

const StEmail = styled(StInputWrapper)`
  /* border: 2px solid; */
  width: 380px;
`;

const StEmailP = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  display: flex;
  align-items: center;
  padding: 30px 0 10px 0;
  text-align: center;
  color: #909090;
  mix-blend-mode: darken;
`;

/* Rectangle 120 */

const StInput = styled.input<StInputProps>`
  background: #FFFFFF
  box-sizing: border-box;
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  padding: 15px 0 15px 20px;
  display: flex;
  align-items: center;
  border: 1px solid #BDBDBD;
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
    border-color: transparent;
  `}
`;

const StSelect = styled.select`
  background: #FFFFFF
  border-radius: 40px;
  width: 250px;
  margin: 10px auto;
  border: 2px solid rgba
  transition: border-color 0.2s ease-in-out;
`;

const StInput2 = styled.input<StInputProps>`
   background: #FFFFFF
  box-sizing: border-box;
  border-radius: 8px;
  font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 18px;
  width: 380px;
  height: 50px;
  margin: 10px auto;
  padding: 15px 0 15px 20px;
  display: flex;
  align-items: center;
  border: 1px solid #BDBDBD;
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
    border-color: transparent;
  `}
`;

const StSelect2 = styled.select`
  background: #FFFFFF
  border-radius: 40px;
  width: 250px;
  margin: 10px auto;
  border: 2px solid rgba
  transition: border-color 0.2s ease-in-out;
`;

const StInput3 = styled.input`
  background: #eeeeee;
  border-radius: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  padding: 15px 0 15px 20px;
  display: flex;
  align-items: center;
  border: 1px solid #bdbdbd;
`;

const StBrand = styled.div`
  /* border: 2px solid; */

  width: 380px;
`;

const StBrandP = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  justify-content: left;
  margin: 30px 0 10px 0;
  align-items: center;
  color: #909090;
  mix-blend-mode: darken;
`;

const StBrandInput = styled.input<StInputProps>`
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  padding: 15px 0 15px 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: left;
`;
const StBrandNumberInput = styled.input<StInputProps>`
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  padding: 15px 0 15px 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* border-color: ${({ hasError }) => (hasError ? 'red' : 'inherit')}; */
  justify-content: left;
  width: 230px;
  height: 48px;
`;

const Stbutton = styled.button`
  width: 138px;
  height: 46px;
  background: #eeeeee;
  border-radius: 8px;
  margin-left: 10px;
  color: #bdbdbd;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
`;

const StContectNumberInputWrapper = styled.div<StInputProps>`
  margin-right: 20px;
  border-color: ${({ hasError }) => (hasError ? 'red' : 'inherit')};
`;
const StBrandNumberP = styled.p`
  margin: 10px auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 30px 0 10px 0;
  display: flex;
  align-items: center;
  text-align: center;
  color: #909090;
`;

const Stdiv = styled.div`
width: 380px
height: 132px
  display: flex;
  justify-content: center;
`;

const StPw = styled(StInputWrapper)`
  width: 380px;
  /* border: 2px solid; */
`;
const StPwP = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  font-weight: 700;

  line-height: 20px;
  margin: 30px 0 10px 0;
  display: flex;
  align-items: center;
  color: #909090;
  mix-blend-mode: darken;
`;

const StPicP = styled.p`
  margin-left: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
`;

const StPwinput = styled.input<StInputProps>`
  background: #ffffff;
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 10px auto;
  padding: 15px 0 15px 20px;
  border: 1px solid #bdbdbd;
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

const StPwinput2 = styled.input<StInputProps>`
  background: #ffffff;
  border-radius: 8px;
  width: 380px;
  height: 48px;
  /* margin: 10px auto; */
  padding: 15px 0 15px 20px;
  border: 1px solid #bdbdbd;
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

const StSignupButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 48px;
  color: #bdbdbd;
  background: #eeeeee;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 14px 0 14px 0;
  border: none;
  border-radius: 8px;
  margin: 60px 40px 40px 40px;
`;

const StPicInfo = styled.div`
  width: 380px;
  /* border: 2px solid; */
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  /* border: 1px solid black; */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const StLogin = styled.div`
  margin: 30px 0 20px 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Grey01 */
  color: #909090;
`;

const Stspan = styled.span`
  text-decoration: underline;
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
