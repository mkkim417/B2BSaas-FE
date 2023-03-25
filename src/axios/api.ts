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

export const postLogin = async (data: any) => {
  const response = await axios.post(
    ' https://dev.sendingo-be.store/api/users/login',
    data
  );
  const authHeader =
    response.headers.authorization || response.headers.Authorization;
  const token = authHeader.split(' ')[1];
  return { response, token };
};

export { instance };
