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

// 获取当前用户信息
export const getUserAPI = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 设置用户信息
export const setUserAPI = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}

// 获取用户信息
export const getProfileAPI = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 关注用户
export const followAPI = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消关注用户
export const unfollowAPI = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
