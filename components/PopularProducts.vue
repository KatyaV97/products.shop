<template>
  <div class="popular-product-block">
    <div class="top-block">
      <div class="popular-product-img">
        <img src="/sticker.png" alt="Картинка товара">
      </div>
      <div class="card-title">
        {{ cardInfo.title }}
      </div>
    </div>
    <div class="card-price">
      {{ cardInfo.price }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cardInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>