<template>
  <div class="favorite-card-container">
    <img class="ico" :src="cardInfo.imgUrl" alt="Картинка товара"/>
    <p class="_non-space title">{{ cardInfo.title }}</p>
    <p class="_non-space price">
      {{ new Intl.NumberFormat('ru-RU').format(cardInfo.price) }} руб.
    </p>
    <div class="basket-btn">
      <MainButton
          :classes="['main', 'for-auth']"
      >
        В корзину
      </MainButton>
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
}
</script>

<style scoped>

</style>