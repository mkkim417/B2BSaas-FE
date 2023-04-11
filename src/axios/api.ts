import axios from 'axios';
import { data } from '../components/Chart';
import { getCookie } from '../util/cookie';
interface Login {
  email: string;
  password: string;
}
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
});
instance.interceptors.request.use(function (config) {
  // const { accessToken, userToken } = getTokens();
  const token = getCookie('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }
  // if (userToken) {
  //   config.headers.userToken = userToken;
  // }
  return config;
});

// 회원가입
export const postSignUp = async (user: any) => {
  const response = await instance.post('/api/users/signup', {
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    name: user.name,
    phoneNumber: user.phoneNumber,
    companyName: user.companyName,
    companyNumber: user.companyNumber,
    companyEmail: user.companyEmail,
  });
  return response;
};
// 로그인
export const postLogin = async (data: Login) => {
  try {
    const response = await instance.post('/api/users/login', data);
    const authHeader =
      response.headers.authorization || response.headers.Authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    // localStorage.setItem('Token', token);
    return { response, token, data: response.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 단건 클라이언트 생성
export const postSingleClient = async (user: any) => {
  const response = await instance.post('/api/clients', {
    clientName: user.clientName,
    clientEmail: user.clientEmail,
    contact: user.contact,
  });
  return response;
};
// 빈 그룹 생성
export const postGroupData = async (data: any) => {
  const response = await instance.post('/api/groups', data);
  return response;
};
// 전체 클라이언트 리스트 불러오기
export const getAllClientList = async (page: any) => {
  const response = await instance.get(`/api/clients?index=${page}`);
  return response.data;
};
// 전체 그룹 리스트 불러오기
export const getAllGroupList = async () => {
  const response = await instance.get('/api/groups');
  return response.data;
};
// 단건 고객정보 수정
export const eidtClientData = async (user: any) => {
  const response = await instance.patch(`/api/clients/${user.clientId}`, {
    clientName: user.clientName,
    contact: user.contact,
    clientEmail: user.clientEmail,
  });
  return response;
};
// 고객리스트에서 고객 삭제
export const deleteClientData = async (checkValue: any) => {
  const urls = checkValue.map((item: any) => `/api/clients/${item.clientId}`);
  const response = await axios.all(
    urls.map((url: any) => {
      instance.delete(url);
    })
  );
  return response;
};
// 그룹 삭제
export const deleteGroupData = async (groupId: any) => {
  const response = await instance.delete(`/api/groups/${groupId}`);
  return response;
};

// 그룹 내 클라이언트 등록

export const postInGroupClient = async(data : any) => {
  console.log(data)
  const urls = data.map((item:any) => `/api/batch/clients/${item.clientId}/groups/${data[data.length-1]}`);
  const response = await axios.all(
    urls.map((url:any) => {
      instance.post(url);
    })
  )
  return response;
}

// 그룹 내 클라이언트 삭제
export const deleteInGroupClient = async (checkValue: any) => {
  const urls = checkValue.map(
    (item: any) => `/api/batch/clients/${item.clientId}/groups/${item.groupId}`
  );
  const response = await axios.all(
    urls.map((url: any) => {
      instance.post(url);
    })
  );
  return response;
};
// 그룹 내 클라이언트 복사
// 그룹 내 클라이언트 이동

// 카카오내용 불러오기
export const fetchTemplatesList = async ({ groupId, clientIds }: any) => {
  const response = await instance.post(
    `${process.env.REACT_APP_SERVER_URL}/api/talk/clients/contents`,
    {
      groupId,
      clientIds,
    }
  );
  return response;
};
export { instance };
