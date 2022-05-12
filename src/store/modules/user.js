import { getStorage } from '@/utils/storate'

export default {
  state: {
    token: null,
    userInfo: { username: '15759205241' },
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    setState(state, payload) {
      Object.keys(payload).forEach((el) => {
        state[el] = payload[el]
      })
    },
  },
  actions: {
    login({ commit }) {
      return Promise.resolve(true)
      // let state = getStorage('o-p-u-d')
      //
      // return new Promise((resolve, reject) => {
      //   if (state) {
      //     state = JSON.parse(state)
      //     commit('setState', {
      //       token: state.token,
      //       userInfo: state.userInfo,
      //     })
      //     resolve()
      //   } else {
      //     reject()
      //   }
      // })
    },
  },
}
