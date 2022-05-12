import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import { router, RouterMount } from './router.js'
import { wait } from './utils/wait'
import store from '@/store'

import './assets/style/index.scss'
import './assets/style/tailwind.css'

Vue.use(uView)
Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  wait,
  store,
  ...App,
})
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
