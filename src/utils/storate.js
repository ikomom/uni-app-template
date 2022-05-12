/**
 * 设置
 * @param data{key,data}
 */
export function setStorage({ key, data }) {
  uni.setStorageSync(key, data)
}

export function getStorage(key) {
  return uni.getStorageSync(key)
}
