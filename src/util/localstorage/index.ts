import { getCookie, removeCookie } from '../cookie'

export const getUser = () => {
  const userInfo =
    localStorage.getItem('userInfo') && getCookie('accessToken')
      ? JSON.parse(localStorage.getItem('userInfo')!)
      : null
  return userInfo
}

export const removeUser = () => {
  removeCookie('accessToken')
  localStorage.clear()
}
