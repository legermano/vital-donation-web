<template>
  <div class="loader-spinner">
    <div class="loader is-loading"></div>
  </div>
</template>

<style scoped lang="scss">
.loader-spinner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  .loader {
    height: 80px;
    width: 80px;
  }
}
</style>
