import axios from 'axios';
import { getCookie } from '../cookies/cookies';
interface Login {
  email: string;
  password: string;
}
const instance = axios.create({
  baseURL: `${process.env.REACT_DEPLOY_SERVER}`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getCookie('userToken')}`,
  },
});
instance.interceptors.request.use(function (config) {
  const token = getCookie('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postLogin = async (data: Login) => {
  const response = await axios.post(
    'https://dev.sendingo-be.store/api/users/login',
    data,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getCookie('userToken')}`,
      },
    }
  );
  const authHeader = response.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  return { response, token };
};

export { instance };
