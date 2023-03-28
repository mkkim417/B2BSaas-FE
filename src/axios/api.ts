import axios from 'axios';
import { getCookie } from '../util/cookie';

interface Login {
  email: string;
  password: string;
}

console.log(`REACT_DEPLOY_SERVER value: ${process.env.REACT_DEPLOY_SERVER}`);

const instance = axios.create({
  baseURL: `${process.env.REACT_DEPLOY_SERVER}`,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${getCookie('accessToken')}`,
  },
});

const postLogin = async (login: Login) => {
  const response = await instance.post(
    'https://dev.sendingo-be.store/api/users/login',
    login
  );

  const cookies = response.headers.Authorization;
  const token = response.data.accessToken;
  console.log('cookies : ', cookies);
  console.log('token : ', token);

  return { response: response.data, cookies: cookies, token: token };
};

export { instance, postLogin };
