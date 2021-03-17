import { request } from '@/plugins/request'

// 登录
export const loginAPI = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
export const registerAPI = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 获取用户信息
export const getUserAPI = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 获取用户信息
export const setUserAPI = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
