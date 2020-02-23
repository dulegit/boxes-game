<template>
  <div class="boxes-stats">
    <h3 class="boxes-stats__title">Game Stats</h3>
    <ul class="boxes-stats__list">
      <li class="boxes-stats__item">
        <span>Timer:</span>
        <strong class="boxes-stats__value">{{getTimer}} s</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Left to click:</span>
        <strong class="boxes-stats__value">{{getClicksLeft}}</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Lives:</span>
        <strong class="boxes-stats__value">{{getLives}}</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Level:</span>
        <strong class="boxes-stats__value">{{getLevel}}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import * as types from "@/store/types"

export default {
  name: "BoxesStats",
  computed: {
    ...mapGetters({
      isGameStarted: types.IS_GAME_START,
      getTimer: types.GET_TIMER,
      getClicksLeft: types.GET_CLICKS_LEFT,
      getLives: types.GET_LIVES,
      getLevel: types.GET_LEVEL
    })
  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">
@import "./src/assets/scss/01_helpers/variables";
@import "./src/assets/scss/01_helpers/mixins";
.boxes-stats {
  color: $primary;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  grid-row: 2;
}
.boxes-stats__title {
  color: $boxActive;
  font-size: 1.1rem;
  font-weight: 700;
}
.boxes-stats__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  text-align: left;
  font-size: 0.7em;
  @include breakpoint(x-small) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  & span {
    display: inline-flex;
    margin-right: 0.25rem;
  }
}
.boxes-stats__item {
  display: flex;
  justify-content: center;
}
.boxes-stats__value {
  color: $boxActive;
}
</style>
