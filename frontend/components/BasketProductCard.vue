<template>
  <div class="basket-card-container">
    <img
        @click="moveToProductPage(cardInfo)"
        class="ico"
        :src="cardInfo.urlImg"
        alt="Картинка товара"
    />
    <p class="_non-space title">{{ cardInfo.title }}</p>
    <Toggle
        :count-product="cardInfo?.count.toString() ? cardInfo.count.toString() : '0'"
        :min="0"
        @increase="increase"
        @decrease="decrease"
    />
    <p class="_non-space price">{{ new Intl.NumberFormat('ru-RU').format(cardInfo.price) }} руб.</p>
  </div>
</template>

<script lang="ts">
import {useProductsStore} from "~/store/productsStore"

export default {
  props: {
    cardInfo: {
      type: Object,
      required: true
    }
  },
  setup() {
    const productsStore = useProductsStore()
    return {
      productsStore
    }
  },
  methods: {
    decrease(count): void {
      this.$emit('decrease', {cardInfo: this.cardInfo, count: count})
    },
    increase(count): void {
      this.$emit('increase', {cardInfo: this.cardInfo, count: count})
    },
    moveToProductPage(product: any) {
      this.$router.push(`/products/${product.id}`)
    }
  }
}
</script>

<style scoped>

</style>