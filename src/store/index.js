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
  },
  actions: {
  },
  modules: {
    boxesBoard,
    boxesStats
  }
})
