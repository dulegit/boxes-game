<template>
  <div class="boxes-board" ref="board">
    <div class="boxes-board__row"
      v-for="(row, i) in 10"
      :key="row.i">
      <div class="boxes-board__box"
        v-for="(box, n) in 10"
        :key="box.n"
        @click="onBoxClick(i, n)">
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import * as types from "@/store/types"

export default {
  name: "BoxesBoard",
  data() {
    return {
      timerId: null,
      levelGenerated: [],
      randomItem: []
    }
  },
  components: {},
  props: {},
  computed: {
    ...mapGetters({
      isGameStarted: types.IS_GAME_START,
      isNewLevelStarted: types.GET_IS_NEW_LEVEL_START,
      isModalActive: types.IS_BACKDROP_ACTIVE,
      getGeneratedMoves: types.GET_LEVEL_GENERATED_ARRAY,
      getPossibleMoves: types.GET_POSSIBLE_MOVES_ARRAY,
      getLevel: types.GET_LEVEL,
      getTimer: types.GET_TIMER
    })
  },
  mounted() {
    if (localStorage.getItem("lastLevel") != null && localStorage.getItem("lastLives") != null) {
        let localLevel = JSON.parse(localStorage.getItem("lastLevel"))
        let localLives = JSON.parse(localStorage.getItem("lastLives"))
        this.onAddLocalStorageData({level: localLevel, lives: localLives})
    }
  },
  methods: {
    onBoxClick(x, y) {
      if (this.isNewLevelStarted && !this.isGameStarted) {
        this.levelGenerated = []
        this.randomItem = []
        this.timerId = null
        this.onTimerRemove();
        clearInterval(this.timerId)
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
        // add appropriate classes to boxes
        this.onClassesGenerated()
        // disable boxes which are not in generated level
        this.onDisableOtherBoxes()
        // start timer
        this.timerId = setInterval(() => {
          this.onTimerStart()
        }, 1000)
        // calculate remaining clicks
        this.onAddRemainingClicks()
      } else {
        // add clicked boxes in level in array
        this.onAddBoxesState({pos: [x,y]})
        // depend on clicked boxes calculate possible next moves
        this.onAddPossibleMoves({pos: [x,y]})
        // add appropriate classes to boxes
        this.onClassesGenerated()
        // calculate remaining clicks
        this.onAddRemainingClicks()
        // check if is game over
        this.onAddIsGameOver({interval: this.timerId})
      }

    },
    setPossibleMoves(x, y) {

      const gameBoard = document.getElementsByClassName('boxes-board')[0].children;
      if (this.levelGenerated.length == 0) {
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

      if (this.levelGenerated.length == 1) {
        this.levelGenerated = [...this.levelGenerated, this.randomItem]
        this.checkGeneratedMoves()

      } else {
        // check if choosen random move is not duplicated
        isDuplicated = this.levelGenerated.some((item) => {
          let randomBox = JSON.stringify(this.randomItem)
          let itemToCheck = JSON.stringify(item)
          if(randomBox == itemToCheck) {
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
        console.log('level created!!!')
      }
    },
    ...mapActions({
      onGameStart: types.ADD_NEW_GAME,
      onAddBoxesState: types.ADD_BOXES_STATE,
      onClassesGenerated: types.ADD_BOXES_CLASSES,
      onAddPossibleMoves: types.ADD_POSSIBLE_MOVES,
      onDisableOtherBoxes: types.REMOVE_BOXES_NOT_IN_PLAY,
      onTimerStart: types.ADD_TIMER_COUNTING,
      onTimerRemove: types.REMOVE_TIMER_COUNTING,
      onAddLevelGenerated: types.ADD_LEVEL_GENERATED_ARRAY,
      onAddPossibleMovesArray: types.ADD_POSSIBLE_MOVES_ARRAY,
      onAddRemainingClicks: types.ADD_REMAINING_CLICKS,
      onAddIsGameOver: types.ADD_IS_LEVEL_FINISHED,
      onAddLocalStorageData: types.ADD_LOCALSTORAGE_DATA
    })
  },
  beforeDestroy() {
    console.log('BEFORE DESTROY/BoxesBoard')
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
  grid-template-columns: repeat(10, 1fr)
}
.boxes-board__box {
  width: 100%;
  max-width: 5rem;
  height: 3.5rem;
  background-color: $primaryLight;
  border: 1px solid $box;
  cursor: pointer;
  @include breakpoint(x-small) {
    max-width: 5rem;
    height: 3.5rem;
  }
  @include breakpoint(small) {
    max-width: 4rem;
    height: 4rem;
  }
  &.active,
  &:hover {
    background-color: $boxActive;
  }
  &.done {
    background-color: $box;
    pointer-events: none;
  }
  &.incoming {
    background-color: $success;
    pointer-events: none;
  }
}
</style>
