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
      v-if="getBackdrop" />
    <!-- /.modal -->
  </div>
</template>

<script>
import BoxesBoard from "./components/BoxesBoard.vue"
import BoxesStats from "./components/BoxesStats.vue"
import BoxesData from "./components/BoxesData.vue"
import AppModal from "./components/ui/AppModal.vue"

import "./assets/scss/global/global.scss"

import {mapGetters} from "vuex"
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
      getBackdrop: types.IS_BACKDROP_ACTIVE
    })
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
