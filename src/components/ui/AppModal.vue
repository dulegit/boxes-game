<template>
  <div class="modal">
    <div class="modal__inner">
      <slot v-if="isGameStarted && !isGameOver && getLives > 0" name="nextLevel" />
      <slot v-if="!isGameStarted && !isNewLevelStarted && getLives > 0" name="chooseLevel" />
      <slot v-if="isGameStarted && isGameOver && getLives > 0" name="gameOver" />
      <slot v-if="getLives <= 0" name="noLivesLeft" />
    </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex"
import * as typeBoxesBoard from "@/store/types/boxesBoard"
import * as typeBoxesStats from "@/store/types/boxesStats"

export default {
  name: "AppModal",
  props: {},
  computed: {
    ...mapGetters({
      isGameStarted: typeBoxesBoard.GET_IS_GAME_START,
      isNewLevelStarted: typeBoxesBoard.GET_IS_NEW_LEVEL_START,
      isGameOver: typeBoxesBoard.GET_IS_GAME_OVER,
      getLives: typeBoxesStats.GET_LIVES
    }),
  }
}
</script>

<style scoped lang="scss">
  @import "./src/assets/scss/01_helpers/variables";
  @import "./src/assets/scss/01_helpers/mixins";
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .modal__inner {
    position: relative;
    text-align: center;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
    min-height: 7.5rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px 2px rgba(26, 38, 64, 0.7);
  }
  .modal__head {
    font-size: 1.25rem;
    margin-bottom: .5rem;
    font-weight: bold;
    &.modal__head--alert {
      color: $warning;
    }
  }
  .modal__input {
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: .5rem;
    background-color: rgba(237, 215, 194, 0.2);
    border-bottom: 1px solid $box;
    text-align: center;
  }
  .modal__text {
    &--info {
      display: inline-block;
      padding: .5rem;
      font-size: 0.85rem;
      font-style: italic;
      color: $primary;
      background-color: $secondaryLight;
      border-radius: .25rem;
    }
  }
  .modal__cta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    & .modal__button {
      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }
  .modal__button {
    display: inline-block;
    min-width: 100px;
    text-align: center;
    background-color: $box;
    color: $secondaryLight;
    font-size: .8rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    &:disabled {
      background-color: $secondaryLight;
      color: $box;
      cursor: not-allowed;
    }
    &.modal__button--cancel {
      background-color: $warning;
    }
    &.modal__button--accept {
      background-color: $success
    }
  }
</style>
