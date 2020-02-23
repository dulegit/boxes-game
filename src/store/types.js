// GETTERS
// shared
export const IS_BACKDROP_ACTIVE = "shared/IS_BACKDROP_ACTIVE"
// boxesBoard
export const IS_GAME_START = "boxesBoard/IS_GAME_START"
export const GET_IS_NEW_LEVEL_START = "boxesBoard/GET_IS_NEW_LEVEL_START"
export const GET_LEVEL_GENERATED_ARRAY = "boxesBoard/GET_LEVEL_GENERATED_ARRAY"
export const GET_POSSIBLE_MOVES_ARRAY = "boxesBoard/GET_POSSIBLE_MOVES_ARRAY"
// boxesStats
export const GET_TIMER = "boxesStats/GET_TIMER"
export const GET_CLICKS_LEFT = "boxesStats/GET_CLICKS_LEFT"
export const GET_LIVES = "boxesStats/GET_LIVES"
export const GET_LEVEL = "boxesStats/GET_LEVEL"

// MUTATIONS
// shared
export const SET_BACKDROP_MODAL = "shared/SET_BACKDROP_MODAL"
// boxesBoard
export const SET_GAME_START = "boxesBoard/SET_GAME_START"
export const SET_BOXES_STATE = "boxesBoard/SET_BOXES_STATE"
export const SET_POSSIBLE_MOVES = "boxesBoard/SET_POSSIBLE_MOVES"
export const SET_BOXES_CLASSES = "boxesBoard/SET_BOXES_CLASSES"
export const SET_CLICKED_BOX = "boxesBoard/SET_CLICKED_BOX"
export const DISABLE_BOXES = "boxesBoard/DISABLE_BOXES"
export const SET_LEVEL_GENERATED_ARRAY = "boxesBoard/SET_LEVEL_GENERATED_ARRAY"
export const SET_POSSIBLE_MOVES_ARRAY = "boxesBoard/SET_POSSIBLE_MOVES_ARRAY"
export const SET_IS_LEVEL_FINISHED = "boxesBoard/SET_IS_LEVEL_FINISHED"
export const SET_NEW_LEVEL_RESET_STATE = "boxesBoard/SET_NEW_LEVEL_RESET_STATE"
export const SET_CLEAR_BOXES_BOARD = "boxesBoard/SET_CLEAR_BOXES_BOARD"
// boxesStats
export const SET_TIMER = "boxesStats/SET_TIMER"
export const REMOVE_TIMER = "boxesStats/REMOVE_TIMER"
export const SET_REMAINING_CLICKS = "boxesStats/SET_REMAINING_CLICKS"
export const SET_NEW_LEVEL_UPDATE_STATE = "boxesStats/SET_NEW_LEVEL_UPDATE_STATE"
export const SET_LOCALSTORAGE_DATA = "boxesStats/SET_LOCALSTORAGE_DATA"

// ACTIONS
// shared
export const TOGGLE_BACKDROP_MODAL = "shared/TOGGLE_BACKDROP_MODAL"
// boxesBoard
export const ADD_NEW_GAME = "boxesBoard/ADD_NEW_GAME"
export const ADD_BOXES_STATE = "boxesBoard/ADD_BOXES_STATE"
export const ADD_BOXES_CLASSES = "boxesBoard/ADD_BOXES_CLASSES"
export const REMOVE_BOXES_NOT_IN_PLAY = "boxesBoard/REMOVE_BOXES_NOT_IN_PLAY"
export const ADD_POSSIBLE_MOVES = "boxesBoard/ADD_POSSIBLE_MOVES"
export const ADD_LEVEL_GENERATED_ARRAY = "boxesBoard/ADD_LEVEL_GENERATED_ARRAY"
export const ADD_POSSIBLE_MOVES_ARRAY = "boxesBoard/ADD_POSSIBLE_MOVES_ARRAY"
export const ADD_IS_LEVEL_FINISHED = "boxesBoard/ADD_IS_LEVEL_FINISHED"
export const ADD_NEW_LEVEL_RESET_STATE = "boxesBoard/ADD_NEW_LEVEL_RESET_STATE"
export const ADD_CLEAR_BOXES_BOARD = "boxesBoard/ADD_CLEAR_BOXES_BOARD"
// boxesStats
export const ADD_TIMER_COUNTING = "boxesStats/ADD_TIMER_COUNTING"
export const REMOVE_TIMER_COUNTING = "boxesStats/REMOVE_TIMER_COUNTING"
export const ADD_REMAINING_CLICKS = "boxesStats/ADD_REMAINING_CLICKS"
export const ADD_NEW_LEVEL_UPDATE_STATE = "boxesStats/ADD_NEW_LEVEL_UPDATE_STATE"
export const ADD_LOCALSTORAGE_DATA = "boxesStats/ADD_LOCALSTORAGE_DATA"