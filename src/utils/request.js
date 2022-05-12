import { wait } from '@/utils/wait'
import store from '@/store'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api'

class Request {
  constructor() {
    this.initOptions = {
      timeout: 1000 * 60,
      dataType: 'json',
      header: {},
    }
    this.baseURL = baseURL
  }

  request(url, options = {}) {
    const { loadingLoader, ...opt } = options

    const nextOptions = {
      ...this.initOptions,
      ...opt,
      url: `${this.baseURL}${url}`,
    }
    if (loadingLoader) {
      wait.start(loadingLoader)
    }

    if (store.getters.token) {
      nextOptions.header.authorization = store.getters.token
    }
    return new Promise((resolve, reject) => {
      uni.request({
        ...nextOptions,
        success: response => {
          wait.end(loadingLoader)
          const {
            statusCode,
            data,
          } = response
          if (statusCode === 200) {
            if (data.code === 'SUCCESS' || data.code === 0) {
              resolve(data)
            } else if (data.code === 1 || data.code === 'LOGOUT' || data.message === '当前没有登录') {
              // TODO 登录跳转
              uni.clearStorageSync()
              uni.reLaunch({
                url: '/pages/login/login',
              })

              reject(data)
            } else {
              uni.$u.toast(data.message || data)
              reject(data)
            }
          } else {
            uni.$u.toast(data.message || data)
            reject(data)
          }
        },
        fail: error => {
          console.error(error)
          wait.end(loadingLoader)
          reject(error)
        },
      })
    })
  }

  get(url, params = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'GET',
      data: params,
    })
  }

  post(url, params = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      data: params,
    })
  }

  put(url, params = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      data: params,
    })
  }

  delete(url, params = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE',
      data: params,
    })
  }
}

const request = new Request()
// console.log(request)

export default request
