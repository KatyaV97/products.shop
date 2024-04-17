<template>
  <div class="popular-card-block">
    <div class="popular-card-img">
      <img :src="cardInfo.urlImg" alt="Картинка товара">
    </div>
    <div class="card-btn">
      <MainButton
          :classes="['main', 'auto']"
          @click="$emit('moveToCatalog', cardInfo)"
      >
        <p class="_non-space card-info-btn">
          {{ cardInfo.title }}
        </p>
      </MainButton>
    </div>
  </div>
</template>

<script lang="ts">
import type {Product} from "~/types/products"

export default {
  emits: ['moveToCatalog'],
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