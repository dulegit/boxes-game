<template>
  <div class="boxes-stats">
    <h3 class="boxes-stats__title">Game Stats</h3>
    <ul class="boxes-stats__list">
      <li class="boxes-stats__item">
        <span>Timer</span>
        <strong>12 seconds</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Left to click</span>
        <strong>11</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Lives</span>
        <strong>10</strong>
      </li>
      <li class="boxes-stats__item">
        <span>Level</span>
        <strong>11</strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BoxesStats"
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
}
.boxes-stats__item {
  display: flex;
  justify-content: center;
}
</style>
