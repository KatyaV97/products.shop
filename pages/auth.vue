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
      pageTitle: 'Night store. Авторизация' as string,
    }
  }
}
</script>


<style scoped>
</style>