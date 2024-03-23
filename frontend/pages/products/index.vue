<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <MainContainer
      :has-img="false"
  >
    <template v-slot:header>
      <Header/>
    </template>
    <template v-slot:main-content>
      <div class="catalog-container">
        <div class="catalog-block">
          <div class="left-side">
            <div class="sort-price">
              <p class="_non-space title">Цена</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <Footer/>
    </template>
  </MainContainer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pageTitle: 'Night store' as string,
    }
  }
}
</script>


<style scoped>
</style>