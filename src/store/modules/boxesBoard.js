import * as types from "@/store/types"

const state = {
  gameStart: false,
  board: {
    startPosition: [],
    posibleMoves: [],
    levelGenerated: []
  },
}

const getters = {
  [types.IS_GAME_START]: state => state.gameStart,
  [types.GET_LEVEL_GENERATED_ARRAY]: state => state.board.levelGenerated
}

const mutations = {
  [types.SET_GAME_START]: state => state.gameStart = true,

  [types.SET_BOXES_LEVEL]: (state, payload) => {
    const levelGenerated = [];
    levelGenerated.push(payload.pos);
    const gameBoard = document.getElementsByClassName('boxes-board')[0].children;
    const currentLevel = payload.rootState.boxesStats.level;
    
    let generateLevels = (val, pos) => {
      let lastInArray = []
      let randomItem = []
      let isDuplicated = false

      // array of possible moves
      const posibleMoves = [
        [pos[0] - 3, pos[1] - 0],
        [pos[0] - 2, pos[1] - 2],
        [pos[0] - 2, pos[1] + 2],
        [pos[0] - 0, pos[1] - 3],
        [pos[0] - 0, pos[1] + 3],
        [pos[0] + 2, pos[1] - 2],
        [pos[0] + 2, pos[1] + 2],
        [pos[0] + 3, pos[1] + 0]
      ]

      // based on click generate array of possible moves on the board
      let arrayOfPosibleMoves = posibleMoves.filter((move) => {
        return move[0] >= 0 && move[1] >= 0 && move[0] < gameBoard.length && move[1] < gameBoard.length;
      })

      // choose random one of the generated moves
      randomItem = arrayOfPosibleMoves[Math.floor(Math.random() * arrayOfPosibleMoves.length)];

      // check if choosen random move is not duplicated
      let levelGeneratedFiltered = levelGenerated.filter((item) => {
        let randomBox = JSON.stringify(randomItem)
        let firstClicked = JSON.stringify(firstClicked);
        let itemToCheck = JSON.stringify(item)
        if(firstClicked == itemToCheck || randomBox == itemToCheck) {
          isDuplicated = true
          return
        } else {
          return item
        }
      })

      // if is not duplicated add it to array of generated/possible moves | else call function again with the same level index
      if (!isDuplicated) {
        levelGenerated.push(randomItem)
        lastInArray = levelGenerated[levelGenerated.length - 1];
      } else {
        return generateLevels(val, pos = levelGenerated[levelGenerated.length - 1])
      }
      
      // while value is not equal to current level, and the move is not duplicated call the function
      if (val <= currentLevel && !isDuplicated) {
        state.board.levelGenerated = [...levelGeneratedFiltered]
        return generateLevels(val += 1, pos = lastInArray)
      }
      
    }
    generateLevels(0, payload.pos)
  },

  [types.SET_BOXES_CLASSES]: (state) => {
    return state.board.levelGenerated.map((box) => {
      let boxMoves = document.getElementsByClassName('boxes-board')[0].children[box[0]].children[box[1]];
      boxMoves.classList.add('incoming')
    })
  },

  [types.SET_START_POSITION]: (state, payload) => {
    let clickedBox = document.getElementsByClassName('boxes-board')[0].children[payload.pos[0]].children[payload.pos[1]];
    state.board = {...state.board, startPosition: payload.pos}
    clickedBox.classList.remove('incoming')
    clickedBox.classList.add('active')
  },
  [types.DISABLE_BOXES]: () => {
    const gameBoard = document.getElementsByClassName('boxes-board')[0];
    const directChildren = [...gameBoard.children]

    // filter rows
    directChildren.filter((item) => {
      let childItem = [...item.children];
      // loop through each box in each row and add style to disable box which are not in the game
      childItem.map((child) => {
        if (!(child.classList.contains('incoming') || child.classList.contains('active'))) {
          child.style.pointerEvents = "none"
        }
      })
    })
  }

}

const actions = {
  [types.ADD_NEW_GAME]: ({commit}) => {
    commit(types.SET_GAME_START)
  },
  [types.ADD_START_POSITION]: ({commit}, payload) => {
    commit(types.SET_START_POSITION, payload)
  },
  [types.ADD_CURRENT_LEVEL]: ({commit, rootState}, payload) => {
    commit(types.SET_BOXES_LEVEL, {...payload, rootState})
  },
  [types.ADD_BOXES_CLASSES]: ({commit}) => {
    commit(types.SET_BOXES_CLASSES)
  },
  [types.REMOVE_BOXES_NOT_IN_PLAY]: ({commit}) => {
    commit(types.DISABLE_BOXES)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}