<template>
  <div id="app">
    <div class="container">
      <div class="container__inner">
        <!-- .boxes-board -->
        <BoxesBoard />
        <!-- /.boxes-board -->
        <!-- .boxes-stats -->
        <BoxesStats />
        <!-- /.boxes-stats -->
        <!-- .boxes-data -->
        <BoxesData />
        <!-- /.boxes-data -->
      </div>
    </div>
    <!-- .modal -->
    <AppModal
      v-if="getBackdrop">
      <template v-slot:nextLevel>
        <h3 class="modal__head">You have completed level: {{getLevel}}</h3>
        <p class="modal__text">Do you want to play next level</p>
        <div class="modal__cta">
          <button class="modal__button"
            @click="cancelNextLevel">No</button>
          <button class="modal__button"
            @click="confirmNextLevel">Yes</button>
        </div>
      </template>
    </AppModal>
    <!-- /.modal -->
  </div>
</template>

<script>
import BoxesBoard from "./components/BoxesBoard.vue"
import BoxesStats from "./components/BoxesStats.vue"
import BoxesData from "./components/BoxesData.vue"
import AppModal from "./components/ui/AppModal.vue"

import "./assets/scss/global/global.scss"

import {mapGetters, mapActions} from "vuex"
import * as types from "./store/types"

export default {
  name: "App",
  components: {
    BoxesBoard,
    BoxesStats,
    BoxesData,
    AppModal
  },
  computed: {
    ...mapGetters({
      getBackdrop: types.IS_BACKDROP_ACTIVE,
      getLevel: types.GET_LEVEL,
      getLives: types.GET_LIVES
    })
  },
  methods: {
    ...mapActions({
      onToggleBackdrop: types.TOGGLE_BACKDROP_MODAL,
      onAddNewLevelUpdateStats: types.ADD_NEW_LEVEL_UPDATE_STATE,
      onAddNewLevelResetBoxesBoard: types.ADD_NEW_LEVEL_RESET_STATE,
      onAddClearBoxesBoard: types.ADD_CLEAR_BOXES_BOARD
    }),
    cancelNextLevel() {
      this.onToggleBackdrop()
    },
    confirmNextLevel() {
      this.onAddNewLevelUpdateStats()
      this.onAddNewLevelResetBoxesBoard()
      this.onAddClearBoxesBoard()
      this.onToggleBackdrop()

      localStorage.setItem("lastLevel", JSON.stringify(this.getLevel))
      localStorage.setItem("lastLives", JSON.stringify(this.getLives))

    }
  }
}
</script>

<style scoped lang="scss">
@import "./src/assets/scss/01_helpers/variables";
@import "./src/assets/scss/01_helpers/mixins";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
  font-size: $gap;
}
.container {
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
}
.container__inner {
  display: grid;
  grid-template-columns: 1fr;
  @include breakpoint(small) {
    grid-template-columns: 2fr 1fr;
  }

}
</style>
