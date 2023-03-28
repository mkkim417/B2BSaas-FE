import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = key + '=' + (value || '') + expires + '; path=/';
};

export const getCookie = (key: string) => {
  const name = key + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const getTokens = () => {
  const accessToken = getCookie('accessToken');
  const userToken = getCookie('userToken');
  return { accessToken, userToken }; //userToken이 email로 대체된다면 login에서 콘솔 찍힐 지도
};

export const removeCookie = (key: string) => {
  return cookies.remove(key);
};
