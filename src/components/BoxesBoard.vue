<template>
  <div class="boxes-board">
    <div class="boxes-board__row"
      v-for="(row, i) in 10"
      :key="row.i">
      <div class="boxes-board__box"
        v-for="(box, n) in 10"
        :key="box.n">
        <div class="boxes-board-box"
          @click="onBoxClick(i, n)">
          {{i}}, {{n}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BoxesBoardBox from "./BoxesBoardBox.vue"

export default {
  name: "BoxesBoard",
  components: {
    // BoxesBoardBox
  },
  props: {},
  methods: {
    onBoxClick(x, y) {
      console.log(x, y);
    }
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
.boxes-board-box {
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
}
</style>
