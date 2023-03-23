import axios from 'axios';
import { getCookie } from '../util/cookie';

interface Login {
  email: string;
  password: string;
}

const instance = axios.create({
  // baseURL: `REACT_APP_SERVER_URL`,
  baseURL: `${process.env.REACT_DEPLOY_SERVER}`,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const cookie = document.cookie;
    if (cookie) {
      config.headers.Cookie = cookie;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const postLogin = async (login: Login) => {
  const response = await instance.post(
    'https://dev.sendingo-be.store/api/users/login',
    login
  );

  const cookies = response.headers.authorization;
  console.log('response:', response);

  const token = response.data.accessToken;
  console.log('token', token);

  return { response: response.data, cookies: cookies, token: token };
};

export { instance, postLogin };
