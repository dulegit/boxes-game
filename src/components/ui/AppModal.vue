<template>
  <div class="modal">
    <div class="modal__inner">
      <slot name="nextLevel" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {}
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
    width: 100%;
    max-width: 20rem;
    min-height: 7.5rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px 2px rgba(26, 38, 64, 0.7);
  }
  .modal__head {
    font-size: 1.25rem;
    font-weight: bold;
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
  }
</style>
