import Vue from "vue"
import Vuex from "vuex"
import * as types from "@/store/types"

import boxesBoard from "@/store/modules/boxesBoard"
import boxesStats from "@/store/modules/boxesStats"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backdrop: false
  },
  getters: {
    [types.IS_BACKDROP_ACTIVE]: state => state.backdrop
  },
  mutations: {
    [types.SET_BACKDROP_MODAL]: state => state.backdrop = !state.backdrop
  },
  actions: {
    [types.TOGGLE_BACKDROP_MODAL]: ({commit}) => {
      commit(types.SET_BACKDROP_MODAL)
    }
  },
  modules: {
    boxesBoard,
    boxesStats
  }
})
