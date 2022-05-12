import request from '@/utils/request.js'

/**
 * 获取用户
 * @param params{pageNum:1,pageSize:999}
 * @returns {Promise<unknown>}
 */
export function getUser(params) {
  return request.get('/user', params, {
    loadingLoader: 'getUser',
  })
}
