import { useState } from 'react';

const useInput = () => {
  //state 관리
  const [value, setValue] = useState('');
  //OnChange 관리
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, handler] as const;
};

export default useInput;
