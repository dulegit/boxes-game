<template>
  <div class="modal">
    <div class="modal__inner">
      <div class="modal__close">X</div>

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
  }
  .modal__inner {
    position: relative;
    padding: 0.75rem;
    width: 100%;
    max-width: 20rem;
    min-height: 7.5rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px 2px rgba(26, 38, 64, 0.7);
  }
  .modal__close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 1.875rem;
    height: 1.875rem;
    font-weight: 700;
    background-color: #2E3951;
    color: #fff;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
