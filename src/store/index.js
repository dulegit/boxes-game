import Vue from "vue"
import Vuex from "vuex"
import * as types from "./types";

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
  }
})
