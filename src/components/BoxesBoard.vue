<template>
  <div class="boxes-board" ref="board">
    <div class="boxes-board__row"
      v-for="(row, i) in 10"
      :key="row.i">
      <div class="boxes-board__box"
        v-for="(box, n) in 10"
        :key="box.n"
        @click="onBoxClick(i, n)">
          {{i}}, {{n}}
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
      timerId: null
    }
  },
  components: {},
  props: {},
  computed: {
    ...mapGetters({
      isGameStarted: types.IS_GAME_START,
      getLevels: types.GET_LEVEL_GENERATED_ARRAY,
      getTimer: types.GET_TIMER
    })
  },
  methods: {
    onBoxClick(x, y) {
      // const boardRef = this.$refs.board;
      if (!this.isGameStarted) {
        this.timerId = setInterval(() => {
          this.onTimerStart()
        }, 1000)
      }
      if (!this.isGameStarted) {
        this.onGameStart();
        this.onLevelGenerate({pos: [x,y]})
        this.onClassesGenerated()
        this.onAddStartPosition({pos: [x,y]})
        this.onDisableOtherBoxes()
      }

    },
    ...mapActions({
      onGameStart: types.ADD_NEW_GAME,
      onAddStartPosition: types.ADD_START_POSITION,
      onLevelGenerate: types.ADD_CURRENT_LEVEL,
      onClassesGenerated: types.ADD_BOXES_CLASSES,
      onDisableOtherBoxes: types.REMOVE_BOXES_NOT_IN_PLAY,
      onTimerStart: types.ADD_TIMER_COUNTING,
      onTimerRemove: types.REMOVE_TIMER_COUNTING
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
  }
  &.incoming {
    background-color: $success;
  }
}
</style>
