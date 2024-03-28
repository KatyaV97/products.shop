<template>
  <div
      @click="moveToProduct"
      class="popular-product-block"
  >
    <div class="top-block">
      <div class="popular-product-img">
        <img :src="cardInfo.urlImg" alt="Картинка товара">
      </div>
      <div class="card-title">
        {{ cardInfo.title }}
      </div>
    </div>
    <div class="card-price">
      {{ cardInfo.price }} <span class="rouble">№</span>
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
  },
  methods:{
    moveToProduct(){
      this.$router.push(`/products/${this.cardInfo.product_id}`)
    }
  }
}
</script>

<style scoped>

</style>