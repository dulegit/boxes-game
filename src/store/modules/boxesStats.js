import * as typeBoxesStats from "@/store/types/boxesStats"

const state = {
  timer: 0,
  clicksLeft: 1,
  lives: 1,
  level: 1
}

const getters = {
  [typeBoxesStats.GET_TIMER]: state => state.timer,
  [typeBoxesStats.GET_CLICKS_LEFT]: state => state.clicksLeft,
  [typeBoxesStats.GET_LIVES]: state => state.lives,
  [typeBoxesStats.GET_LEVEL]: state => state.level
}

const mutations = {
  [typeBoxesStats.SET_TIMER]: state => state.timer += 1,
  [typeBoxesStats.REMOVE_TIMER]: state => state.timer = 0,
  [typeBoxesStats.SET_REMAINING_CLICKS]: (state, rootState) => {
    let clickedBoxes = rootState.boxesBoard.board.clickedBoxes.length
    state.clicksLeft = state.level - (clickedBoxes - 1)
  },
  [typeBoxesStats.SET_NEW_LEVEL_UPDATE_STATE]: (state) => {
    state.timer = 0
    state.level = state.level + 1;
    state.lives = state.lives + 1;
  },
  [typeBoxesStats.SET_LOCALSTORAGE_DATA]: (state, payload) => {
    state.level = payload.level
    state.lives = payload.lives
  }
}

const actions = {
  [typeBoxesStats.ADD_TIMER_COUNTING]: ({commit}) => {
    commit(typeBoxesStats.SET_TIMER)
  },
  [typeBoxesStats.REMOVE_TIMER_COUNTING]: ({commit}) => {
    commit(typeBoxesStats.REMOVE_TIMER)
  },
  [typeBoxesStats.ADD_REMAINING_CLICKS]: ({commit, rootState}) => {
    commit(typeBoxesStats.SET_REMAINING_CLICKS, rootState)
  },
  [typeBoxesStats.ADD_NEW_LEVEL_UPDATE_STATE]: ({commit}) => {
    commit(typeBoxesStats.SET_NEW_LEVEL_UPDATE_STATE)
  },
  [typeBoxesStats.ADD_LOCALSTORAGE_DATA]: ({commit}, payload) => {
    commit(typeBoxesStats.SET_LOCALSTORAGE_DATA, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}