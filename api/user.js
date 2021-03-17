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
