<template>
  <div class="basket-card-container">
    <img class="ico" src="/Aroma.png" alt="Картинка товара"/>
    <p class="_non-space title">{{cardInfo.title}}</p>
    <div class="toggle-block">
      <div
          class="toggle"
          @click="decrease"
      >-
      </div>
      <input
          class="main-input"
          type="number"
          :value="cardInfo.count.toString()"
          :max="100"
          :min="1"
      />
      <div
          class="toggle"
          @click="increase"
      >+
      </div>
    </div>
    <p class="_non-space price">{{new Intl.NumberFormat('ru-RU').format(cardInfo.price)}} руб.</p>
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
  methods: {
    decrease(): void {
      const result = this.cardInfo.count - 1
      if (result === 0) return
      this.cardInfo.count -= 1
    },
    increase(): void {
      const result = this.count + 1
      if (result === 101) return
      this.cardInfo.count += 1
    }

  }
}
</script>

<style scoped>

</style>