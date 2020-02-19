// GETTERS
// shared
export const IS_BACKDROP_ACTIVE = "shared/IS_BACKDROP_ACTIVE"
// boxesBoard
export const IS_GAME_START = "boxesBoard/IS_GAME_START"
export const GET_LEVEL_GENERATED_ARRAY = "boxesBoard/GET_LEVEL_GENERATED_ARRAY"
// boxesStats
export const GET_TIMER = "boxesStats/GET_TIMER"
export const GET_CLICKS_LEFT = "boxesStats/GET_CLICKS_LEFT"
export const GET_LIVES = "boxesStats/GET_LIVES"
export const GET_LEVEL = "boxesStats/GET_LEVEL"

// MUTATIONS
// boxesBoard
export const SET_GAME_START = "boxesBoard/SET_GAME_START"
export const SET_START_POSITION = "boxesBoard/SET_START_POSITION"
export const SET_POSIBLE_MOVES = "boxesBoard/SET_POSIBLE_MOVES"
export const SET_BOXES_LEVEL = "boxesBoard/SET_BOXES_LEVEL"
export const SET_BOXES_CLASSES = "boxesBoard/SET_BOXES_CLASSES"
export const REMOVE_BOXES_CLASSES = "boxesBoard/REMOVE_BOXES_CLASSES"
export const DISABLE_BOXES = "boxesBoard/DISABLE_BOXES"
// boxesStats
export const SET_TIMER = "boxesStats/SET_TIMER"
export const REMOVE_TIMER = "boxesStats/REMOVE_TIMER"

// ACTIONS
// boxesBoard
export const ADD_NEW_GAME = "boxesBoard/ADD_NEW_GAME"
export const ADD_START_POSITION = "boxesBoard/ADD_START_POSITION"
export const ADD_CURRENT_LEVEL = "boxesBoard/ADD_CURRENT_LEVEL"
export const ADD_BOXES_CLASSES = "boxesBoard/ADD_BOXES_CLASSES"
export const REMOVE_BOXES_NOT_IN_PLAY = "boxesBoard/REMOVE_BOXES_NOT_IN_PLAY"
// boxesStats
export const ADD_TIMER_COUNTING = "boxesStats/ADD_TIMER_COUNTING"
export const REMOVE_TIMER_COUNTING = "boxesStats/REMOVE_TIMER_COUNTING"