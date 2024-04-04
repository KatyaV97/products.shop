<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <UniversalAlert
      :isError="errorAlert.show"
      :value="errorAlert.text"
      :url="errorAlert.url"
      @close-alert="toggleErrorAlert($event,'','')"
  />
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
      errorAlert: {
        show: false,
        text: '',
        url: ''
      }
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
    errorHandler(response: object): boolean {
      if (response?.error && response.error) {
        this.toggleErrorAlert(true, 'Что-то пошло не так, попробуйте позже', response?.url ? response?.url : '')
        return true
      }
      return false
    },
    toggleErrorAlert(show: boolean, text: string, url: string): void {
      this.errorAlert.show = show
      this.errorAlert.text = text
      this.errorAlert.url = url
    },
    moveToCatalog(card) {
      this.productsStore.setActiveCategory(card.category_id)
      this.$router.push('/products')
    }
  },
  mounted() {
    this.errorHandler(this.popularCategories)
    this.errorHandler(this.popularProducts)
  }
}
</script>

<style scoped>
</style>