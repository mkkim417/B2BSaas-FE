import axios from 'axios'

const instance = axios.create({
  // baseURL: `REACT_APP_SERVER_URL`,
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
})

// 클라이언트 생성
export const postClientCreate = async (userInfo :any) => {
  const response = await instance.post('/api/clients', userInfo);
  return response.data;
}

export default instance
