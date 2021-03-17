import { request } from '@/plugins/request'

// 获取标签列表
export const getTagsAPI = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}