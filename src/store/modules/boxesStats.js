import * as types from "@/store/types"

const state = {
  timer: 0,
  clicksLeft: 0,
  lives: 0,
  level: 1
}

const getters = {
  [types.GET_TIMER]: state => state.timer,
  [types.GET_CLICKS_LEFT]: state => state.clicksLeft,
  [types.GET_LIVES]: state => state.lives,
  [types.GET_LEVEL]: state => state.level
}

const mutations = {
  [types.SET_TIMER]: state => state.timer += 1,
  [types.REMOVE_TIMER]: state => state.timer = 0
}

const actions = {
  [types.ADD_TIMER_COUNTING]: ({commit}) => {
    commit(types.SET_TIMER)
  },
  [types.REMOVE_TIMER_COUNTING]: ({commit}) => {
    commit(types.REMOVE_TIMER)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}