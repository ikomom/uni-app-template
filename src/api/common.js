import request from '@/utils/request.js'

/**
 * 上传附件
 * @param params{pageNum:1,pageSize:999}
 * @returns {Promise<unknown>}
 */
export function uploadFile(params) {
  return request.post('/fileApi/upload', params, {
    loadingLoader: 'uploadFile',
  })
}
