<template>
  <div class="boxes-board" ref="board">
    <div class="boxes-board__row"
      v-for="(row, i) in 10"
      :key="row.i">

      <BoxesBoardBox
        v-for="(box, n) in 10"
        :key="Number(i+''+n)"
        :keyArray="[i, n]"
        :boxIndex="Number(i+''+n)"
        v-on:boxClicked="onBoxClick" />

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import lockr from "lockr"
import * as types from "@/store/types"
import * as typeBoxesBoard from "@/store/types/boxesBoard"
import * as typeBoxesStats from "@/store/types/boxesStats"

import BoxesBoardBox from "@/components/BoxesBoardBox.vue"

export default {
  name: "BoxesBoard",
  data() {
    return {
      timerId: null,
      levelGenerated: [],
      randomItem: [],
    }
  },
  components: {
    BoxesBoardBox
  },
  props: {},
  computed: {
    ...mapGetters({
      isGameStarted: typeBoxesBoard.GET_IS_GAME_START,
      isGameOver: typeBoxesBoard.GET_IS_GAME_OVER,
      isNewLevelStarted: typeBoxesBoard.GET_IS_NEW_LEVEL_START,
      getPossibleMoves: typeBoxesBoard.GET_POSSIBLE_MOVES_ARRAY,
      getPossibleNextMoves: typeBoxesBoard.GET_POSSIBLE_NEXT_MOVES_ARRAY,
      getLevel: typeBoxesStats.GET_LEVEL
    })
  },
  mounted() {
    let localLevel = lockr.get("lastLevel")
    let localLives = lockr.get("lastLives")
    if ((localLevel !== undefined && localLevel !== 0) && localLives !== undefined) {
      if (localLevel === 1 ) {
        return
      }
      this.onToggleBackdrop()
      this.onAddLocalStorageData({level: localLevel, lives: localLives})
    }
  },
  methods: {
    onBoxClick(position) {
      let x = position[0]
      let y = position[1]
      this.onAddBoardRef(this.$refs.board)
      if ((this.isNewLevelStarted && !this.isGameStarted) || this.isGameOver) {
        this.levelGenerated = []
        this.randomItem = []
        this.timerId = null
        this.onTimerRemove();
        clearInterval(this.timerId)
        this.onaddGameOver(false)
      }
      // const boardRef = this.$refs.board;
      if (!this.isGameStarted) {
        // game started
        this.onGameStart()
        // get possible movements
        this.setPossibleMoves(x,y)
        // choose random next move from possible and check if not already in array
        this.setNextMove(this.getPossibleMoves);
        // add clicked boxes in level in array
        this.onAddBoxesState({pos: [x,y]})
        // depend on clicked boxes calculate possible next moves
        this.onAddPossibleMoves({pos: [x,y]})
        // start timer
        this.timerId = setInterval(() => {
            this.onTimerStart()
        }, 1000)
        // calculate remaining clicks
        this.onAddRemainingClicks()
      } else {
        
        if (!this.checkIsPossibleToMove(x,y)) {
          return
        }
        // add clicked boxes in level in array
        this.onAddBoxesState({pos: [x,y]})
        // depend on clicked boxes calculate possible next moves
        this.onAddPossibleMoves({pos: [x,y]})
        // calculate remaining clicks
        this.onAddRemainingClicks()
        // check if is game over
        this.onAddIsGameOver({interval: this.timerId})
      }

    },
    setPossibleMoves(x, y) {

      const gameBoard = document.getElementsByClassName('boxes-board')[0].children;
      if (this.levelGenerated.length === 0) {
        this.levelGenerated.push([x, y])
      }
      // array of possible moves
      const posibleMoves = [
        [x - 3, y - 0],
        [x - 2, y - 2],
        [x - 2, y + 2],
        [x - 0, y - 3],
        [x - 0, y + 3],
        [x + 2, y - 2],
        [x + 2, y + 2],
        [x + 3, y + 0]
      ]

      // based on click generate array of possible moves on the board
      let arrayOfPosibleMoves = posibleMoves.filter((move) => {
        return move[0] >= 0 && move[1] >= 0 && move[0] < gameBoard.length && move[1] < gameBoard.length;
      })
      this.onAddPossibleMovesArray(arrayOfPosibleMoves)

    },
    setNextMove(possibleMoves) {
      
      let isDuplicated = false

      // choose random one of the generated moves
      let randomItemLoc = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.randomItem = randomItemLoc

      if (this.levelGenerated.length === 1) {
        this.levelGenerated = [...this.levelGenerated, this.randomItem]
        this.checkGeneratedMoves()

      } else {
        // check if choosen random move is not duplicated
        isDuplicated = this.levelGenerated.some((item) => {
          let randomBox = JSON.stringify(this.randomItem)
          let itemToCheck = JSON.stringify(item)
          if(randomBox === itemToCheck) {
            return item
          }
        })
    
        // if is not duplicated add it to array of generated/possible moves | else call function again with the same level index
        if (!isDuplicated) {
          this.levelGenerated  = [...this.levelGenerated, this.randomItem]
        }
        this.checkGeneratedMoves()

      }
    },
    checkGeneratedMoves() {
      const currentLevel = this.getLevel
      let lastInArray = this.levelGenerated[this.levelGenerated.length - 1]
      if ((this.levelGenerated.length - 1) < currentLevel) {
        this.setPossibleMoves(lastInArray[0], lastInArray[1])
        this.setNextMove(this.getPossibleMoves)
      } else {
        this.onAddLevelGenerated(this.levelGenerated)
      }
    },
    checkIsPossibleToMove(x, y) {
      let isPossibleMove = this.getPossibleNextMoves.filter((box) => {
        let boxStr = box[0] + '' + box[1];
        let clickedStr = x + '' + y;
        return boxStr === clickedStr
      })
      return isPossibleMove.length === 0 ? false : true
    },
    ...mapActions({
      onGameStart: typeBoxesBoard.ADD_NEW_GAME,
      onaddGameOver: typeBoxesBoard.ADD_GAME_OVER,
      onAddBoardRef: typeBoxesBoard.ADD_BOARD_REF,
      onAddBoxesState: typeBoxesBoard.ADD_BOXES_STATE,
      onAddPossibleMoves: typeBoxesBoard.ADD_POSSIBLE_MOVES,
      onTimerStart: typeBoxesStats.ADD_TIMER_COUNTING,
      onTimerRemove: typeBoxesStats.REMOVE_TIMER_COUNTING,
      onAddLevelGenerated: typeBoxesBoard.ADD_LEVEL_GENERATED_ARRAY,
      onAddPossibleMovesArray: typeBoxesBoard.ADD_POSSIBLE_MOVES_ARRAY,
      onAddRemainingClicks: typeBoxesStats.ADD_REMAINING_CLICKS,
      onAddIsGameOver: typeBoxesBoard.ADD_IS_LEVEL_FINISHED,
      onAddLocalStorageData: typeBoxesStats.ADD_LOCALSTORAGE_DATA,
      onToggleBackdrop: types.TOGGLE_BACKDROP_MODAL,
    })
  },
  beforeDestroy() {
    this.onTimerRemove();
    clearInterval(this.timerId)
  }
}
</script>

<style scoped lang="scss">
@import "./src/assets/scss/01_helpers/variables";
@import "./src/assets/scss/01_helpers/mixins";
.boxes-board {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 1fr);
}
.boxes-board__row {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  &:last-child {
    & .boxes-board__box {
      border-bottom: none;
    }
  }
}
.boxes-board__box {
  position: relative;
  width: 100%;
  max-width: 5rem;
  height: 3.5rem;
  background-color: $primaryLight;
  border-right: rgba($color: $box, $alpha: 0.5) solid 1px;
  border-bottom: rgba($color: $box, $alpha: 0.5) solid 1px;
  cursor: pointer;

  &:last-child {
    border-right: none;
  }
  @include breakpoint(x-small) {
    max-width: 5rem;
    height: 3.5rem;
  }
  @include breakpoint(small) {
    max-width: 4rem;
    height: 4rem;
  }
  &.active {
    background-color: $boxActive;
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: default
  }
  &.done {
    background-color: $box;
    cursor: default;
  }
  &.incoming {
    background-color: $success;
    cursor: default;
  }
}
</style>
