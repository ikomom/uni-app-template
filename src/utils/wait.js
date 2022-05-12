import Vue from 'vue'
import VueWait from 'vue-wait'

Vue.use(VueWait)

export const wait = new VueWait({ registerComponents: false })
