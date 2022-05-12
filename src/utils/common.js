/**
 * 简单短id, 用于渲染列表
 * @returns {string}
 */
export function shortId() {
  return Math.random().toString(36).substr(-8)
}
