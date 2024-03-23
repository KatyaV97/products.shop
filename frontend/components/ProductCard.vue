<template>
  <NuxtLink
      :to="`/products/${cardInfo.id}`"
      class="custom-link"
  >
    <div class="product-card-container">
      <div class="top">
        <img src="/Aroma.png" alt="Картинка товара"/>
        <p class="_non-space title">{{ cardInfo.title }}</p>
      </div>
      <p class="_non-space price">{{ cardInfo.price }}</p>
    </div>
  </NuxtLink>
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