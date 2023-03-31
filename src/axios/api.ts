import axios from 'axios';
import { data } from '../components/Chart';
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
    localStorage.setItem('Token', token);
    return { response, token, data: response.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 단건 클라이언트 생성
export const postSingleClient = async (user: any) => {
  const token = getCookie('userToken')
  const response = await instance.post('/api/clients', {
    clientName: user.clientName,
    clientEmail: user.clientEmail,
    contact: user.contact,
  },
  { headers : { authorization: `Bearer ${token}`}});
  return response;
};
// 빈 그룹 생성
export const postGroupData = async (data: any) => {
  const token = getCookie('userToken')
  const response = await instance.post('/api/groups', data,
    { headers : { authorization: `Bearer ${token}`}})
  return response;
}

// 전체 클라이언트 리스트 불러오기
export const getAllClientList = async (page : any) => {
  const token = getCookie('userToken')
    const response = await instance.get(
      `/api/clients?index=${page}`,
      { headers : { authorization: `Bearer ${token}`}})
    return response.data;

}
// 전체 그룹 리스트 불러오기
export const getAllGroupList = async () => {
  const token = getCookie('userToken')
  const response = await instance.get('/api/groups',
    { headers : { authorization: `Bearer ${token}`}})
  return response.data;
}
// 단건 고객정보 수정
export const eidtClientData = async (user:any) => {
  const token = getCookie('userToken')
  const response = await instance.patch(`/api/clients/${user.clientId}`, {
      clientName :user.clientName,
      contact :user.contact,
      clientEmail :user.clientEmail
    },
    { headers : { authorization: `Bearer ${token}`}}
  )
  return response;
}
// 고객리스트에서 고객 삭제
export const deleteClientData = async(checkValue: any) => {
  const token = getCookie('userToken')
  const urls = checkValue.map(
    (item: any) =>
      `/api/clients/${item.clientId}`
  );
  const response = await axios.all(
    urls.map((url: any) => {
      instance.delete(url,
        { headers : { authorization: `Bearer ${token}`}})
    })
  )
  return response;
}
// 그룹 삭제
export const deleteGroupData = async (groupId: any) => {
  const token = getCookie('userToken')
  const response = await instance.delete(`/api/groups/${groupId}`,
  { headers : { authorization: `Bearer ${token}`}})
  return response;
}
// 그룹 내 클라이언트 복사
// 그룹 내 클라이언트 이동

export { instance };
