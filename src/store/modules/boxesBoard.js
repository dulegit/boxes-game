import * as types from "@/store/types"

const stateDefault = () => {
  return {
    gameStart: false,
    newLevelStart: false,
    board: {
      clickedBoxes: [],
      possibleMoves: [],
      possibleNextMoves: [],
      levelGenerated: []
    }
  }
}

const state = stateDefault()

const getters = {
  [types.IS_GAME_START]: state => state.gameStart,
  [types.GET_IS_NEW_LEVEL_START]: state => state.newLevelStart,
  [types.GET_LEVEL_GENERATED_ARRAY]: state => state.board.levelGenerated,
  [types.GET_POSSIBLE_MOVES_ARRAY]: state => state.board.possibleMoves
}

const mutations = {
  [types.SET_GAME_START]: state => state.gameStart = true,

  [types.SET_LEVEL_GENERATED_ARRAY]: (state, payload) => state.board.levelGenerated = payload,

  [types.SET_BOXES_CLASSES]: (state) => {
    state.board.levelGenerated.map((box) => {
      let boxMoves = document.getElementsByClassName('boxes-board')[0].children[box[0]].children[box[1]];
      // boxMoves.classList.remove('done')
      boxMoves.classList.remove('active')
      boxMoves.classList.add('incoming')
    })
    state.board.clickedBoxes.map((box) => {
      let boxMoves = document.getElementsByClassName('boxes-board')[0].children[box[0]].children[box[1]];
      boxMoves.classList.remove('active')
      boxMoves.classList.remove('incoming')
      boxMoves.classList.add('done')
    })
    state.board.possibleNextMoves.map((box) => {
      let boxMoves = document.getElementsByClassName('boxes-board')[0].children[box[0]].children[box[1]];
      boxMoves.classList.remove('incoming')
      // boxMoves.classList.remove('done')
      boxMoves.classList.add('active')
    })
  },

  [types.SET_CLEAR_BOXES_BOARD]: () => {
    const gameBoard = document.getElementsByClassName('boxes-board')[0];
    const directChildren = [...gameBoard.children]

    // filter rows
    directChildren.map((item) => {
      let childItem = [...item.children];
      childItem.map((child) => {
        child.classList.remove('incoming')
        child.classList.remove('active')
        child.classList.remove('done')
        child.style.removeProperty('pointer-events')
      })
    })
  },

  [types.SET_BOXES_STATE]: (state, payload) => {
    state.board = {
      ...state.board,
      clickedBoxes: [...state.board.clickedBoxes, payload.pos]
    }
  },

  [types.SET_POSSIBLE_MOVES_ARRAY]: (state, payload) => state.board.possibleMoves = payload,

  [types.SET_POSSIBLE_MOVES]: (state, payload) => {
    state.board.possibleNextMoves = [];
    const generatedBoxes = state.board.levelGenerated
    const gameBoard = document.getElementsByClassName('boxes-board')[0].children;
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
      return move[0] >= 0 && move[1] >= 0 && move[0] < gameBoard.length && move[1] < gameBoard.length;
    })
    
    const nextMoves = arrayOfPosibleMoves.map((item) => {
      let itemStr = JSON.stringify(item)
      let eachGenerated = generatedBoxes.filter((box) => {
        let generatedItemStr = JSON.stringify(box)
        if (itemStr == generatedItemStr) {
          return box
        }
      })
      return eachGenerated 
    })
    nextMoves.filter((item) => {
      let isDuplicate = false

      if(item.length != 0) {
        state.board.clickedBoxes.map((aa) => {
          if (aa[0] == item[0][0] && aa[1] == item[0][1]) {
            isDuplicate = true;
            return
          }
        })
        if (!isDuplicate) {
          state.board.possibleNextMoves.push(item[0])
        }
      }
    })
  },

  [types.DISABLE_BOXES]: () => {
    const gameBoard = document.getElementsByClassName('boxes-board')[0];
    const directChildren = [...gameBoard.children]

    // filter rows
    directChildren.filter((item) => {
      let childItem = [...item.children];
      // loop through each box in each row and add style to disable box which are not in the game
      childItem.map((child) => {
        if (!(child.classList.contains('incoming') || child.classList.contains('active') || child.classList.contains('done'))) {
          child.style.pointerEvents = "none"
        }
      })
    })
  },
  [types.SET_IS_LEVEL_FINISHED]: (state, payload) => {
    let clicksLeft = payload.rootState.boxesStats.clicksLeft;
    let posibleMoves = state.board.possibleNextMoves

    if (clicksLeft != 0 && posibleMoves.length == 0) {
      alert("GAME OVER!")
      clearInterval(payload.payload.interval)
    }

    if (clicksLeft == 0 && posibleMoves.length == 0) {
      // alert("CONGRATS!")
      payload.rootState.backdrop = true
      clearInterval(payload.payload.interval)
    }
    
  },
  [types.SET_NEW_LEVEL_RESET_STATE]: (state) => {
    Object.assign(state, stateDefault())
    state.newLevelStart = true
  }

}

const actions = {
  [types.ADD_NEW_GAME]: ({commit}) => {
    commit(types.SET_GAME_START)
  },
  [types.ADD_BOXES_STATE]: ({commit}, payload) => {
    commit(types.SET_BOXES_STATE, payload)
  },
  [types.ADD_BOXES_CLASSES]: ({commit}) => {
    commit(types.SET_BOXES_CLASSES)
  },
  [types.REMOVE_BOXES_NOT_IN_PLAY]: ({commit}) => {
    commit(types.DISABLE_BOXES)
  },
  [types.ADD_POSSIBLE_MOVES]: ({commit}, payload) => {
    commit(types.SET_POSSIBLE_MOVES, payload)
  },
  [types.ADD_POSSIBLE_MOVES_ARRAY]: ({commit}, payload) => {
    commit(types.SET_POSSIBLE_MOVES_ARRAY, payload)
  },
  [types.ADD_LEVEL_GENERATED_ARRAY]: ({commit}, payload) => {
    commit(types.SET_LEVEL_GENERATED_ARRAY, payload)
  },
  [types.ADD_IS_LEVEL_FINISHED]: ({commit, rootState}, payload) => {
    commit(types.SET_IS_LEVEL_FINISHED, {payload: payload, rootState: rootState})
  },
  [types.ADD_NEW_LEVEL_RESET_STATE]: ({commit}) => {
    commit(types.SET_NEW_LEVEL_RESET_STATE)
  },
  [types.ADD_CLEAR_BOXES_BOARD]: ({commit}) => {
    commit(types.SET_CLEAR_BOXES_BOARD)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}