import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../axios/api';
import ReactHookInput from '../components/form/ReactHookInput';
import { getCookie } from '../util/cookie';
import { Link } from 'react-router-dom';
interface FormState {
  errors: any;
  dirty: boolean;
  isSubmitted: boolean;
  isValid: boolean;
}
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  }: any = useForm<FormState>({
    mode: 'onChange',
  });

  const { mutate, data, isLoading } = useMutation(postSignUp, {
    onSuccess: (res) => {
      alert(res.data.message);
      navigate('/login');
    },
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });
  const onValid = async (data: FormState) => {
    const {
      email,
      password,
      passwordCheck,
      name,
      phoneNumber,
      companyName,
      companyNumber,
      companyEmail,
    }: any = data;
    mutate({
      email,
      password,
      confirmPassword: passwordCheck,
      name,
      phoneNumber,
      companyName,
      companyNumber,
      companyEmail,
    });
  };
  const token = getCookie('userToken');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <Container>
        <TopWrapper>
          <Title>회원가입</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <ReactHookInput
              type="이메일ID"
              register={register}
              errorMessage={errors.email?.message}
              placeholder="ID로 사용할 이메일을 입력해주세요."
            />
            <ReactHookInput
              type="기업명"
              register={register}
              errorMessage={errors.companyName?.message}
              placeholder="기업명을 입력해주세요."
            />
            <ReactHookInput
              type="회사전화번호"
              register={register}
              errorMessage={errors.companyNumber?.message}
              placeholder="회사전화번호를 입력해주세요."
            />
            <ReactHookInput
              type="기업이메일"
              register={register}
              errorMessage={errors.companyEmail?.message}
              placeholder="기업이메일 입력해주세요."
            />
            <ReactHookInput
              type="이름"
              register={register}
              errorMessage={errors.name?.message}
              placeholder="이름을 입력해주세요."
            />
            <ReactHookInput
              type="휴대폰번호"
              register={register}
              errorMessage={errors.phoneNumber?.message}
              placeholder="휴대폰번호 입력해주세요."
            />
            <ReactHookInput
              type="비밀번호"
              register={register}
              errorMessage={errors.password?.message}
              placeholder="비밀번호 입력해주세요."
            />
            <ReactHookInput
              type="비밀번호확인"
              register={register}
              errorMessage={errors.passwordCheck?.message}
              getValues={getValues}
              placeholder="비밀번호 다시한번 입력해주세요."
            />
            {/* <ReactHookInput
                type="Nickname"
                register={register}
                errorMessage={errors.nickname?.message}
              /> */}
            {isValid ? (
              <StLoginButton disable={false}>회원가입</StLoginButton>
            ) : (
              <StLoginButton2 disable={true}>회원가입</StLoginButton2>
            )}
            <LoginWrap>
              <Link to={'/login'}>로그인</Link>
            </LoginWrap>
          </Form>
        </TopWrapper>
      </Container>
    </>
  );
};
export default Signup;

const LoginWrap = styled.div`
  font-size: 11px;
  border-bottom: 1px solid #909090;
  color: #909090;
  width: 40px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 2px;
`;
export const StLoginButton = styled.button<{ disable?: boolean }>`
  background: ${(props) => (props.disable === true ? '#eee' : '#14b769')};
  color: ${(props) => (props.disable === true ? '#bdbdbd' : '#fff')};
  border-radius: 8px;
  width: 380px;
  height: 48px;
  margin: 30px 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;
export const StLoginButton2 = styled(StLoginButton)``;
const DulpliChk = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0px;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;
  gap: 5px;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const SocialText = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
  opacity: 0.7;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled(motion.div)`
  position: absolute;
  width: 460px;
  margin-top: 100px;
  border-radius: 5px;
  left: calc(50% - 250px);
  top: calc(50% - 400px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
  color: ${({ theme }) => theme.color};
  backdrop-filter: blur(3px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
`;

const Title = styled.div`
  font-size: 24px;
  width: 100%;
  text-align: center;
  font-weight: 700;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
`;

const Submit = styled.button`
  margin: 30px 0 30px 0;
  padding: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  font-size: 20px;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.background};
  }
`;
