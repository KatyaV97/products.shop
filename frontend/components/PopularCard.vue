<template>
  <div class="popular-card-block">
    <div class="popular-card-img">
      <img src="/Aroma.png" alt="Картинка товара">
    </div>
    <div class="card-btn">
      <MainButton
            :classes="['main', 'auto']"
      >
        <p class="_non-space card-info-btn">{{ cardInfo.title }}</p>
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
  }
}
</script>


<style scoped>

</style>