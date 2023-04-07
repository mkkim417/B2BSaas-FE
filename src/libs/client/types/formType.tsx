import { UseFormRegister, FieldValues } from 'react-hook-form';

/* Input Types */
type InputTypes =
  | '이메일ID'
  | 'Nickname'
  | '기업명'
  | '기업이메일'
  | 'Password'
  | '이메일'
  | '닉네임'
  | '비밀번호'
  | '휴대폰번호'
  | '이름'
  | '비밀번호확인'
  | '회사전화번호';

/* Input */
export interface InputProps {
  type: InputTypes;
  register: UseFormRegister<FieldValues & FormState>;
  getValues?: any;
  errorMessage: string | undefined;
  placeholder?: string | undefined;
}

/* SignIn */
export interface FormState {
  email: string;
  companyName: string;
  nickname: string;
  companyEmail: string;
  phoneNumber: string;
  password: string;
  passwordCheck: string;
  name: string;
  companyNumber: string;
}

/* Label */
export interface LabelProps {
  value: InputTypes;
  errorMessage: string | undefined;
}
