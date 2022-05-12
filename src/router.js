import { RouterMount, createRouter } from 'uni-simple-router'
import store from '@/store'

console.log('ROUTES', ROUTES)
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES],
})
const whiteRoute = ['login']
const isDev = process.env.NODE_ENV === 'development'
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('to', to, from)
  // TODO 开发暂时不取token
  if (isDev) {
    next()
  } else if (whiteRoute.includes(to.name)) {
    next()
  } else if (!store.getters.token) {
    store.dispatch('login').then(() => {
      next()
    }).catch(() => {
      uni.navigateTo({
        url: '/pages/login/login',
      })
      next(false)
    })
  } else {
    next()
  }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('afterEach', { to: to.path, from: from.path })
})

export {
  router,
  RouterMount
}
