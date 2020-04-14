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
          <button class="modal__button modal__button--cancel"
            @click="cancelNextLevel">No</button>
          <button class="modal__button modal__button--accept"
            @click="confirmNextLevel">Yes</button>
        </div>
      </template>
      <template v-slot:chooseLevel>
        <h3 class="modal__head">Please, choose level to start from</h3>
        <input class="modal__input" type="text" v-model="level" v-on:keydown="filterNumbers">
        <p class="modal__text modal__text--info">your last successfull level done was {{getLevel - 1}}</p>
        <div class="modal__cta">
          <button class="modal__button"
            @click="chooseLevel" :disabled="level.length === 0">Ok</button>
        </div>
      </template>
      <template v-slot:gameOver>
        <h3 class="modal__head modal__head--alert">Game Over</h3>
        <p class="modal__text">Do you want to start again</p>
        <div class="modal__cta">
          <button class="modal__button modal__button--cancel"
            @click="cancelNextLevel">No</button>
          <button class="modal__button modal__button--accept"
            @click="restartGame">Yes</button>
        </div>
      </template>
      <template v-slot:noLivesLeft>
        <h3 class="modal__head">You left no lives. You can start from Level 1</h3>
        <div class="modal__cta">
          <button class="modal__button modal__button--cancel"
            @click="cancelNextLevel">No</button>
          <button class="modal__button modal__button--accept"
            @click="startGameFromStart">Yes</button>
        </div>
      </template>
    </AppModal>
    <!-- /.modal -->
  </div>
</template>

<script>
import BoxesBoard from "@/components/BoxesBoard.vue"
import BoxesStats from "@/components/BoxesStats.vue"
import BoxesData from "@/components/BoxesData.vue"
import AppModal from "@/components/ui/AppModal.vue"

import "@/assets/scss/global/global.scss"

import lockr from "lockr"
import {mapGetters, mapActions} from "vuex"
import * as types from "@/store/types"
import * as typeBoxesBoard from "@/store/types/boxesBoard"
import * as typeBoxesStats from "@/store/types/boxesStats"

export default {
  name: "App",
  components: {
    BoxesBoard,
    BoxesStats,
    BoxesData,
    AppModal
  },
  data() {
    return {
      level: ''
    }
  },
  computed: {
    ...mapGetters({
      getBackdrop: types.IS_BACKDROP_ACTIVE,
      getLevel: typeBoxesStats.GET_LEVEL,
      getLives: typeBoxesStats.GET_LIVES
    })
  },
  methods: {
    ...mapActions({
      onToggleBackdrop: types.TOGGLE_BACKDROP_MODAL,
      onAddNewLevelResetBoxesBoard: typeBoxesBoard.ADD_NEW_LEVEL_RESET_STATE,
      onAddNewLevelUpdateStats: typeBoxesStats.ADD_NEW_LEVEL_UPDATE_STATE,
      onAddLocalStorageData: typeBoxesStats.ADD_LOCALSTORAGE_DATA,
    }),
    filterNumbers(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      return (charCode > 47 && charCode < 58) || charCode === 8 ? evt : evt.preventDefault();
    },
    cancelNextLevel() {
      lockr.set("lastLevel", this.getLevel)
      lockr.set("lastLives", this.getLives)
      this.onToggleBackdrop()
    },
    confirmNextLevel() {
      this.onAddNewLevelUpdateStats()
      this.onToggleBackdrop()
      this.onAddNewLevelResetBoxesBoard({newLevel: true, gameOver: false})

      lockr.set("lastLevel", this.getLevel)
      lockr.set("lastLives", this.getLives)
    },
    chooseLevel() {
      let levelNumber = Number(this.level)
      let livesNumber = Number(this.getLives)
      let alertMessage = `Ooops, you need to work harder to get this level. The maximum level you can choose is ${this.getLevel - 1}`
      if (levelNumber >= this.getLevel || levelNumber === 0) {
        levelNumber === 0 ? alertMessage = `Wrong level number` : alertMessage
        alert(alertMessage)
        this.level = '';
        return
      }
      lockr.set("lastLevel", levelNumber)
      lockr.set("lastLives", livesNumber)

      this.onToggleBackdrop()
      this.onAddLocalStorageData({level: lockr.get("lastLevel"), lives: lockr.get("lastLives")})
      this.onAddNewLevelResetBoxesBoard({newLevel: false, gameOver: false})
    },
    restartGame() {
      lockr.set("lastLevel", this.getLevel)
      lockr.set("lastLives", this.getLives)

      this.onToggleBackdrop()
      this.onAddLocalStorageData({level: lockr.get("lastLevel"), lives: lockr.get("lastLives")})
      this.onAddNewLevelResetBoxesBoard({newLevel: false, gameOver: true})
    },
    startGameFromStart() {
      lockr.set("lastLevel", 1)
      lockr.set("lastLives", 1)
      
      this.onToggleBackdrop()
      this.onAddLocalStorageData({level: lockr.get("lastLevel"), lives: lockr.get("lastLives")})
      this.onAddNewLevelResetBoxesBoard({newLevel: false, gameOver: true})
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
