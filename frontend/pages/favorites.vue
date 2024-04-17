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
      <div class="favorites-container">
        <div class="favorites-block"
             v-if="productsInFavorite && productsInFavorite.length > 0"
        >
          <p class="_non-space title">
            Ваш список избранного
          </p>
          <div class="table-header">
            <p class="_non-space empty header-item"/>
            <p class="_non-space name header-item">
              Наименование
            </p>
            <p class="_non-space price header-item">
              Цена
            </p>
            <p class="_non-space empty-2 header-item"/>
          </div>
          <div class="line"/>
          <div class="favorites-products">
            <template
                v-for="product in productsInFavorite"
                :key="product.title"
            >
              <FavoriteProductCard
                  :card-info="product"
              />
              <div class="line"/>
            </template>
          </div>
        </div>
        <div
            class="basket-block"
            v-else
        >
          <p class="_non-space title">
            Ваш список избранного пуст
          </p>
          <div class="empty-block">
            <p class="_non-space empty">
              Пусто!
            </p>
            <NuxtLink
                to="/products"
                class="custom-link button-link"
            >
              Перейти в каталог
            </NuxtLink>
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
import {useProductsStore} from "~/store/productsStore"

export default {
  data() {
    return {
      pageTitle: 'Night store. Избранное' as string,
    }
  },
  setup() {
    const productsStore = useProductsStore()
    return {
      productsStore
    }
  },
  computed: {
    productsInFavorite(): Product[] {
      return this.productsStore.getProductsInFavorite
    },
  },
  mounted() {
    this.productsStore.initFromStore()
  }
}
</script>

<style scoped>
</style>