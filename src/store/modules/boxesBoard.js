import * as typeBoxesBoard from "@/store/types/boxesBoard"

const stateDefault = () => {
  return {
    gameStart: false,
    newLevelStart: false,
    gameOver: false,
    board: {
      ref: null,
      clickedBoxes: [],
      possibleMoves: [],
      possibleNextMoves: [],
      levelGenerated: []
    }
  }
}

const state = stateDefault()

const getters = {
  [typeBoxesBoard.GET_IS_GAME_START]: state => state.gameStart,
  [typeBoxesBoard.GET_IS_NEW_LEVEL_START]: state => state.newLevelStart,
  [typeBoxesBoard.GET_IS_GAME_OVER]: state => state.gameOver,
  [typeBoxesBoard.GET_LEVEL_GENERATED_ARRAY]: state => state.board.levelGenerated,
  [typeBoxesBoard.GET_POSSIBLE_MOVES_ARRAY]: state => state.board.possibleMoves,
  [typeBoxesBoard.GET_POSSIBLE_NEXT_MOVES_ARRAY]: state => state.board.possibleNextMoves,
  [typeBoxesBoard.GET_CLICKED_BOXES]: state => state.board.clickedBoxes
}

const mutations = {
  [typeBoxesBoard.SET_GAME_START]: state => state.gameStart = true,

  [typeBoxesBoard.SET_GAME_OVER]: (state, payload) => state.gameOver = payload,

  [typeBoxesBoard.SET_BOARD_REF]: (state, payload) => state.board.ref = payload,

  [typeBoxesBoard.SET_LEVEL_GENERATED_ARRAY]: (state, payload) => state.board.levelGenerated = payload,

  [typeBoxesBoard.SET_BOXES_STATE]: (state, payload) => {
    state.board = {
      ...state.board,
      clickedBoxes: [...state.board.clickedBoxes, payload.pos]
    }
  },

  [typeBoxesBoard.SET_POSSIBLE_MOVES_ARRAY]: (state, payload) => state.board.possibleMoves = payload,

  [typeBoxesBoard.SET_POSSIBLE_MOVES]: (state, payload) => {
    state.board.possibleNextMoves = [];
    const generatedBoxes = state.board.levelGenerated
    const gameBoard = state.board.ref;
    const gameBoardBoxes = gameBoard.children;
    // array of possible moves
    const posibleMoves = [
      [payload.pos[0] - 3, payload.pos[1] - 0],
      [payload.pos[0] - 2, payload.pos[1] - 2],
      [payload.pos[0] - 2, payload.pos[1] + 2],
      [payload.pos[0] - 0, payload.pos[1] - 3],
      [payload.pos[0] - 0, payload.pos[1] + 3],
      [payload.pos[0] + 2, payload.pos[1] - 2],
      [payload.pos[0] + 2, payload.pos[1] + 2],
      [payload.pos[0] + 3, payload.pos[1] + 0]
    ]

    // based on click generate array of possible moves on the board
    let arrayOfPosibleMoves = posibleMoves.filter((move) => {
      return move[0] >= 0 && move[1] >= 0 && move[0] < gameBoardBoxes.length && move[1] < gameBoardBoxes.length;
    })
   
    const nextMoves = arrayOfPosibleMoves.map((item) => generatedBoxes.filter((box) => {
      if (JSON.stringify(item) === JSON.stringify(box)) {
        return box
      }
    }))

    nextMoves.filter((item) => {
      if(item.length !== 0) {
        const isDuplicated = state.board.clickedBoxes.filter((box) => box[0] === item[0][0] && box[1] === item[0][1])
        if (isDuplicated.length === 0) {
          state.board.possibleNextMoves.push(item[0])
        }
      }
    })
  },

  [typeBoxesBoard.SET_IS_LEVEL_FINISHED]: (state, payload) => {
    let clicksLeft = payload.rootState.boxesStats.clicksLeft;
    let livesLeft = payload.rootState.boxesStats.lives;
    let posibleMoves = state.board.possibleNextMoves

    if (clicksLeft !== 0 && posibleMoves.length === 0) {
      // console.log("GAME OVER!")
      state.gameOver = true;
      payload.rootState.boxesStats.lives = livesLeft - clicksLeft;
      livesLeft <= 0 ? livesLeft = 1 : livesLeft
      payload.rootState.backdrop = true
      clearInterval(payload.payload.interval)
    }

    if (clicksLeft === 0 && posibleMoves.length === 0) {
      // alert("CONGRATS!")
      payload.rootState.backdrop = true
      clearInterval(payload.payload.interval)
    }
    
  },
  [typeBoxesBoard.SET_NEW_LEVEL_RESET_STATE]: (state, payload) => {
    Object.assign(state, stateDefault())
    payload.newLevel === true ? state.newLevelStart = true : null
    payload.gameOver === true ? state.gameOver = true : null
  }

}

const actions = {
  [typeBoxesBoard.ADD_NEW_GAME]: ({commit}) => {
    commit(typeBoxesBoard.SET_GAME_START)
  },
  [typeBoxesBoard.ADD_GAME_OVER]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_GAME_OVER, payload)
  },
  [typeBoxesBoard.ADD_BOARD_REF]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_BOARD_REF, payload)
  },
  [typeBoxesBoard.ADD_BOXES_STATE]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_BOXES_STATE, payload)
  },
  [typeBoxesBoard.ADD_POSSIBLE_MOVES]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_POSSIBLE_MOVES, payload)
  },
  [typeBoxesBoard.ADD_POSSIBLE_MOVES_ARRAY]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_POSSIBLE_MOVES_ARRAY, payload)
  },
  [typeBoxesBoard.ADD_LEVEL_GENERATED_ARRAY]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_LEVEL_GENERATED_ARRAY, payload)
  },
  [typeBoxesBoard.ADD_IS_LEVEL_FINISHED]: ({commit, rootState}, payload) => {
    commit(typeBoxesBoard.SET_IS_LEVEL_FINISHED, {payload: payload, rootState: rootState})
  },
  [typeBoxesBoard.ADD_NEW_LEVEL_RESET_STATE]: ({commit}, payload) => {
    commit(typeBoxesBoard.SET_NEW_LEVEL_RESET_STATE, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}