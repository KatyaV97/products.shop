<template>
  <div class="main-container">
    <div>
      <div class="main-block">
        <slot name="header"></slot>
      </div>
      <div
          v-if="hasImg"
          class="main-bgn"
      >
        <img src="/car.png" alt="Основной фон">
      </div>
      <div class="main-block">
        <slot name="main-content"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    hasImg: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
</style>