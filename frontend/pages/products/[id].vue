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
      <div class="selected-product-container">
        <div class="selected-product-block"
             v-if="product"
        >
          <div class="left-side"
               v-if="product && product?.urlImg"
          >
            <img :src="product.urlImg" alt="Картинка товара"/>
          </div>
          <div class="right-side">
            <div class="top"
                 v-if="product && product?.title && product?.description"
            >
              <p class="_non-space title">{{ product.title }}</p>
              <div class="description">
                <p class="_non-space title">Описание:</p>
                <p class="_non-space description">{{ product.description }}</p>
              </div>
            </div>
            <div class="bottom">
              <div class="buy-block">
                <Toggle
                    :count-product="count.toString()"
                    @decrease="decrease"
                    @increase="increase"
                />
                <MainButton
                    :classes="['main', 'big']"
                    @click="addToBasket"
                >
                  Купить
                </MainButton>
                <div
                    v-if="product?.isFavorite && product.isFavorite"
                    @click="toggleHeart"
                >
                  <svg
                      class="heart"
                      fill="#ff0000"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                          d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                    </g>
                  </svg>
                </div>
                <div
                    v-else
                    @click="toggleHeart"
                >
                  <svg
                      class="heart"
                      fill="#ffdd00"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffdd00"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                          d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <p class="_non-space price"
                 v-if="product && product?.price"
              >Цена: {{ new Intl.NumberFormat('ru-RU').format(count * product.price) }}
                <span class="_non-space rouble">№</span>
              </p>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="popular-products">
          <div class=card-container
               v-if="popularProducts && popularProducts.length> 0"
          >
            <p class="_non-space popular-text">Рекомендуем:</p>
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
import {useProductsStore} from "~/store/productsStore"

export default {
  data() {
    return {
      pageTitle: 'Night store',
      count: 1,
      priceResult: 0,
    }
  },
  async setup() {
    const productsStore = useProductsStore()
    const route = useRoute()

    const [{data: responseProduct}, {data: responsePopularProducts}] = await Promise.all(
        [useFetch('/api/catalog/getProductById', {
          query: {
            product_id: route.params.id
          }
        }),
          useFetch('/api/popular/getPopularProducts')])

    const product = responseProduct.value[0]
    const popularProducts = responsePopularProducts.value

    return {
      product,
      popularProducts,
      productsStore
    }
  },
  computed: {
    productsInBasket() {
      return this.productsStore.getProductsInBasket
    },
    productsInFavorite() {
      return this.productsStore.getProductsInFavorite
    }
  },
  mounted() {
    this.productsStore.initFromStore()
    this.checkProductInBasket()
    this.checkProductInFavorite()
  },
  methods: {
    addToBasket() {
      this.productsStore.addProductsInBasket(this.product, this.count)
      this.productsStore.saveProductFromBasket({...this.product, count: this.count})
    },
    checkProductInFavorite() {
      if (this.productsInFavorite && this.productsInFavorite.length > 0) {
        const index = this.productsInFavorite.findIndex(item => {
          return item.id === this.product.id
        })
        if (index !== -1) {
          this.product.isFavorite = true
          return
        }
        this.product.isFavorite = false
      }
    },
    checkProductInBasket() {
      if (this.productsInBasket && this.productsInBasket.length > 0) {
        const index = this.productsInBasket.findIndex(item => {
          return item.id === this.product.id
        })
        if (index !== -1) {
          this.count = this.productsInBasket[index].count
          return
        }
        this.count = 1
      }
    },
    toggleHeart() {
      this.product.isFavorite = !this.product.isFavorite

      if (this.product.isFavorite) {
        this.productsStore.addProductsInFavorite(this.product)
        this.productsStore.saveProductFromFavorite(this.product)
        return
      }
      this.productsStore.deleteProductFromFavorite(this.product)
      this.productsStore.deleteProductFromFavoriteInStore(this.product)
    },
    decrease() {
      const result = this.count - 1
      if (result === 0) return
      this.count -= 1
    },
    increase() {
      const result = this.count + 1
      if (result === 101) return
      this.count += 1
    }

  }
}
</script>


<style scoped>
& input[type=number]::-webkit-inner-spin-button,
& input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

& input[type=number] {
  -moz-appearance: textfield;
}
</style>