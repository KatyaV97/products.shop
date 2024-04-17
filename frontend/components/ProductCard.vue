<template>
  <NuxtLink
      :to="`/products/${cardInfo.id}`"
      class="custom-link product-card"
  >
    <div class="product-card-container">
      <div class="top">
        <img
            :src="cardInfo.urlImg"
            alt="Картинка товара"
        />
        <p class="_non-space title">
          {{ cardInfo.title }}
        </p>
      </div>
      <p class="_non-space price">
        {{ cardInfo.price }} <span class="rouble">№</span>
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import type {Product} from "~/types/products"

export default {
  props: {
    cardInfo: {
      type: Object as () => Product,
      required: true
    }
  }
}
</script>

<style scoped>
</style>