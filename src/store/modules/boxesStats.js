import * as types from "@/store/types"

const state = {
  timer: 0,
  clicksLeft: 1,
  lives: 1,
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
  [types.REMOVE_TIMER]: state => state.timer = 0,
  [types.SET_REMAINING_CLICKS]: (state, rootState) => {
    let clickedBoxes = rootState.boxesBoard.board.clickedBoxes.length
    state.clicksLeft = state.level - (clickedBoxes - 1)
  },
  [types.SET_NEW_LEVEL_UPDATE_STATE]: (state) => {
    state.timer = 0
    state.level = state.level + 1;
    state.lives = state.lives + 1;
  },
  [types.SET_LOCALSTORAGE_DATA]: (state, payload) => {
    state.level = payload.level
    state.lives = payload.lives
  }
}

const actions = {
  [types.ADD_TIMER_COUNTING]: ({commit}) => {
    commit(types.SET_TIMER)
  },
  [types.REMOVE_TIMER_COUNTING]: ({commit}) => {
    commit(types.REMOVE_TIMER)
  },
  [types.ADD_REMAINING_CLICKS]: ({commit, rootState}) => {
    commit(types.SET_REMAINING_CLICKS, rootState)
  },
  [types.ADD_NEW_LEVEL_UPDATE_STATE]: ({commit}) => {
    commit(types.SET_NEW_LEVEL_UPDATE_STATE)
  },
  [types.ADD_LOCALSTORAGE_DATA]: ({commit}, payload) => {
    commit(types.SET_LOCALSTORAGE_DATA, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}