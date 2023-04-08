import styled from 'styled-components';
import { InputProps } from '../../libs/client/types/formType';
import Label from './Label';
import axios from 'axios';

const EmailInput = ({
  type,
  register,
  errorMessage,
  placeholder,
  getValues,
}: InputProps) => {
  return (
    <Wrapper>
      <Label value={type} errorMessage={errorMessage} />
      {type === '이메일ID' ? (
        <Input
          errorId={!!errorMessage}
          {...register('email', {
            required: '*',
            validate: {
              hasAlpha: (value) => {
                const hasAlpha = !!value.match(/[a-zA-Z]/g);

                return hasAlpha ? true : '알파벳으로 작성해주세요.';
              },
              isEmail: (value) => {
                const isEmail = !!value.match(
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );

                return isEmail ? true : '이메일 형식이 아닙니다.';
              },
              checkEmailDuplication: async (email: string) => {
                try {
                  await axios
                    .post(
                      'https://dev.sendingo-be.store/api/users/signup/existemail',
                      {
                        email,
                      }
                    )
                    .then((res) => {
                      return res.data.message;
                    });
                  // alert('중복된 이메일입니다.');
                } catch (error: any) {
                  return error.response.data.message;
                }
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === 'Nickname' || type === '닉네임' ? (
        <Input
          errorId={!!errorMessage}
          {...register('nickname', {
            required: '*',
            minLength: {
              value: 4,
              message: 'longer more than 4',
            },
            validate: (value) => {
              const hasAlpha = !!value.match(/[a-zA-Z]/g);

              return hasAlpha ? true : 'must be include alpha';
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '아이디' ? (
        <Input
          errorId={!!errorMessage}
          {...register('email', {
            required: '*',
            validate: {
              hasAlpha: (value) => {
                const hasAlpha = !!value.match(/[a-zA-Z]/g);

                return hasAlpha ? true : '알파벳으로 작성해주세요.';
              },
              isEmail: (value) => {
                const isEmail = !!value.match(
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );

                return isEmail ? true : '이메일 형식이 아닙니다.';
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '기업명' ? (
        <Input
          errorId={!!errorMessage}
          {...register('companyName', {
            required: '*',
            minLength: {
              value: 1,
              message: '기업명을 입력해주세요.',
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '기업이메일' ? (
        <Input
          errorId={!!errorMessage}
          {...register('companyEmail', {
            required: '*',
            validate: {
              hasAlpha2: (value) => {
                const hasAlpha2 = !!value.match(/[a-zA-Z]/g);

                return hasAlpha2 ? true : '알파벳으로 작성해주세요.';
              },
              isEmail2: (value) => {
                const isEmail2 = !!value.match(
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );
                return isEmail2 ? true : '이메일 형식이 아닙니다.';
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '휴대폰번호' ? (
        <Input
          errorId={!!errorMessage}
          {...register('phoneNumber', {
            required: '*',
            validate: {
              isNum: (value) => {
                const isNum = !!value.match(/^\d{11}$/);

                return isNum ? true : '(-)를 제외한 11자리를 입력해주세요.';
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '비밀번호확인' ? (
        <Input
          errorId={!!errorMessage}
          {...register('passwordCheck', {
            required: '*',
            validate: {
              matchesPreviousPassword: (value) => {
                const password = getValues('password');
                return password === value || '비밀번호가 일치하지 않습니다.';
              },
            },
          })}
          type="password"
          placeholder={placeholder}
        />
      ) : type === '이름' ? (
        <Input
          errorId={!!errorMessage}
          {...register('name', {
            required: '*',
            validate: {
              isName: (value) => {
                const isName = !!value.match(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/);

                return isName ? true : '한글 영어만 입력해주세요.';
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : type === '회사전화번호' ? (
        <Input
          errorId={!!errorMessage}
          {...register('companyNumber', {
            required: '*',
            validate: {
              isNumber: (val) => {
                const isNumber = !!val.match(/^[0-9]+$/);
                return isNumber ? true : '숫자만 입력해주세요.';
              },
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      ) : (
        <Input
          errorId={!!errorMessage}
          {...register('password', {
            required: '*',
            validate: {
              isPassword: (value) => {
                const isPassword = !!value.match(
                  /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/
                );
                return isPassword
                  ? true
                  : '대문자 1자리 이상 포함 영문, 숫자 포함 8~20자리 입력해주세요.';
              },
            },
          })}
          type="password"
          placeholder={placeholder}
        />
      )}
    </Wrapper>
  );
};

export default EmailInput;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ errorId: boolean }>`
  height: 48px;
  border: none;
  font-family: 'Inter';
  padding: 15px 0px 15px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  border: solid 1px
    ${(props) => (props.errorId ? props.theme.pointColor : null)};
  transition: ${({ theme }) => theme.transitionOption};
  background: transparent;
  :focus {
    outline: none;
    border: solid 1px ${(props) => (props.errorId ? 'red' : null)};
  }
`;
