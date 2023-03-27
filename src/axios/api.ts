import axios from 'axios';
import { setCookie, getCookie, getTokens } from '../cookies/cookies';

interface Login {
  email: string;
  password: string;
}

const instance = axios.create({
  baseURL: `https://dev.sendingo-be.store`,
  withCredentials: true,
});

instance.interceptors.request.use(function (config) {
  const { accessToken, userToken } = getTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (userToken) {
    config.headers.userToken = userToken;
  }
  return config;
});

export const postLogin = async (data: Login) => {
  try {
    const response = await instance.post('/api/users/login', data);

    const authHeader =
      response.headers.authorization || response.headers.Authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    localStorage.setItem('토큰', token);

    return { response, token, data: response.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { instance };
