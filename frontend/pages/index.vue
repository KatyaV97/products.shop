<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <MainContainer
      :has-img="true"
  >
    <template v-slot:header>
      <Header/>
    </template>
    <template v-slot:main-content>
      <div class="main-page">
        <div class="popular-categories">
          <div class="header-text"><p class="_non-space">
            Популярные категории
          </p></div>
          <div
              class=card-container
              v-if="popularCategories && popularCategories.length > 0"
          >
            <template
                v-for="card in popularCategories"
                :key="card.title"
            >
              <PopularCard
                  :card-info="card"
                  @move-to-catalog="moveToCatalog"
              />
            </template>
          </div>
        </div>
        <div class="popular-products">
          <div class="header-text"><p class="_non-space">
            Популярные товары
          </p></div>
          <div
              class=card-container
              v-if="popularProducts && popularProducts.length > 0"
          >
            <p class="_non-space popular-text">Популярное</p>
            <template
                v-for="card in popularProducts"
                :key="card.title"
            >
              <PopularProducts
                  :card-info="card"
                  @click="moveToCatalog(card)"
              />
            </template>
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
import PopularProducts from "~/components/PopularProducts.vue";
import {useProductsStore} from "~/store/productsStore"

export default {
  components: {PopularProducts},
  data() {
    return {
      pageTitle: 'Night store. Главная' as string,
    }
  },
  async setup() {
    const productsStore = useProductsStore()

    const [{data: responseCategories}, {data: responseProducts}] = await Promise.all(
        [useFetch('/api/popular/getPopularCategories'),
          useFetch('/api/popular/getPopularProducts')])
    const popularCategories = responseCategories.value
    const popularProducts = responseProducts.value

    return {
      popularCategories,
      popularProducts,
      productsStore
    }
  },
  methods: {
    moveToCatalog(card) {
      this.productsStore.setActiveCategory(card.category_id)
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
</style>