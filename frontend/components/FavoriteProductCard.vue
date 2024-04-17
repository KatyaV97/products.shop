<template>
  <div class="favorite-card-container">
    <img
        @click="moveToProductPage(cardInfo)"
        class="ico"
        :src="cardInfo.urlImg"
        alt="Картинка товара"/>
    <p class="_non-space title">{{ cardInfo.title }}</p>
    <p class="_non-space price">
      {{ new Intl.NumberFormat('ru-RU').format(cardInfo.price) }} руб.
    </p>
    <div class="basket-btn">
      <MainButton
          :classes="['main', 'for-auth']"
          @click="addToBasket(cardInfo)"
      >
        В корзину
      </MainButton>
    </div>
  </div>
</template>

<script lang="ts">
import {useProductsStore} from "~/store/productsStore"
import type {Product} from "~/types/products"

export default {
  props: {
    cardInfo: {
      type: Object as () => Product,
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
    addToBasket(product: Product) {
      this.productsStore.addProductsInBasket(product, 1)
      this.deleteFromFavorite(product)
    },
    deleteFromFavorite(product: Product) {
      this.productsStore.deleteProductFromFavorite(product)
      this.productsStore.deleteProductFromFavoriteInStore(product)
    },
    moveToProductPage(product: Product) {
      this.$router.push(`/products/${product.id}`)
    }
  }
}
</script>

<style scoped>

</style>